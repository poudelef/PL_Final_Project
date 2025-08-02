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
};

const AptCard = ({ apt }: AptCardProps) => {
  const onApplyClick = () => {
    alert(`Applied to ${apt.app_location}`);
  };

  return (
    <div className="apt-card border p-3 my-3 rounded shadow-sm">
      <div className="apt-info mb-3">
        <h4>{apt.app_location}</h4>
        <p>Price: ${apt.price}</p>
        <p>Bedrooms: {apt.bedrooms}</p>
        <p>Bathrooms: {apt.bathrooms}</p>
        <p>Kitchen: {apt.kitchen ? "Yes" : "No"}</p>
        <p>Balcony: {apt.balcony ? "Yes" : "No"}</p>
        <p>Hall: {apt.hall ? "Yes" : "No"}</p>
        <p>Landlord: {apt.landlord.name}</p>
      </div>

      <div className="text-end">
        <button className="btn btn-primary" onClick={onApplyClick}>
          Apply
        </button>
      </div>
    </div>
  );
};

export default AptCard;
