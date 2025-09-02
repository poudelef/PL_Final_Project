// src/pages/apply.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Apt1 from "../assets/House.jpg";
import Apt2 from "../assets/Apt2.jpg";
import Apt3 from "../assets/Apt3.jpg";
import Apt4 from "../assets/Apt4.jpg";

type User = {
  id: string;
  name: string;
  email: string;
  phone: string;
  age: number;
  address: string;
  role: "Tenant" | "Landlord";
};

type Apartment = {
  app_location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  kitchen: boolean;
  balcony: boolean;
  hall: boolean;
  landlord: {
    name: string;
    phone: string;
    email: string;
    location: string;
  } | null;
};

function Apply() {
  const location = useLocation();
  const { user: authUser } = useAuth(); // user from context: { id, name, email, role }
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const apartment: Apartment | undefined = (location.state as any)?.apartment;

  useEffect(() => {
    // If we have a logged-in user, fetch the full record from backend
    if (!authUser?.id) {
      setLoading(false);
      return;
    }
    const run = async () => {
      try {
        const res = await api.get<User>(`/users/${authUser.id}`);
        setUser(res.data);
      } catch (e) {
        console.error("Failed to fetch user:", e);
      } finally {
        setLoading(false);
      }
    };
    run();
  }, [authUser?.id]);

  if (loading) return <div className="container p-3">Loading…</div>;

  return (
    <div className="container" style={{ marginTop: 20 }}>
      <div className="row align-items-stretch ">
        <div className="col-md-6 border p-3 mb-3 mb-md-0 ">
          {apartment ? (
            <>
              <h4 style={{ textAlign: "center" }}>
                <strong></strong> {apartment.app_location}
              </h4>
              <p>
                <strong>Price:</strong> ${apartment.price}
              </p>
              <p>
                <strong>Bedrooms:</strong> {apartment.bedrooms}
              </p>
              <p>
                <strong>Bathrooms:</strong> {apartment.bathrooms}
              </p>
              <p>
                <strong>Kitchen:</strong> {apartment.kitchen ? "Yes" : "No"}
              </p>
              <p>
                <strong>Balcony:</strong> {apartment.balcony ? "Yes" : "No"}
              </p>
              <p>
                <strong>Hall:</strong> {apartment.hall ? "Yes" : "No"}
              </p>
              <p className="text-center">
                -------------------LandLord Details-------------------
              </p>
              <p>
                <strong>Name:</strong> {apartment.landlord?.name}
              </p>
              <p>
                <strong>Phone:</strong> {apartment.landlord?.phone}
              </p>
              <p>
                <strong>Email:</strong> {apartment.landlord?.email}
              </p>
              <p>
                <strong>Address:</strong> {apartment.landlord?.location}
              </p>
            </>
          ) : (
            <p>No apartment selected</p>
          )}
        </div>
        <div
          className="col-md-6"
          style={{
            display: "flex",
            alignContent: "center",
            justifyContent: "center",
            textAlign: "center",
          }}
        >
          <div
            id="apartmentCarousel"
            className="carousel slide w-100"
            data-bs-ride="carousel"
          >
            <div className="carousel-inner">
              <div className="carousel-item active">
                <img
                  src={Apt1}
                  alt="Apartment 1"
                  className="d-block w-100 img-thumbnail"
                  style={{ objectFit: "cover" }}
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Apt2}
                  alt="Apartment 2"
                  className="d-block w-100 img-thumbnail"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Apt3}
                  alt="Apartment 3"
                  className="d-block w-100 img-thumbnail"
                />
              </div>
              <div className="carousel-item">
                <img
                  src={Apt4}
                  alt="Apartment 4"
                  className="d-block w-100 img-thumbnail"
                />
              </div>
            </div>

            {/* Prev/Next Buttons */}
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#apartmentCarousel"
              data-bs-slide="prev"
            >
              <span
                className="carousel-control-prev-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button
              className="carousel-control-next"
              type="button"
              data-bs-target="#apartmentCarousel"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
      <div className=" justify-content-center" style={{ marginTop: 20 }}>
        <p style={{ marginTop: "40px" }}>
          <strong>Hello! {user ? user.name : ""} </strong>
        </p>
        <p>
          Before applying for any apartment, please carefully review and verify
          all information provided in the listing. Make sure that details such
          as location, rent, number of rooms, utilities, and amenities match
          your needs and expectations.
        </p>
        <p>When submitting your application, ensure that:</p>{" "}
        <p style={{ paddingLeft: "20px" }}>
          1. Your personal information (name, contact details, ID, etc.) is
          accurate and up to date.
        </p>
        <p style={{ paddingLeft: "20px" }}>
          2. You understand the terms of the lease, including rent amount,
          security deposit, and move-in requirements.
        </p>
        <p>
          <strong>Important: </strong>
          Incomplete or false information may result in delays or rejection of
          your application. Please double-check everything before proceeding.
        </p>
        <div
          style={{
            alignContent: "center",
            textAlign: "center",
            marginBottom: "40px",
            marginTop: "40px",
          }}
        >
          <button type="button" className="btn btn-primary btn-lg">
            Submit Application
          </button>
        </div>
      </div>
    </div>
  );
}

export default Apply;
