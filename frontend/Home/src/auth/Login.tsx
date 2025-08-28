import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    if (!email || !password || !role) {
      setError("Please fill all the fields");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        email: email.trim(),
        password,
        role: role.trim(),
      };
      const res = await axios.post(
        "http://localhost:8080/api/v1/auth/login",
        payload
      );
      if (res.status >= 200 && res.status < 300) {
        navigate("/home");
      } else {
        setError("Login failed. Try again.");
      }
    } catch (err) {
      setError("Login failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              id="email"
              type="text"
              placeholder="Enter Email"
              autoComplete="off"
              name="email"
              className="form-control rounded-0"
              onChange={(e) => setEmail(e.target.value)}
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
              placeholder="Enter Password"
              name="password"
              className="form-control rounded-0"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="role">
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
              <option value="LandLord">LandLord</option>
            </select>
          </div>
          <button type="submit" className="btn btn-success w-100 rounded-0">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
