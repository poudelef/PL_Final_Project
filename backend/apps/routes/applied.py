from fastapi import APIRouter, HTTPException, status
from fastapi.encoders import jsonable_encoder
from backend.apps.config.database import Applied_apts
from backend.apps.modules.apartments.models import Appartment, AppliedApartment

router = APIRouter(prefix="/applied_apartments", tags=["Applied"])

@router.get("", response_model=list[dict])
def get_applied_apartments():
    apts = Applied_apts.find().sort("applied_at", -1)
    clean = []
    for doc in apts:
        doc["_id"] = str(doc["_id"])
        clean.append(doc)
    return jsonable_encoder(clean)

@router.post("", status_code=status.HTTP_201_CREATED)
def apply_apartment(application: AppliedApartment):
    res = Applied_apts.insert_one(jsonable_encoder(application))
    if not res.inserted_id:
        raise HTTPException(status_code=500, detail="Failed to save application.")
    return {"message": "Application saved", "id": str(res.inserted_id)}
