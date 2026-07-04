<p align="center">

<img src="assets/pngs/logo.png">

</p>

<h1 align="center">
  InstiFlow
</h1>

<p align="center">
A production-ready <b>Multi-Tenant Coaching Management SaaS</b> built with <b>React</b>, <b>Django REST Framework</b>, and <b>PostgreSQL</b>, enabling coaching institutes to securely manage students, attendance, authentication, and institute operations from a centralized cloud platform.
</p>

<p align="center">
<a href="https://instiflow-three.vercel.app/">🌐 Live Demo</a>
&nbsp; | &nbsp;
<a href="https://portfolio-ranjan.vercel.app">💼 Portfolio</a>
&nbsp; | &nbsp;
## [🔗 Live Demo](https://portfolio-ranjan.vercel.app/)
</p>

# 📸 Application Preview

---

## 🔐 Login

<p align="center">
  <img src="assets/gifs/Login.gif" alt="Login Demo" width="900">
</p>

The login flow uses **JWT authentication with HTTP-only cookies** for enhanced security.

---

## 📊 Dashboard

<p align="center">
  <img src="assets/gifs/dashboard.gif" alt="Dashboard Demo" width="900">
</p>

The dashboard provides administrators with a centralized overview of institute operations.

---

## 👨‍🎓 Student Management

<p align="center">
  <img src="assets/gifs/Add-Student.gif" alt="Student Management Demo" width="900">
</p>

Administrators can add, update, search, and manage student records efficiently.

---

## 📅 Attendance Management

<p align="center">
  <img src="assets/gifs/Attendance.gif" alt="Attendance Demo" width="900">
</p>

Attendance tracking allows institutes to maintain accurate daily records.

---

## 📅 Fee Management

<p align="center">
  <img src="assets/gifs/Fee.gif" alt="Fee Demo" width="900">
</p>

Fee tracking allows institutes to maintain accurate Dues.

---

## 📅 Students Profile View

<p align="center">
  <img src="assets/gifs/Profile.gif" alt="Students Profile View Demo" width="900">
</p>

Students Profile View tracking allows institutes to maintain accurate Data of the students.

---

## 🔑 Password Reset

<p align="center">
  <img src="assets/gifs/Password-Reset.gif" alt="Password Reset Demo" width="900">
</p>

Users can securely reset their password using an OTP sent via email.

```mermaid
graph TD

A[React Frontend]

B[Axios]

C[Django REST API]

D[JWT Authentication]

E[PostgreSQL]

A --> B
B --> C
C --> D
D --> E
```

---

# InstiFlow – Multi-Tenant Coaching Management SaaS

InstiFlow is a **production-ready, multi-tenant Coaching Management SaaS** built to help coaching institutes digitize and automate their day-to-day operations. The platform provides secure authentication, student management, attendance tracking, and institute-specific data isolation, allowing multiple coaching centers to use the same application while keeping their data completely separate.

---

## 📌 Problem Statement

Many coaching institutes still rely on Excel sheets, paper records, and multiple disconnected tools to manage students, attendance, fees, and communication.

This leads to:

- ❌ Manual and repetitive administrative work
- ❌ Data inconsistency and duplication
- ❌ Poor record management
- ❌ Difficult scaling as institutes grow
- ❌ Lack of secure access control

---

## 💡 Solution

InstiFlow centralizes coaching institute operations into a single cloud-based platform.

Each institute gets its own isolated workspace while sharing the same application infrastructure through a **multi-tenant architecture**.

The platform automates administrative workflows and provides secure access for institute administrators.

---

# ✨ Features

## 🔐 Authentication

- Secure JWT Authentication
- HTTP-Only Cookie Authentication
- Refresh Token Rotation
- User Registration
- Login & Logout
- Protected APIs
- Role-Based Authorization

---

## 🔒 Password Recovery

- OTP-based Password Reset
- Email Verification
- Secure OTP Validation
- Password Update

---

## 👨‍🎓 Student Management

