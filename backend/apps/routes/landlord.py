from fastapi import APIRouter
from backend.apps.modules.landlord.models import LandLord_info, Appartment_info, ApparmentList
from backend.apps.modules.landlord.schemas import LandlordCreate, LandlordResponse, ApartmentCreate, ApartmentResponse
from typing import List

router = APIRouter()

landlords_db = []
apartments_db = []

@router.post("/landlords/", response_model=LandlordResponse)
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

@router.get("/landlords/", response_model=List[LandlordResponse])
def list_landlords():
    return [LandlordResponse(
        name=l.name,
        location=l.location,
        phone=l.phone,
        email=l.email,
        age=l.age,
        gender=l.gender
    ) for l in landlords_db]

@router.post("/apartments/", response_model=ApartmentResponse)
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
        landlord_name=new_apartment.get_landLord_name(),
        app_location=new_apartment.get_location(),
        bedrooms=new_apartment.get_bedrooms(),
        bathrooms=new_apartment.get_bathrooms(),
        kitchen=new_apartment.get_kitchen(),
        balcony=new_apartment.get_balcony(),
        hall=new_apartment.get_hall(),
        price=new_apartment.get_price()
    )

@router.get("/apartments/", response_model=List[ApartmentResponse])
def list_apartments():
    return [ApartmentResponse(
        landlord_name=a.get_landLord_name(),
        app_location=a.get_location(),
        bedrooms=a.get_bedrooms(),
        bathrooms=a.get_bathrooms(),
        kitchen=a.get_kitchen(),
        balcony=a.get_balcony(),
        hall=a.get_hall(),
        price=a.get_price()
    ) for a in apartments_db] 