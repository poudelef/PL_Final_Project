import { useEffect, useState } from "react";
import axios from "axios";
import AptCard from "./components/apt_card";

interface Landlord {
  name: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  gender?: string;
}

interface Apartment {
  app_location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  kitchen: boolean;
  balcony: boolean;
  hall: boolean;
  available: boolean;
  landlord: Landlord;
}

function Appartment() {
  const [apartments, setApartments] = useState<Apartment[]>([]);

  useEffect(() => {
    axios
      .get("http://localhost:8000/apartments/")
      .then((response) => {
        console.log("Fetched apartments:", response.data);
        setApartments(response.data);
      })
      .catch((error) => {
        console.error("Error fetching apartments:", error);
      });
  }, []);

  return (
    <div className="container text-center">
      <h1>Apartment List</h1>
      <div className="row">
        {apartments.map((apt) => (
          <div className="col-md-6 mb-4" key={apt.app_location}>
            <AptCard apt={apt} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Appartment;

{
  /* <ul>
        {apartments.map((apt) => (
          <li key={apt.app_location}>
            <strong>{apt.app_location}</strong> — {apt.bedrooms} beds — $
            {apt.price} — Landlord: {apt.landlord.name}
          </li>
        ))}
      </ul> */
}
