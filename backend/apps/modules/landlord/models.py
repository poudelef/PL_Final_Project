class LandLord_info:
    def __init__(self, name=None, location=None, phone=None, email=None, age=None, gender=None):
        self.name = name
        self.location = location
        self.phone = phone
        self.email = email
        self.age = age
        self.gender = gender

    def get_landLord_name(self):
        return self.name
    def get_location(self):
        return self.location
    def get_phone(self):
        return self.phone
    def get_email(self):
        return self.email
    def get_age(self):
        return self.age
    def get_gender(self):
        return self.gender

class Appartment_info:
    def __init__(self, landlord: LandLord_info, app_location=None, bedrooms=None, bathrooms=None, kitchen=False, balcony=False, hall=False, price=0):
        self.landlord = landlord
        self.app_location = app_location
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.kitchen = kitchen
        self.balcony = balcony
        self.hall = hall
        self.price = price

    def get_landLord_name(self):
        return self.landlord.get_landLord_name()
    def get_location(self):
        return self.app_location
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

class ApparmentList:
    number_of_apparments = 0

    def __init__(self, appartment):
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