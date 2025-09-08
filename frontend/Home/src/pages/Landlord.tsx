import api from "../api";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
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
  kitchen: boolean;
  balcony: boolean;
  bathrooms: number;
  hall: boolean;
  landlord: {
    name: string;
    phone: string;
    email: string;
    location: string;
  } | null;
};

function LandLord_page() {
  const location = useLocation();
  const { user: authUser } = useAuth();
  const [user, setUser] = useState<User | null>(null);
  const [apartment, setApartment] = useState<Apartment | null>(null);
  const [loading, setloading] = useState(true);
  // const apartment: Apartment | undefined = (location.state as any)?.apartment;
  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser?.id) {
      setloading(false);
      return;
    }
    const run = async () => {
      try {
        const res = await api.get<Apartment>(
          `/applied_apartments/${authUser.id}`
        );
        setApartment(res.data);
      } catch (e) {
        console.error("Failed to fetch user data", e);
      } finally {
        setloading(false);
      }
    };
    run();
  }, [authUser?.id]);

  if (loading) return <div className="container p-3">Loading</div>;

  return (
    <div className="container">
      <div
        className="col-md-6 border p-6 mb-6 mb-md-0 "
        style={{
          borderStyle: "dashed",
          borderColor: "#1a1818ff",
          borderWidth: 50,
          borderRadius: 10,
        }}
      >
        {apartment ? (
          <>
            <h4
              style={{
                textAlign: "center",
                marginTop: "10px",
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong></strong> {apartment.app_location}
            </h4>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Price:</strong> ${apartment.price} per month
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Bedrooms:</strong>
              {apartment.bedrooms}
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Bathrooms:</strong> {apartment.bathrooms}
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Kitchen:</strong> {apartment.kitchen ? "Yes" : "No"}
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Balcony:</strong> {apartment.balcony ? "Yes" : "No"}
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Hall:</strong> {apartment.hall ? "Yes" : "No"}
            </p>
            <p
              className="text-center"
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              -------------------LandLord Details-------------------
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Name:</strong> {apartment.landlord?.name}
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Phone:</strong> {apartment.landlord?.phone}
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Email:</strong> {apartment.landlord?.email}
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
              }}
            >
              <strong>Address:</strong> {apartment.landlord?.location}
            </p>
          </>
        ) : (
          <p>No apartment selected</p>
        )}
      </div>
    </div>
  );
}

export default LandLord_page;
