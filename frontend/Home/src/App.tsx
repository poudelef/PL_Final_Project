import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import api from "./api";
import { Link, useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: 0,
    address: "",
    city: "",
    state: "",
    zip: "",
  });

  // const fetchItems = async () => {
  //   const response = await api.get("/users/");
  //   setFormData(response.data);
  // };

  useEffect(() => {
    // fetchItems();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleclickevent = async (event: React.FormEvent) => {
    event.preventDefault(); // Prevent page reload
    await api.post("/users/", formData);
    console.log("Form Submitted:");
    console.log(formData);
    navigate("/appartment");
  };

  const goToAppartment = () => {
    navigate("/appartment");
  };

  return (
    <div className="container-fluid" style={{ minHeight: "100vh" }}>
      <h1>Login Page</h1>
      <form onSubmit={handleclickevent}>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="username">User Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              value={formData.name}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              value={formData.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={formData.password}
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="form-group col-md-6">
          <label htmlFor="address">Address</label>
          <input
            type="text"
            className="form-control"
            id="address"
            value={formData.address}
            onChange={handleChange}
            placeholder="1234 Main St"
          />
        </div>
        <div className="form-row col-md-6">
          <div className="form-group col-md-6">
            <label htmlFor="city">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              value={formData.city}
              onChange={handleChange}
            />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="state">State</label>
            <select
              id="state"
              className="form-control"
              value={formData.state}
              onChange={handleChange}
            >
              <option value="">Choose...</option>
              <option>Ohio</option>
              <option>New York</option>
              <option>California</option>
              <option>Texas</option>
              <option>Florida</option>
              <option>Illinois</option>
              <option>Pennsylvania</option>
            </select>
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="zip">Zip</label>
            <input
              type="text"
              className="form-control"
              id="zip"
              value={formData.zip}
              onChange={handleChange}
            />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}

export default App;
