import { useNavigate } from "react-router-dom";
import wooden from "../assets/Bg.png";
import Apt1 from "../assets/House.jpg";
import "./apt_card.css";

interface LandlordProps {
  name: string;
  email: string;
  phone: string;
  location: string;
  age: number;
  gender?: string;
}

interface ApartmentProps {
  app_location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  kitchen: boolean;
  balcony: boolean;
  hall: boolean;
  available: boolean;
  landlord: LandlordProps;
}

type AptCardProps = {
  apt: ApartmentProps;
  userData: any;
};

const AptCard = ({ apt, userData }: AptCardProps) => {
  const navigate = useNavigate();

  const onApplyClick = () => {
    navigate("./apply", { state: { user: userData, apartment: apt } });
  };

  return (
    <div className="card shadow-sm border-0 apt-card">
      <div className="card-header bg-light py-2">
        <h3 className="h6 mb-0">{apt.app_location}</h3>
      </div>

      <div className="row g-0">
        <div className="col-md-4 d-flex align-items-center">
          <img
            src={Apt1}
            className="img-fluid rounded-start p-3"
            alt="Apartment"
          />
        </div>

        <div className="col-md-8">
          <div className="card-body">
            <h5 className="text-primary mb-3">
              ${apt.price.toLocaleString()} / month
            </h5>

            <p className="mb-1">
              <strong>Bedrooms:</strong> {apt.bedrooms} &nbsp;|&nbsp;
              <strong>Bathrooms:</strong> {apt.bathrooms}
            </p>

            <p className="mb-1">
              <strong>Kitchen:</strong> {apt.kitchen ? "Yes" : "No"}{" "}
              &nbsp;|&nbsp;
              <strong>Hall:</strong> {apt.hall ? "Yes" : "No"} &nbsp;|&nbsp;
              <strong>Balcony:</strong> {apt.balcony ? "Yes" : "No"}
            </p>

            <p className="text-muted mb-3">
              Landlord: {apt.landlord.name} ({apt.landlord.phone})
            </p>

            <div className="text-center pb-2">
              <button
                className="btn btn-dark px-4"
                onClick={onApplyClick}
                style={{ marginTop: "20px" }}
              >
                More Info
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AptCard;
