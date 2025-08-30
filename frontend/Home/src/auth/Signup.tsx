// src/auth/Signup.tsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    age: 0,
    address: "",
    role: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth(); // get login from context

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
      phone: String(formData.phone).trim(),
      age: Number(formData.age),
      address: formData.address.trim(),
      role: formData.role as "Tenant" | "Landlord",
    };

    try {
      const res = await api.post("/users", payload);

      if (res.status >= 200 && res.status < 300) {
        // Pretend backend returns the user in response
        const user = {
          id: res.data.id || "temp-id",
          name: payload.name,
          email: payload.email,
          role: payload.role,
        };

        // Save to AuthContext so user is authenticated right after signup
        login({ user });

        // Role-based redirect
        if (user.role === "Tenant") {
          navigate("/apartments", { replace: true });
        } else if (user.role === "Landlord") {
          navigate("/landlord", { replace: true });
        } else {
          navigate("/", { replace: true });
        }
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

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Sign Up</h2>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

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
            />
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
            />
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
            />
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
              <option value="Landlord">Landlord</option>
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
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="phone">
              <strong>Phone</strong>
            </label>
            <input
              id="phone"
              type="tel"
              placeholder="Phone Number"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
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
            />
          </div>

          <button type="submit" className="btn btn-success w-100 rounded-0">
            {loading ? "Signing Up…" : "Sign Up"}
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
