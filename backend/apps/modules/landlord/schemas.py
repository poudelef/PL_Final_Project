from pydantic import BaseModel
from typing import Optional

class LandlordCreate(BaseModel):
    name: str
    location: str
    phone: str
    email: str
    age: int
    gender: str

class LandlordResponse(BaseModel):
    name: str
    location: str
    phone: str
    email: str
    age: int
    gender: str

class ApartmentCreate(BaseModel):
    landlord_index: int  # Index in landlords_db for now
    app_location: str
    bedrooms: int
    bathrooms: int
    kitchen: bool
    balcony: bool
    hall: bool
    price: int

class ApartmentResponse(BaseModel):
    landlord_name: str
    app_location: str
    bedrooms: int
    bathrooms: int
    kitchen: bool
    balcony: bool
    hall: bool
    price: int 