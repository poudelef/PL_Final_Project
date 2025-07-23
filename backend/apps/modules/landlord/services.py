class SearchFilter:
    def __init__(self, location=None, min_price=None, max_price=None, bedrooms=None, bathrooms=None, kitchen=None, balcony=None, hall=None):
        self.location = location
        self.min_price = min_price
        self.max_price = max_price
        self.bedrooms = bedrooms
        self.bathrooms = bathrooms
        self.kitchen = kitchen
        self.balcony = balcony
        self.hall = hall

    def get_location(self):
        return self.location
    def get_min_price(self):
        return self.min_price
    def get_max_price(self):
        return self.max_price
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

    def filter_apartments(self, apartment_list):
        filtered_apartments = []
        for apartment in apartment_list:
            if (self.location and self.location != apartment.get_location()):
                continue
            if (self.min_price is not None and apartment.get_price() < self.min_price):
                continue
            if (self.max_price is not None and apartment.get_price() > self.max_price):
                continue
            if (self.bedrooms is not None and apartment.get_bedrooms() != self.bedrooms):
                continue
            if (self.bathrooms is not None and apartment.get_bathrooms() != self.bathrooms):
                continue
            if (self.kitchen is not None and apartment.get_kitchen() != self.kitchen):
                continue
            if (self.balcony is not None and apartment.get_balcony() != self.balcony):
                continue
            if (self.hall is not None and apartment.get_hall() != self.hall):
                continue
            filtered_apartments.append(apartment)
        return filtered_apartments 