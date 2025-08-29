// src/auth/Login.tsx
import { useState, type FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const [role, setRole] = useState<"Tenant" | "Landlord" | "">("");

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    if (!email || !password || !role) {
      setError("Please fill all the fields");
      return;
    }

    setLoading(true);
    try {
      const res = await api.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password,
        role: role.trim(),
      });

      if (res.status >= 200 && res.status < 300) {
        // Optional: store token or user
        // localStorage.setItem("token", res.data.token)
        // localStorage.setItem("user", JSON.stringify(res.data.user))
        navigate("/apartments");
      } else {
        setError("Login failed. Try again.");
      }
    } catch (err: any) {
      console.error("Login failed:", err?.response?.data || err);
      const detail =
        err?.response?.data?.detail ??
        err?.response?.data?.message ??
        "Login failed. Try again.";
      setError(
        Array.isArray(detail)
          ? detail.map((d: any) => d.msg).join(", ")
          : detail
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center bg-secondary vh-100">
      <div className="bg-white p-3 rounded w-25">
        <h2>Login</h2>

        {error && (
          <div className="alert alert-danger py-2" role="alert">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          <div className="mb-3">
            <label htmlFor="email">
              <strong>Email</strong>
            </label>
            <input
              id="email"
              type="email"
              placeholder="Enter Email"
              name="email"
              className="form-control rounded-0"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              autoComplete="email"
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              autoComplete="current-password"
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="role">
              <strong>Role</strong>
            </label>
            <select
              id="role"
              className="form-select rounded-0"
              value={role}
              onChange={(e) =>
                setRole(e.target.value as "Tenant" | "Landlord" | "")
              }
              required
            >
              <option value="">Select role…</option>
              <option value="Tenant">Tenant</option>
              <option value="Landlord">Landlord</option>
            </select>
          </div>

          <button
            type="submit"
            className="btn btn-success w-100 rounded-0"
            disabled={loading}
          >
            {loading ? "Logging in…" : "Login"}
          </button>
        </form>

        <p className="mt-3 mb-0">Don't have an account?</p>
        <Link
          to="/register"
          className="btn btn-default border w-100 bg-light rounded-0 text-decoration-none"
        >
          Sign Up
        </Link>
      </div>
    </div>
  );
}

export default Login;
