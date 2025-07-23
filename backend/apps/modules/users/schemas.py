from pydantic import BaseModel
from typing import Optional

class UserCreate(BaseModel):
    name: str
    email: str
    phone: str
    age: int
    address: str

class UserResponse(BaseModel):
    name: str
    email: str
    phone: str
    age: int
    address: str
    registration_date: str 