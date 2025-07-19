from backend.apps.modules.landlord.landlord import LandLord_info, Appartment_info
from backend.apps.modules.landlord.apartmentListing import ApparmentList

def main():
    # Step 1: Create a landlord
    landlord1 = LandLord_info(
        name="John Doe",
        location="Downtown",
        phone="1234567890",
        email="john@example.com",
        age=45,
        gender="Male"
    )

    # Step 2: Create an apartment owned by the landlord
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

    # Step 3: Add this to the apartment listing
    apartment_listing = ApparmentList(appartment=apartment1_info)

    # Step 4: Print results
    print("------ Apartment Listing Info ------")
    print(f"Landlord: {apartment_listing.get_landLord_name()}")
    print(f"Location: {apartment_listing.get_location()}")
    print(f"Price: ${apartment_listing.get_price()}")
    print(f"Bedrooms: {apartment_listing.get_bedrooms()}")
    print(f"Bathrooms: {apartment_listing.get_bathrooms()}")
    print(f"Kitchen: {'Yes' if apartment_listing.get_kitchen() else 'No'}")
    print(f"Balcony: {'Yes' if apartment_listing.get_balcony() else 'No'}")
    print(f"Hall: {'Yes' if apartment_listing.get_hall() else 'No'}")
    print(f"Total Apartments Listed: {apartment_listing.get_total_apparments()}")

if __name__ == "__main__":
    main()
