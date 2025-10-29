# API Contracts and Integration Plan

This document defines the API data contracts and frontend–backend integration for ProEvent website.

Status: Initial backend implemented. Google Sheets + Email forwarding uses environment variables and will be enabled after keys are provided.

## Endpoints (all prefixed with /api)

1) GET /api/
- Returns: { message: "Hello World" }

2) POST /api/leads
- Purpose: Create a lead from the hero contact form
- Request (application/json):
```
{
  "name": "string",           // required
  "email": "string",          // required, email format
  "company": "string|null",
  "service": "string|null",   // Booth Design | Full Build + Logistics | Equipment Rental | Hybrid Events
  "message": "string|null"
}
```
- Response:
```
{
  "ok": true,
  "stored": true,
  "sheets_forwarded": boolean, // true if forwarded to Google Apps Script Web App (optional)
  "email_sent": boolean,       // true if notification email sent via SendGrid (optional)
  "id": "uuid"
}
```

3) GET /api/leads?limit=100
- Returns latest leads array
- Response item shape:
```
{
  "id": "uuid",
  "name": "string",
  "email": "string",
  "company": "string|null",
  "service": "string|null",
  "message": "string|null",
  "created_at": "ISO-8601"
}
```

## Environment Variables (backend/.env)
- MONGO_URL: provided (do not change)
- DB_NAME: provided (do not change)
- SHEETS_WEBAPP_URL: URL of Google Apps Script Web App endpoint receiving JSON
- SENDGRID_API_KEY: API key for SendGrid email
- EMAIL_TO: Destination email (e.g., hello@proeventexpo.com)
- EMAIL_FROM: Optional from address

## Google Sheets Forwarding
- By default, backend tries to POST JSON to SHEETS_WEBAPP_URL. If not set, `sheets_forwarded=false`.
- Apps Script should parse JSON and append to the target sheet. Expected fields include: name, email, company, service, message, ip, ua, created_at, id.

## Email Notifications
- Backend sends a SendGrid API call when SENDGRID_API_KEY and EMAIL_TO are provided. If unset, `email_sent=false`.

## Frontend Integration Plan
- Replace current localStorage mock with Axios POST to `${REACT_APP_BACKEND_URL}/api/leads`.
- On success, show inline thank-you state and toast; also track minimal analytics if required.
- Keep dropdown values identical to the contract.

## Next Steps
- Provide SHEETS_WEBAPP_URL or Service Account-based flow (future option).
- Provide SENDGRID_API_KEY and confirm EMAIL_TO/EMAIL_FROM.
- I will then wire the frontend to backend and run backend tests using deep_testing_backend_v2.
