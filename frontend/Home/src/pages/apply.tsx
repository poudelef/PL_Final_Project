import { useLocation } from "react-router-dom";

function Apply() {
  const location = useLocation();
  const { user, apartment } = location.state || {};

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
                <strong>Address:</strong> {user.address}, {user.city},{" "}
                {user.state}, {user.zip}
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
                <strong>Landlord:</strong> {apartment.landlord.name}
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
