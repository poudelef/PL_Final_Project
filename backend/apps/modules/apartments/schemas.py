from backend.apps.modules.apartments.models import Appartment_info

def apartment_to_dict(apt: Appartment_info) -> dict:
    landlord = apt.get_landlord()
    return {
        "app_location": apt.get_location(),
        "price": apt.get_price(),
        "features": apt.get_features(),
        "landlord": {
            "name": landlord.get_name(),
            "email": landlord.get_email(),
            "phone": landlord.get_phone(),
            "location": landlord.get_location(),
            "age": landlord.get_age(),
            "gender": landlord.get_gender()
        }
    }


def list_apartments(apts) -> list:
    return [apartment_to_dict(apt) for apt in apts]