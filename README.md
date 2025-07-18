### Project File Structure

apartment-search-app/
│
├── backend/                # Python (FastAPI/Flask) backend
│   ├── app/
│   │   ├── models/         # Python classes & Pydantic models
│   │   │   ├── apartment.py
│   │   │   ├── user.py
│   │   │   ├── location.py
│   │   │   ├── features.py
│   │   │   └── __init__.py
│   │   ├── routes/         # API endpoints
│   │   │   ├── listings.py
│   │   │   ├── users.py
│   │   │   └── __init__.py
│   │   ├── db/             # Database setup & session config
│   │   │   ├── connection.py
│   │   │   ├── models.py   # SQLAlchemy or Tortoise ORM models
│   │   │   └── __init__.py
│   │   ├── services/       # Logic/validation/business rules
│   │   ├── utils/          # Utility functions (e.g., image upload, auth)
│   │   └── main.py         # App entrypoint
│   └── requirements.txt
│
├── frontend/               # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   │   ├── ListingCard.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── ListingForm.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx
│   │   │   ├── ListingDetail.jsx
│   │   │   ├── AddListing.jsx
│   │   ├── services/       # Axios calls to backend
│   │   ├── App.jsx
│   │   ├── index.js
│   └── package.json
│
├── docs/                   # API or project documentation
│
├── .env                    # Env vars (API keys, DB credentials)
├── README.md
└── docker-compose.yml      # Optional for containerized setup


<img width="971" height="683" alt="image" src="https://github.com/user-attachments/assets/3bab6f8e-5fd3-4b15-a46f-fb7954abdd06" />


