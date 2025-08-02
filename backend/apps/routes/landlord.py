from backend.apps.modules.apartments.models import Appartment
from backend.apps.modules.apartments.schemas import list_apartments
from fastapi import APIRouter
from backend.apps.config.database import collection_apts
from fastapi.encoders import jsonable_encoder


router = APIRouter()


@router.get("/apartments")
def get_apartments():
    apts = collection_apts.find()
    clean_apts = []
    for apt in apts:
        apt.pop("_id", None)
        clean_apts.append(apt)
    return jsonable_encoder(clean_apts)


@router.post("/apartments")
async def create_apartment(apartment: Appartment):
    collection_apts.insert_one(dict(apartment.dict()))
    return {"message": "Apartment created successfully"}