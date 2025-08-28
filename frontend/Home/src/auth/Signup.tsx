// Signup form using React functional Component and hooks for state management

import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!name || !email || !password || !role) {
      setError("Please fill all the fields");
      return;
    }

    setLoading(true);
    // Payload is simple JavaScript object that will collect all the form state
    // into single object and send it to the backend using axios
    try {
      const payload = {
        name: name.trim(),
        email: email.trim(),
        password,
        role: role.trim(),
      };
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/register",
        payload
      );

      if (res.status >= 200 && res.status < 300) {
        navigate("/login");
      } else {
        setError("Signup failed. Try again.");
      }
    } catch (err) {
      setError("Signup failed. Try again.");
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
              placeholder="Enter Name"
              name="email"
              value={name}
              className="form-control rounded-0"
              onChange={(e) => setName(e.target.value)}
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
              value={email}
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <option value="">Select role…</option>
              <option value="Tentant">Tennant</option>
              <option value="LandLord">Landlord</option>
            </select>
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
          Login{" "}
        </Link>
      </div>
    </div>
  );
}

export default Signup;
