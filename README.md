# Apartment Booking Management System

This project is a **full-stack application** for managing apartment listings and bookings.  
It is built with **FastAPI** for the backend and **React** for the frontend.

---

## Features

- **Backend (FastAPI)**
  - User CRUD operations (`/users`)
  - Apartment CRUD operations (`/apartments`)
- **Frontend (React + Bootstrap)**
  - User login form
  - Apartment list display
  - API integration using Axios

---

## Technologies Used

- **Backend:** FastAPI, Pydantic, MongoDB, Uvicorn
- **Frontend:** React, React Router, Axios, Bootstrap
- **Database:** MongoDB

---

## Installation & Setup

### Backend Setup

1. Navigate to the backend folder:

   ```bash

    pip install -r requirements.txt
    uvicorn backend.main:app --reload
    The backend will run at:
    http://localhost:8000
   ```

### Frontend Setup

2. Navigate to the Frontend folder:
   ```bash
    cd frontend/Home
    npm install
    npm run dev
    The frontend will run at:
    http://localhost:5173 (Vite default)
   ```

### 1️⃣ Clone the repository

```bash
git clone https://github.com/poudelef/PL_Final_Project
```
