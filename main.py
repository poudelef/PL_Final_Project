from backend.apps.modules.landlord.landlord import LandLord_info, Appartment_info
from backend.apps.modules.landlord.apartmentListing import ApparmentList
from backend.apps.modules.searchFilter import SearchFilter
from backend.apps.modules.users import User_info

def main():
    # Create landlord
    landlord1 = LandLord_info(
        name="John Doe",
        location="Downtown",
        phone="1234567890",
        email="john@example.com",
        age=45,
        gender="Male"
    )

    landlord2 = LandLord_info(
        name="David Michel",
        location="Cincinnati",
        phone="12335390",
        email="micheln@example.com",
        age=25,
        gender="Male")

    # Create apartments
    apartment1_info = Appartment_info(
        landlord=landlord1,
        app_location="Downtown Street 22",
        bedrooms=2,
        bathrooms=1,
        kitchen=True,
        balcony=True,
        hall=True,
        price=1500
    )

    apartment2_info = Appartment_info(
        landlord=landlord1,
        app_location="CountryTown Street 22",
        bedrooms=4,
        bathrooms=1,
        kitchen=True,
        balcony=True,
        hall=True,
        price=3300,
    )
    apartment3_info = Appartment_info(
        landlord=landlord2,
        app_location="3033 Clifton Avenue",
        bedrooms=1,
        bathrooms=1,
        kitchen=True,
        balcony=False,
        hall=True,
        price=900,
    )

    # Wrap in ApparmentList
    apartment1 = ApparmentList(appartment=apartment1_info)
    apartment2 = ApparmentList(appartment=apartment2_info)
    apartment3 = ApparmentList(appartment=apartment3_info)
    all_listings = [apartment1, apartment2, apartment3]

    total_landlord = set()
    # Print apartment info
    for i, apt in enumerate(all_listings, 1):
        print(f"\n------ Apartment {i} Info ------")
        print(f"Landlord: {apt.get_landLord_name()}")
        total_landlord.add(apt.get_landLord_name())
        print(f"Location: {apt.get_location()}")
        print(f"Price: ${apt.get_price()}")
        print(f"Bedrooms: {apt.get_bedrooms()}")
        print(f"Bathrooms: {apt.get_bathrooms()}")
        print(f"Kitchen: {'Yes' if apt.get_kitchen() else 'No'}")
        print(f"Balcony: {'Yes' if apt.get_balcony() else 'No'}")
        print(f"Hall: {'Yes' if apt.get_hall() else 'No'}")
        


    # Filter apartments
    search = SearchFilter(location="Downtown Street 22", min_price=1000, max_price=1600, bedrooms=2)
    matching = search.filter_apartments(all_listings)

    print("\n====== Total Apartments available ======")
    print(f"Total Available apartment: {int(len(all_listings))}")

    print("\n====== Total Landlords in System ======")
    print(f"Total Landlords: {int(len(total_landlord))}")

    print("\n====== Total Users in System ======")
    print(f"Total Users: {User_info.total_users}")
    for i, user in enumerate (User_info.all_users ,1):
        print(f"Users {i} name:{user.get_name()} -> {user.get_registration_date()}")



    print("\n====== Matching Apartments ======")
    for apt in matching:
        print(f"{apt.get_landLord_name()} — ${apt.get_price()} at {apt.get_location()}")

if __name__ == "__main__":
    main()
