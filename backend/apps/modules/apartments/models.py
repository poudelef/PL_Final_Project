from pydantic import BaseModel, EmailStr, Field
from datetime import datetime
from typing import Optional

# Landlord schema using Pydantic
class LandLord(BaseModel):
    name: str
    location: str
    phone: str
    email: str
    age: int
    gender: Optional[str] = None

# Apartment schema that nests a LandLord object
class Appartment(BaseModel):
    app_location: str
    bedrooms: int
    bathrooms: int
    kitchen: bool 
    balcony: bool
    hall: bool 
    price: float
    available: bool
    landlord: LandLord

class AppliedApartment(BaseModel):
    tenant_id: str
    tenant_name: str
    tenant_email: EmailStr
    apartment: Appartment
    applied_at: datetime = Field(default_factory=datetime.utcnow)    

class LandLord_info:
    def __init__(self, name, location, phone, email, age, gender):
        self.__name = name          # private attribute
        self.__location = location
        self.__phone = phone
        self.__email = email
        self.__age = age
        self.__gender = gender

    # Getters
    def get_name(self):
        return self.__name

    def get_location(self):
        return self.__location

    def get_phone(self):
        return self.__phone

    def get_email(self):
        return self.__email

    def get_age(self):
        return self.__age

    def get_gender(self):
        return self.__gender

    # Setters
    def set_email(self, new_email):
        self.__email = new_email

    def set_phone(self, new_phone):
        self.__phone = new_phone


class Appartment_info:
    def __init__(self, landlord: LandLord_info, app_location, bedrooms, bathrooms, kitchen=False, balcony=False, hall=False, price=0.0):
        self.__landlord = landlord     # Composition (OOP principle)
        self.__app_location = app_location
        self.__bedrooms = bedrooms
        self.__bathrooms = bathrooms
        self.__kitchen = kitchen
        self.__balcony = balcony
        self.__hall = hall
        self.__price = price

    # Getters
    def get_landlord(self):
        return self.__landlord

    def get_location(self):
        return self.__app_location

    def get_price(self):
        return self.__price

    def get_features(self):
        return {
            "bedrooms": self.__bedrooms,
            "bathrooms": self.__bathrooms,
            "kitchen": self.__kitchen,
            "balcony": self.__balcony,
            "hall": self.__hall
        }

    # Example abstraction method
    def summary(self):
        return f"Apartment at {self.__app_location} for ${self.__price} owned by {self.__landlord.get_name()}."

