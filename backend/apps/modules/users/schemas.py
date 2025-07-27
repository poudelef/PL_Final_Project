# from pydantic import BaseModel
# from typing import Optional

# class UserCreate(BaseModel):
#     name: str
#     email: str
#     phone: str
#     age: int
#     address: str

# class UserResponse(BaseModel):
#     name: str
#     email: str
#     phone: str
#     age: int
#     address: str
#     registration_date: str 

def individual_User(user) ->dict:
    return {
        "id": str(user["_id"]),
        "name": user["name"],
        "email": user["email"],
        "phone": user["phone"],
        "age": user["age"],
        "address": user["address"],
        # "registration_date": user["registration_date"]
    }

def list_users(users) -> list:
    return [individual_User(user) for user in users]