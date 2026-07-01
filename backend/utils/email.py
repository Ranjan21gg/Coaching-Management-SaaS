import requests
from django.conf import settings


def send_otp_email(email, otp):
    url = "https://api.brevo.com/v3/smtp/email"

    headers = {
        "accept": "application/json",
        "api-key": settings.BREVO_API_KEY,
        "content-type": "application/json",
    }

    payload = {
        "sender": {
            "name": "InstiFlow",
            "email": "sahoolegecy@gmail.com"
        },
        "to": [{"email": email}],
        "subject": "Password Reset OTP",
        "htmlContent": f"<p>Your OTP is <b>{otp}</b></p>",
    }

    response = requests.post(url, json=payload, headers=headers)

    print("BREVO RESPONSE:", response.status_code, response.text)

    response.raise_for_status()