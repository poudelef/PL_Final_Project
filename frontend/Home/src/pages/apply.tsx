// src/pages/apply.tsx
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";
import Apt1 from "../assets/House.jpg";
import Apt2 from "../assets/Apt2.jpg";
import Apt3 from "../assets/Apt3.jpg";
import Apt4 from "../assets/Apt4.jpg";
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

        {/* <p
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
        ... instructions ... */}

        <div className="container" style={{ marginTop: 20 }}>
          <div className="row align-items-stretch ">
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
            <p
              style={{
                marginTop: "40px",
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
                textShadow: "0 4px 16px rgba(0,0,0,0.45)",
              }}
            >
              <strong>Hello! {user ? user.name : ""} </strong>
            </p>
            <p>
              Before applying for any apartment, please carefully review and
              verify all information provided in the listing. Make sure that
              details such as location, rent, number of rooms, utilities, and
              amenities match your needs and expectations.
            </p>
            <p>When submitting your application, ensure that:</p>{" "}
            <p
              style={{
                paddingLeft: "20px",
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
                textShadow: "0 4px 16px rgba(0,0,0,0.45)",
              }}
            >
              1. Your personal information (name, contact details, ID, etc.) is
              accurate and up to date.
            </p>
            <p
              style={{
                paddingLeft: "20px",
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
                textShadow: "0 4px 16px rgba(0,0,0,0.45)",
              }}
            >
              2. You understand the terms of the lease, including rent amount,
              security deposit, and move-in requirements.
            </p>
            <p
              style={{
                fontSize: "clamp(14px, 1.6vw, 20px)",
                lineHeight: 1.35,
                opacity: 0.95,
                textShadow: "0 4px 16px rgba(0,0,0,0.45)",
              }}
            >
              <strong>Important: </strong>
              Incomplete or false information may result in delays or rejection
              of your application. Please double-check everything before
              proceeding.
            </p>
            <div
              style={{
                alignContent: "center",
                textAlign: "center",
                marginBottom: "40px",
                marginTop: "40px",
              }}
            ></div>
          </div>
        </div>

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

{
}
