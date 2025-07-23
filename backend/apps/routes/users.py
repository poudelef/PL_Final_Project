from fastapi import APIRouter
from backend.apps.modules.users.models import User_info
from backend.apps.modules.users.schemas import UserCreate, UserResponse
from typing import List

router = APIRouter()

users_db = []

@router.post("/users/", response_model=UserResponse)
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

@router.get("/users/", response_model=List[UserResponse])
def list_users():
    return [UserResponse(
        name=u.name,
        email=u.email,
        phone=u.phone,
        age=u.age,
        address=u.address,
        registration_date=u.registration_date
    ) for u in users_db] 