#!/usr/bin/env python3
"""
Backend API Testing Script for ProEvent Lead Capture System
Tests the three main endpoints as specified in the review request.
"""

import requests
import json
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get the backend URL from frontend environment
BACKEND_URL = os.getenv('REACT_APP_BACKEND_URL')
if not BACKEND_URL:
    print("ERROR: REACT_APP_BACKEND_URL not found in frontend/.env")
    exit(1)

print(f"Testing backend at: {BACKEND_URL}")

def test_hello_endpoint():
    """Test GET /api/ endpoint"""
    print("\n=== Testing Hello Endpoint ===")
    try:
        response = requests.get(f"{BACKEND_URL}/api/", timeout=10)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if data.get("message") == "Hello World":
                print("✅ Hello endpoint test PASSED")
                return True
            else:
                print(f"❌ Hello endpoint test FAILED - Expected message 'Hello World', got: {data.get('message')}")
                return False
        else:
            print(f"❌ Hello endpoint test FAILED - Expected status 200, got: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ Hello endpoint test FAILED - Exception: {e}")
        return False

def test_create_lead():
    """Test POST /api/leads endpoint"""
    print("\n=== Testing Create Lead Endpoint ===")
    
    # Test payload as specified in review request
    test_payload = {
        "name": "Test Lead",
        "email": "lead@example.com",
        "company": "Acme",
        "service": "Booth Design",
        "message": "Need 3x3 stall"
    }
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/api/leads",
            json=test_payload,
            headers={"Content-Type": "application/json"},
            timeout=10
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            
            # Check required fields as specified in review request
            checks = [
                ("ok", True, data.get("ok")),
                ("stored", True, data.get("stored")),
                ("sheets_forwarded", False, data.get("sheets_forwarded")),
                ("email_sent", False, data.get("email_sent")),
                ("id present", True, bool(data.get("id")))
            ]
            
            all_passed = True
            for field, expected, actual in checks:
                if actual == expected:
                    print(f"✅ {field}: {actual} (expected: {expected})")
                else:
                    print(f"❌ {field}: {actual} (expected: {expected})")
                    all_passed = False
            
            if all_passed:
                print("✅ Create lead test PASSED")
                return True, data.get("id")
            else:
                print("❌ Create lead test FAILED - Some checks failed")
                return False, None
        else:
            print(f"❌ Create lead test FAILED - Expected status 200, got: {response.status_code}")
            return False, None
            
    except Exception as e:
        print(f"❌ Create lead test FAILED - Exception: {e}")
        return False, None

def test_list_leads():
    """Test GET /api/leads endpoint"""
    print("\n=== Testing List Leads Endpoint ===")
    
    try:
        response = requests.get(f"{BACKEND_URL}/api/leads?limit=10", timeout=10)
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of leads returned: {len(data)}")
            
            # Check if we have at least one lead with the test email
            test_email = "lead@example.com"
            matching_leads = [lead for lead in data if lead.get("email") == test_email]
            
            if len(matching_leads) > 0:
                print(f"✅ Found {len(matching_leads)} lead(s) with email {test_email}")
                print(f"Sample lead: {matching_leads[0]}")
                print("✅ List leads test PASSED")
                return True
            else:
                print(f"❌ No leads found with email {test_email}")
                print("❌ List leads test FAILED")
                return False
        else:
            print(f"❌ List leads test FAILED - Expected status 200, got: {response.status_code}")
            return False
            
    except Exception as e:
        print(f"❌ List leads test FAILED - Exception: {e}")
        return False

def main():
    """Run all backend tests"""
    print("Starting Backend API Tests for ProEvent Lead Capture System")
    print("=" * 60)
    
    results = []
    
    # Test 1: Hello endpoint
    results.append(("Hello Endpoint", test_hello_endpoint()))
    
    # Test 2: Create lead
    create_result, lead_id = test_create_lead()
    results.append(("Create Lead", create_result))
    
    # Test 3: List leads
    results.append(("List Leads", test_list_leads()))
    
    # Summary
    print("\n" + "=" * 60)
    print("TEST SUMMARY")
    print("=" * 60)
    
    passed = 0
    total = len(results)
    
    for test_name, result in results:
        status = "✅ PASSED" if result else "❌ FAILED"
        print(f"{test_name}: {status}")
        if result:
            passed += 1
    
    print(f"\nOverall: {passed}/{total} tests passed")
    
    if passed == total:
        print("🎉 All backend tests PASSED!")
        return True
    else:
        print("⚠️  Some backend tests FAILED!")
        return False

if __name__ == "__main__":
    success = main()
    exit(0 if success else 1)