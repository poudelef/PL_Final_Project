
from pydantic import BaseModel, Field

class Users(BaseModel):
    name: str = Field(..., description="Name of the user")
    email: str = Field(..., description="Email address of the user")
    password: str = Field(..., description="Password for the user account")
    phone: str = Field(..., description="Phone number of the user")
    age: int = Field(..., ge=0, description="Age of the user")
    address: str = Field(..., description="Address of the user")
    city: str = Field(..., description="City of the user")
    state: str = Field(..., description="State of the user")
    zip: str = Field(..., description="Zip code of the user")

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