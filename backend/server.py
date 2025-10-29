from fastapi import FastAPI, APIRouter, HTTPException, Request
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime
from fastapi.concurrency import run_in_threadpool
import requests


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")


# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class LeadCreate(BaseModel):
    name: str
    email: EmailStr
    company: Optional[str] = None
    service: Optional[str] = None
    message: Optional[str] = None

class Lead(LeadCreate):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    created_at: datetime = Field(default_factory=datetime.utcnow)


async def _post_to_google_sheets_webapp(payload: dict) -> bool:
    url = os.environ.get("SHEETS_WEBAPP_URL")
    if not url:
        return False

    def _post():
        try:
            # Many Google Apps Script web apps expect JSON or form data. We'll send JSON.
            resp = requests.post(url, json=payload, timeout=10)
            return resp.status_code in (200, 201, 202)
        except Exception as e:  # noqa
            logging.exception("Google Sheets webapp post failed: %s", e)
            return False

    return await run_in_threadpool(_post)


async def _send_email_sendgrid(payload: dict) -> bool:
    api_key = os.environ.get("SENDGRID_API_KEY")
    to_email = os.environ.get("EMAIL_TO")
    from_email = os.environ.get("EMAIL_FROM", to_email or "noreply@example.com")
    if not api_key or not to_email:
        return False

    def _send():
        try:
            body = {
                "personalizations": [
                    {
                        "to": [{"email": to_email}],
                        "subject": f"New Lead: {payload.get('name')} — {payload.get('service') or 'Inquiry'}",
                    }
                ],
                "from": {"email": from_email},
                "content": [
                    {
                        "type": "text/plain",
                        "value": (
                            "New lead details\n"
                            f"Name: {payload.get('name')}\n"
                            f"Email: {payload.get('email')}\n"
                            f"Company: {payload.get('company') or '-'}\n"
                            f"Service: {payload.get('service') or '-'}\n"
                            f"Message: {payload.get('message') or '-'}\n"
                            f"Time: {datetime.utcnow().isoformat()}Z\n"
                        ),
                    }
                ],
            }
            resp = requests.post(
                "https://api.sendgrid.com/v3/mail/send",
                headers={
                    "Authorization": f"Bearer {api_key}",
                    "Content-Type": "application/json",
                },
                json=body,
                timeout=10,
            )
            return resp.status_code in (200, 202)
        except Exception as e:  # noqa
            logging.exception("SendGrid email failed: %s", e)
            return False

    return await run_in_threadpool(_send)


# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "Hello World"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]


@api_router.post("/leads")
async def create_lead(lead: LeadCreate, request: Request):
    try:
        lead_obj = Lead(**lead.dict())
        await db.leads.insert_one(lead_obj.dict())

        payload = lead_obj.dict()
        payload.update({
            "ip": request.client.host if request.client else None,
            "ua": request.headers.get("user-agent"),
        })

        sheets_ok = await _post_to_google_sheets_webapp(payload)
        email_ok = await _send_email_sendgrid(payload)

        return {
            "ok": True,
            "stored": True,
            "sheets_forwarded": sheets_ok,
            "email_sent": email_ok,
            "id": lead_obj.id,
        }
    except Exception as e:
        logging.exception("Create lead failed: %s", e)
        raise HTTPException(status_code=500, detail="Failed to create lead")


@api_router.get("/leads", response_model=List[Lead])
async def list_leads(limit: int = 100):
    items = await db.leads.find().sort("created_at", -1).to_list(limit)
    return [Lead(**item) for item in items]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
