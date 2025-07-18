### Project File Structure
apartment-search-app/
│
├── backend/                            # Python FastAPI/Flask backend
│   ├── app/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── db/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py                     # Entrypoint for FastAPI/Flask
│   ├── requirements.txt
│   ├── Dockerfile                      # Backend Docker image
│   └── .env                            # Backend environment variables
│
├── frontend/                           # React frontend
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   ├── package.json
│   ├── Dockerfile                      # Frontend Docker image
│   └── .env                            # Frontend environment variables
│
├── nginx/                              # (Optional) Reverse proxy config
│   └── default.conf                    # Nginx config file
│
├── docker-compose.yml                  # Multi-container orchestration
├── .env                                # Global environment variables
├── README.md
└── docs/

