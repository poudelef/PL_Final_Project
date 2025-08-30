// src/pages/apply.tsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import api from "../api";
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
  bathrooms: number;
  kitchen: boolean;
  balcony: boolean;
  hall: boolean;
  landlord: { name: string };
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
    <div className="container">
      <div className="row">
        {/* User Info */}
        <div className="col-sm border p-3">
          <h4>User Info</h4>
          {user ? (
            <>
              <p>
                <strong>Name:</strong> {user.name}
              </p>
              <p>
                <strong>Email:</strong> {user.email}
              </p>
              <p>
                <strong>Phone:</strong> {user.phone}
              </p>
              <p>
                <strong>Age:</strong> {user.age}
              </p>
              <p>
                <strong>Address:</strong> {user.address}
              </p>
            </>
          ) : (
            <p>No user data</p>
          )}
        </div>

        {/* Apartment Info */}
        <div className="col-sm border p-3">
          <h4>Apartment Info</h4>
          {apartment ? (
            <>
              <p>
                <strong>Location:</strong> {apartment.app_location}
              </p>
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
              <p>
                <strong>Landlord:</strong> {apartment.landlord?.name}
              </p>
            </>
          ) : (
            <p>No apartment selected</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Apply;
