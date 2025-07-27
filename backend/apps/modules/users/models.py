
from pydantic import BaseModel, Field

class Users(BaseModel):
    name: str = Field(..., description="Name of the user")
    email: str = Field(..., description="Email address of the user")
    phone: str = Field(..., description="Phone number of the user")
    age: int = Field(..., ge=0, description="Age of the user")
    address: str = Field(..., description="Address of the user")
    registration_date: str = Field(..., description="Registration date of the user in YYYY-MM-DD format") 