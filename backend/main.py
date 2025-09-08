from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.apps.routes.users import router 
from backend.apps.routes.landlord import router as landlord_router
from backend.apps.routes.applied import router as applied_router
app = FastAPI()

origins = [
    "http://localhost:5173"
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"]
)


app.include_router(router)
app.include_router(landlord_router)
app.include_router(applied_router)
