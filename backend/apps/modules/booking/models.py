from pydantic import BaseModel 
from backend.apps.modules.apartments.models import LandLord, LandLord_info, Appartment, Appartment_info
from backend.apps.modules.users.models import Users_info

class Booking(BaseModel):
    users: Users_info
    appartment: Appartment 
    landLord: LandLord
    
   # Use of composition 
class BookingServices:
    def __init__(self, booking: Booking, app_info: Appartment_info, landlord_info: LandLord_info, users: Users_info):
        self.booking = booking
        self.app_info = app_info
        self.landlord_info = landlord_info
        self.users_info = Users_info

    def approve(self):
        return f"Booking --> Apartment at {self.app_info.get_location()} approved for {self.users_info.get_name}."
    def reject(self):
        return f"Booking --> Apartment at {self.app_info.get_location()} rejected for {self.users_info.get_name}."
    def pending(self):
        return f"Booking --> Apartment at {self.app_info.get_location()} is still in process."

