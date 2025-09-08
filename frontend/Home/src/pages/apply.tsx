// src/pages/apply.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
// ...imports for images omitted for brevity

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
  const navigate = useNavigate();
  const { user: authUser } = useAuth();

  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const apartment: Apartment | undefined = (location.state as any)?.apartment;

  // ---- Submit application ----
  const handleSubmit = async () => {
    setError("");

    if (!authUser?.id) {
      setError("Please sign in before applying.");
      return;
    }
    if (!apartment) {
      setError("No apartment selected.");
      return;
    }

    const payload = {
      tenant_id: authUser.id,
      tenant_name: authUser.name,
      tenant_email: authUser.email,
      apartment, // snapshot stored in backend
      applied_at: new Date().toISOString(),
    };

    try {
      setLoading(true);
      // Use the exact path your backend exposes (leading slash is safest)
      await api.post("/applied_apartments", payload);
      // Navigate to a confirmation or “my applications” page
      navigate("/Application_Sent", { replace: true });
    } catch (e: any) {
      console.error(e);
      setError(e?.response?.data?.detail ?? "Failed to submit application.");
    } finally {
      setLoading(false);
    }
  };

  // ---- Load full user record if logged in ----
  useEffect(() => {
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
      {/* ... left card + carousel unchanged ... */}

      <div className="justify-content-center" style={{ marginTop: 20 }}>
        {!!error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <p
          style={{
            marginTop: "40px",
            fontSize: "clamp(14px, 1.6vw, 20px)",
            lineHeight: 1.35,
            opacity: 0.95,
            textShadow: "0 4px 16px rgba(0,0,0,0.45)",
          }}
        >
          <strong>Hello! {user ? user.name : ""}</strong>
        </p>
        {/* ... instructions ... */}

        <div
          style={{
            alignContent: "center",
            textAlign: "center",
            marginBottom: "40px",
            marginTop: "40px",
          }}
        >
          <button
            type="button"
            className="btn btn-primary btn-lg"
            style={{
              marginBottom: 40,
              background: "#3C3C3C",
              fontSize: "clamp(14px, 1.6vw, 20px)",
              lineHeight: 1.35,
              opacity: 0.95,
              textShadow: "0 4px 16px rgba(0,0,0,0.45)",
            }}
            onClick={handleSubmit}
            disabled={!apartment || !authUser?.id}
          >
            Submit Application
          </button>

          <button
            type="button"
            className="btn btn-secondary btn-lg"
            style={{
              marginBottom: 40,
              marginLeft: "10px",
              background: "#3C3C64",
              fontSize: "clamp(14px, 1.6vw, 20px)",
              lineHeight: 1.35,
              opacity: 0.95,
              textShadow: "0 4px 16px rgba(0,0,0,0.45)",
            }}
            onClick={() => navigate(-1)} // <-- go back
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default Apply;