- Add Students
- Update Student Details
- Delete Students
- Search Students
- Institute-wise Student Isolation

---

## 📅 Attendance Management

- Mark Attendance
- View Attendance Records
- Student-wise Attendance History

---

## 💰 Fee Management

- Record Fee Payments
- Track Payment Status
- View Student-wise Fee History

---

## 🏢 Multi-Tenant Architecture

- Complete tenant data isolation
- Shared infrastructure
- Scalable SaaS architecture
- Secure access between institutes

---

## 📊 Dashboard

- Responsive UI
- Institute Overview
- Easy Navigation
- Modern User Experience

---

# 🛠 Tech Stack

## Frontend

- React.js
- Vite
- Tailwind CSS
- Axios
- React Router

---

## Backend

- Django
- Django REST Framework
- PostgreSQL
- JWT Authentication
- Custom User Model

---

## Authentication & Security

# 🔒 Security Features

- JWT Authentication\*\* for secure user authentication
- HTTP-only Cookies\*\* to securely store access and refresh tokens
- Refresh Token Rotation\*\* for seamless and secure session management
- Password Hashing\*\* using Django's built-in password hashing mechanisms
- Role-Based Authorization\*\* to restrict access based on user roles
- OTP-based Password Reset\*\* with email verification
- CORS Configuration\*\* for secure frontend-backend communication
- Environment Variables\*\* for managing sensitive configuration and secrets

---

## Email Service

- Brevo SMTP
- OTP Verification
- Password Reset Emails

---

## Deployment

### Frontend

- Vercel

### Backend

- Render

### Database

- Supabase - PostgreSQL

---

# 🏗 Architecture

```
               React Frontend
                     │
                     │
                 Axios API
                     │
                     ▼
         Django REST Framework
                     │
      JWT Authentication (Cookies)
                     │
                     ▼
              PostgreSQL Database
                     │
        Multi-Tenant Data Isolation
```

# 🔥 Key Highlights

- ✅ Production-ready architecture
- ✅ Secure Authentication
- ✅ Multi-Tenant SaaS
- ✅ RESTful API Design
- ✅ Responsive UI
- ✅ Scalable Backend
- ✅ Email OTP Verification
- ✅ Cookie-based Authentication
- ✅ Protected Routes
- ✅ Clean Project Structure

---

# 📈 Impact

InstiFlow solves real-world operational challenges faced by coaching institutes by:

- Reducing manual administrative work
- Centralizing student and attendance management
- Improving data security through tenant isolation
- Providing secure authentication and authorization
- Supporting multiple institutes on a single scalable platform

---

# 🚀 Future Improvements

- Fee Management Module
- Online Payment Integration
- Faculty Management
- Student Portal
- Parent Portal
- Notifications
- Analytics Dashboard
- Report Generation
- File Uploads
- Mobile Application

---

# ⚙️ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/instiflow.git

cd instiflow
```

---

## Backend Setup

```bash
cd backend

python -m venv .venv

source .venv/bin/activate
# Windows
.venv\Scripts\activate

pip install -r requirements.txt

python manage.py migrate

python manage.py runserver
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

## Backend

Create a `.env` file inside the backend directory.

```env
SECRET_KEY=

DEBUG=False

DATABASE_URL=

EMAIL_HOST=

EMAIL_PORT=

EMAIL_HOST_USER=

EMAIL_HOST_PASSWORD=

DEFAULT_FROM_EMAIL=

BREVO_API_KEY=

FRONTEND_URL=
```

---

## Frontend

```env
VITE_API_URL=
```

---

# 🤝 Contributing

Contributions are welcome!

1. Fork the repository
2. Create your feature branch
3. Commit your changes
4. Push to your branch
5. Open a Pull Request

---

# 👨‍💻 Author

**Ranjan Kumar Sahoo**

Full Stack Developer

- Python
- Django
- Django REST Framework
- React
- PostgreSQL
- Tailwind CSS

---

# ⭐ Support

If you found this project helpful, consider giving it a ⭐ on GitHub.

It helps others discover the project and motivates further development.
