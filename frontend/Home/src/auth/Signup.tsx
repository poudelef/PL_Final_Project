// Signup form using React functional Component and hooks for state management

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import api from "../api";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: 0,
    address: "",
    role: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    const { name, email, password, role } = formData;
    if (!name || !email || !password || !role) {
      setError("Please fill all the fields");
      return;
    }

    setLoading(true);
    const payload = {
      name: formData.name.trim(),
      email: formData.email.trim().toLowerCase(),
      password: formData.password,
      role: formData.role as "Tenant" | "Landlord",
      address: formData.address.trim(),
      phone: String(formData.phone).trim(),
      age: Number(formData.age),
    };

    try {
      const res = await api.post("/users", payload); // baseURL http://127.0.0.1:8000
      if (res.status >= 200 && res.status < 300) {
        navigate("/apartments", { state: { userData: payload } });
      } else {
        setError("Signup failed. Try again.");
      }
    } catch (err: any) {
      console.error("POST /users failed:", err?.response || err);
      setError(
        err?.response?.data?.message ||
          err?.response?.statusText ||
          err?.message ||
          "Signup failed. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // 100–199 → Informational (request received, continuing process)

  // 200–299 → Success (request succeeded)

  // 300–399 → Redirection (further action needed, resource moved, etc.)

  // 400–499 → Client Error (problem with request, e.g., bad input, unauthorized)

  // 500–599 → Server Error (problem on server side)

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="name">
              <strong>Name</strong>
            </label>
            <input
              id="name"
              type="text"
              placeholder="Full Name"
              name="name"
              value={formData.name}
              className="form-control rounded-0"
              onChange={handleChange}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              className="form-control rounded-0"
              onChange={handleChange}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label htmlFor="password">
              <strong>Password</strong>
            </label>
            <input
              id="password"
              type="password"
              placeholder="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              minLength={8}
              required
            ></input>
          </div>

          <div className="mb-3">
            <label>
              <strong>Role</strong>
            </label>
            <select
              id="role"
              name="role"
              className="form-select rounded-0"
              value={formData.role}
              onChange={handleChange}
              required
            >
              <option value="">Select role…</option>
              <option value="Tenant">Tenant</option>
              <option value="LandLord">Landlord</option>
            </select>
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
          <div className="mb-3">
            <label htmlFor="phone">
              <strong>Phone</strong>
            </label>
            <input
              id="phone"
              type="number"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            ></input>
          </div>
          <div className="mb-3">
            <label htmlFor="age">
              <strong>Age</strong>
            </label>
            <input
              id="age"
              type="number"
              placeholder="Age"
              name="age"
              value={formData.age}
              onChange={handleChange}
              required
            ></input>
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            {loading ? "Signing Up..." : "Sign Up"}
          </button>
        </form>
        <p>Already have an account?</p>
        <Link
          to="/login"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Login
        </Link>
      </div>
    </div>
  );
}

export default Signup;
