from datetime import date
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

class User_info:
    total_users = 0
    all_users = []
    def __init__(self, name=None, email=None, phone=None, age=None, address=None, ):
        self.name = name
        self.email = email
        self.phone = phone
        self.age = age
        self.address = address
        
        today = date.today()
        self.registration_date = today.strftime("%Y-%m-%d")

        User_info.total_users += 1
        User_info.all_users.append(self)
    
    def get_registration_date(self):
        return self.registration_date
    def get_name(self):
        return self.name
    def get_email(self):
        return self.email
    def get_phone(self):
        return self.phone
    def get_age(self):  
        return self.age
    def get_address(self):
        return self.address
    def get_total_users(self):
        return User_info.total_users