from fastapi import FastAPI
from fastapi import Query
from backend.apps.modules.users.models import User_info
from backend.apps.modules.users.schemas import UserCreate, UserResponse
from backend.apps.modules.landlord.models import LandLord_info, Appartment_info, ApparmentList
from backend.apps.modules.landlord.schemas import LandlordCreate, LandlordResponse, ApartmentCreate, ApartmentResponse
from backend.apps.modules.landlord.services import SearchFilter
from pydantic import BaseModel
from typing import List
from backend.apps.routes.landlord import router as landlord_router
from backend.apps.routes.users import router as users_router

app = FastAPI()
app.include_router(landlord_router)
app.include_router(users_router)

# Routers will be included here after creation

users_db = []  # In-memory user storage

landlords_db = []

apartments_db = []

@app.get("/")
def root():
    return {"message": "Welcome to the Apartment Listing API"}
