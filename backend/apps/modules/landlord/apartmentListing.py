import backend.apps.modules.landlord.landlord as landlord

class ApparmentList:
    number_of_apparments = 0

    def __init__(self, appartment: landlord.Appartment_info): # appertment is expected to be the type Appartment_info which is defined in landlord.py 
        self.landLordname = appartment.get_landLord_name()
        self.location = appartment.get_location()
        self.price = appartment.get_price()
        self.bedrooms = appartment.get_bedrooms()
        self.bathrooms = appartment.get_bathrooms()
        self.kitchen = appartment.get_kitchen()
        self.balcony = appartment.get_balcony()
        self.hall = appartment.get_hall()

        ApparmentList.number_of_apparments += 1

    def get_landLord_name(self):
        return self.landLordname
    def get_location(self):
        return self.location
    def get_price(self):
        return self.price
    def get_bedrooms(self):
        return self.bedrooms
    def get_bathrooms(self):
        return self.bathrooms
    def get_kitchen(self):
        return self.kitchen
    def get_balcony(self):
        return self.balcony
    def get_hall(self):
        return self.hall
    def get_total_apparments(self):
        return ApparmentList.number_of_apparments
