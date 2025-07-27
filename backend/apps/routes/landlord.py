from backend.apps.modules.apartments.models import Appartment
from backend.apps.modules.apartments.schemas import list_apartments
from fastapi import APIRouter
from backend.apps.config.database import collection_apts

router = APIRouter()


@router.get("/apartments")
def get_apartments():
    apts = collection_apts.find()
    return [Appartment(**apt) for apt in apts]

@router.post("/apartments")
async def create_apartment(apartment: Appartment):
    collection_apts.insert_one(dict(apartment.dict()))
    return {"message": "Apartment created successfully"}