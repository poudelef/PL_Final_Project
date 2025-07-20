from fastapi import FastAPI
from fastapi import Query
from backend.apps.modules.users import User_info, UserCreate, UserResponse
from backend.apps.modules.landlord.landlord import LandLord_info, Appartment_info
from backend.apps.modules.landlord.apartmentListing import ApparmentList
from backend.apps.modules.searchFilter import SearchFilter
from pydantic import BaseModel
from typing import List

app = FastAPI()

# Routers will be included here after creation

users_db = []  # In-memory user storage

@app.post("/users/", response_model=UserResponse)
def create_user(user: UserCreate):
    new_user = User_info(
        name=user.name,
        email=user.email,
        phone=user.phone,
        age=user.age,
        address=user.address
    )
    users_db.append(new_user)
    return UserResponse(
        name=new_user.name,
        email=new_user.email,
        phone=new_user.phone,
        age=new_user.age,
        address=new_user.address,
        registration_date=new_user.registration_date
    )

@app.get("/users/", response_model=list[UserResponse])
def list_users():
    return [UserResponse(
        name=u.name,
        email=u.email,
        phone=u.phone,
        age=u.age,
        address=u.address,
        registration_date=u.registration_date
    ) for u in users_db]

@app.get("/users/count")
def count_users():
    return {"total_users": len(users_db)}

# --- Landlord Models ---
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

landlords_db = []

@app.post("/landlords/", response_model=LandlordResponse)
def create_landlord(landlord: LandlordCreate):
    new_landlord = LandLord_info(
        name=landlord.name,
        location=landlord.location,
        phone=landlord.phone,
        email=landlord.email,
        age=landlord.age,
        gender=landlord.gender
    )
    landlords_db.append(new_landlord)
    return LandlordResponse(
        name=new_landlord.name,
        location=new_landlord.location,
        phone=new_landlord.phone,
        email=new_landlord.email,
        age=new_landlord.age,
        gender=new_landlord.gender
    )

@app.get("/landlords/", response_model=List[LandlordResponse])
def list_landlords():
    return [LandlordResponse(
        name=l.name,
        location=l.location,
        phone=l.phone,
        email=l.email,
        age=l.age,
        gender=l.gender
    ) for l in landlords_db]

# --- Apartment Models ---
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

apartments_db = []

@app.post("/apartments/", response_model=ApartmentResponse)
def create_apartment(apartment: ApartmentCreate):
    landlord = landlords_db[apartment.landlord_index]
    new_apartment = Appartment_info(
        landlord=landlord,
        app_location=apartment.app_location,
        bedrooms=apartment.bedrooms,
        bathrooms=apartment.bathrooms,
        kitchen=apartment.kitchen,
        balcony=apartment.balcony,
        hall=apartment.hall,
        price=apartment.price
    )
    apartments_db.append(new_apartment)
    return ApartmentResponse(
        landlord_name=landlord.name,
        app_location=new_apartment.app_location,
        bedrooms=new_apartment.bedrooms,
        bathrooms=new_apartment.bathrooms,
        kitchen=new_apartment.kitchen,
        balcony=new_apartment.balcony,
        hall=new_apartment.hall,
        price=new_apartment.price
    )

@app.get("/apartments/", response_model=List[ApartmentResponse])
def list_apartments():
    return [ApartmentResponse(
        landlord_name=a.landlord.get_landLord_name(),
        app_location=a.app_location,
        bedrooms=a.bedrooms,
        bathrooms=a.bathrooms,
        kitchen=a.kitchen,
        balcony=a.balcony,
        hall=a.hall,
        price=a.price
    ) for a in apartments_db]

@app.get("/apartments/search", response_model=List[ApartmentResponse])
def search_apartments(
    location: str = Query(None),
    min_price: int = Query(None),
    max_price: int = Query(None),
    bedrooms: int = Query(None),
    bathrooms: int = Query(None),
    kitchen: bool = Query(None),
    balcony: bool = Query(None),
    hall: bool = Query(None)
):
    search = SearchFilter(
        location=location,
        min_price=min_price,
        max_price=max_price,
        bedrooms=bedrooms,
        bathrooms=bathrooms,
        kitchen=kitchen,
        balcony=balcony,
        hall=hall
    )
    matching = search.filter_apartments(apartments_db)
    return [ApartmentResponse(
        landlord_name=a.landlord.get_landLord_name(),
        app_location=a.app_location,
        bedrooms=a.bedrooms,
        bathrooms=a.bathrooms,
        kitchen=a.kitchen,
        balcony=a.balcony,
        hall=a.hall,
        price=a.price
    ) for a in matching]

@app.get("/")
def root():
    return {"message": "Welcome to the Apartment Listing API"}
