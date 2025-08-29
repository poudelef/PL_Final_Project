
from pydantic import BaseModel, Field, EmailStr
from typing import Literal, Optional

Role = Literal["Tenant", "Landlord"]

class Users(BaseModel):
    name: str = Field(..., description="Name of the user")
    email: str = Field(..., description="Email address of the user")
    password: str = Field(..., description="Password for the user account")
    phone: str = Field(..., description="Phone number of the user")
    age: int = Field(..., ge=0, description="Age of the user")
    address: str = Field(..., description="Address of the user")
    role: Role
    

class UserLogin(BaseModel):
    email: EmailStr
    password: str
    role: Optional[Role] = None
    # BaseModel us Pydantic base class used to define data models with validation.
    # Field allows to add metadata, constraints, and descriptions to model fields.
    # Required filed(... means the field is mandatory.
    # Must be string)
    # ge = - in age enforces that age must be greater than or equal to 0

    # Metadata is data about data — it describes and provides information about other data. In programming, metadata can be used to define things like:
        #Field descriptions
        #Validation constraints
        #Default values
        #Formatting rules
        #Documentation hints

    # Users model, metadata is provided using the Field() function from Pydantic.    
class Users_info():
    def __init__(self, name, email, phone, age, address, password):
        self.__name = name
        self.__email = email
        self.__password = password
        self.__phone = phone
        self.__age = age
        self.__address = address
        

    # Getters
    def get_name(self):
        return self.__name

    def get_email(self):
        return self.__email
    
    def get_password(self):
        return self.__password

    def get_phone(self):
        return self.__phone

    def get_age(self):
        return self.__age

    def get_address(self):
        return self.__address



    # Setters
    def set_email(self, new_email):
        self.__email = new_email

    def set_phone(self, new_phone):
        self.__phone = new_phone    