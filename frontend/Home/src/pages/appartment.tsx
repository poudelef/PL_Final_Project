import { useEffect, useState } from "react";
import axios from "axios";
import AptCard from "../components/apt_card";
import { useLocation } from "react-router-dom";

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
  const userData = useLocation().state?.userData;

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
    <div
      className="container-fluid px-0 text-center"
      style={{ backgroundColor: "#D8C0A8" }}
    >
      <div
        style={{
          // marginBottom: "20px",
          // marginTop: "20px",
          position: "relative",
          backgroundColor: "#D8C0A8",
          height: "100%",
          display: "flex",
          justifyContent: "center", // center horizontally
          alignItems: "center", // center vertically
          padding: "20px",
        }}
      >
        <nav>
          <form
            className="d-flex"
            style={{ gap: "10px", justifyContent: "center" }}
          >
            <input
              className="form-control"
              type="search"
              placeholder="Search by address"
              aria-label="Search"
              style={{
                width: "50vw", // half of screen width
                borderRadius: "12px", // rounded edges
                padding: "10px 14px", // nicer spacing
              }}
            />
            <button
              className="btn btn-outline-success"
              type="submit"
              style={{
                backgroundColor: "white",
                borderRadius: "12px", // match input
                padding: "10px 20px",
              }}
            >
              Search
            </button>
          </form>
        </nav>
      </div>

      {/* <h1>Apartments</h1> */}
      <div className="row">
        {apartments.map((apt) => (
          <div className="col-md-6 mb-4" key={apt.app_location}>
            <AptCard apt={apt} userData={userData} />
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
