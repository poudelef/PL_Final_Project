import { useNavigate } from "react-router-dom";
import HouseImg from "../assets/House.jpg";

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
    <div
      className="card mb-4 shadow-lg border-0"
      style={{ backgroundColor: "#bbe4e9" }} // soft pastel blue
    >
      <div className="row g-0">
        {/* Image */}
        <div className="col-md-4 d-flex align-items-center">
          <img
            src={HouseImg}
            className="img-fluid rounded-start p-3"
            alt="Apartment"
          />
        </div>

        {/* Info */}
        <div className="col-md-8">
          <div className="card-body">
            {/* Bigger Title */}
            <h3 className="card-title fw-bold text-dark">{apt.app_location}</h3>

            <h5 className="text-primary mb-3">
              ${apt.price.toLocaleString()} / month
            </h5>

            <p className="card-text mb-1">
              <strong>Bedrooms:</strong> {apt.bedrooms} |{" "}
              <strong>Bathrooms:</strong> {apt.bathrooms}
            </p>
            <p className="card-text mb-1">
              <strong>Kitchen:</strong> {apt.kitchen ? "Yes" : "No"} |{" "}
              <strong>Hall:</strong> {apt.hall ? "Yes" : "No"} |{" "}
              <strong>Balcony:</strong> {apt.balcony ? "Yes" : "No"}
            </p>

            <p className="card-text">
              <small className="text-muted">
                Landlord: {apt.landlord.name} ({apt.landlord.phone})
              </small>
            </p>

            {/* Button */}
            <div className="mt-3 text-end">
              <button className="btn btn-primary px-4" onClick={onApplyClick}>
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
