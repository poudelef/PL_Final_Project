import { useEffect, useState } from "react";
import axios from "axios";
import AptCard from "../components/apt_card";
import { useLocation, useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();
  const [apartments, setApartments] = useState<Apartment[]>([]);
  const userData = useLocation().state?.userData;

  useEffect(() => {
    axios
      .get("http://localhost:8000/apartments/")
      .then((response) => setApartments(response.data))
      .catch((error) => console.error("Error fetching apartments:", error));
  }, []);

  return (
    <div
      className="container-fluid px-0 text-center"
      style={{ backgroundColor: "#D8C0A8" }}
    >
      {/* top bar */}
      <div
        className="d-flex align-items-center justify-content-center gap-3 py-3"
        style={{ backgroundColor: "#D8C0A8" }}
      >
        <form className="d-flex gap-2" onSubmit={(e) => e.preventDefault()}>
          <input
            className="form-control"
            type="search"
            placeholder="Search by address"
            aria-label="Search"
            style={{ width: "50vw", borderRadius: 12 }}
          />
          <button
            className="btn btn-outline-success bg-white"
            type="submit"
            style={{ borderRadius: 12 }}
          >
            Search
          </button>
        </form>

        <button
          className="btn btn-warning rounded-circle d-flex align-items-center justify-content-center"
          style={{ width: 45, height: 45 }}
          onClick={() => navigate("/user/profile")}
          aria-label="Profile"
        >
          H
        </button>
      </div>

      {/* cards grid */}
      <div className="container">
        <div className="row g-4">
          {apartments.map((apt) => (
            <div className="col-md-6" key={apt.app_location}>
              {/* add me-4 to push right margin if you want extra spacing */}
              <div className="me-md-4">
                <AptCard apt={apt} userData={userData} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Appartment;
