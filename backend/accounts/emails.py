import requests
from django.conf import settings


def send_otp_email(email, otp):

    print("API KEY:", settings.BREVO_API_KEY[:20])

    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": settings.BREVO_API_KEY,
        "content-type": "application/json",
    }

    payload = {
        "sender": {
            "name": "InstiFlow",
            "email": settings.DEFAULT_FROM_EMAIL,
        },
        "to": [
            {
                "email": email
            }
        ],
        "subject": "InstiFlow Password Reset",
        "textContent": f"Your OTP is {otp}",
    }

    response = requests.post(
        url,
        headers=headers,
        json=payload,
        timeout=15,
    )

    # response.raise_for_status()
    if not response.ok:
       print("Status:", response.status_code)
       print("Response:", response.text)
       response.raise_for_status()

    return response.json()