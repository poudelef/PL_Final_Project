import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./context/ProtectedRoute";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Appartment from "./pages/appartment";
import Apply_page from "./pages/apply";
import User from "./pages/User";
import LandLord_page from "./pages/Landlord";
import UnAuthorizedPage from "./pages/UnAuthorizedPage";
import Home from "./pages/Home";
import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Signup />} />
          <Route path="/UnAuthorized_Access" element={<UnAuthorizedPage />} />

          {/* Protected */}
          <Route
            path="/apartments"
            element={
              <ProtectedRoute roles={["Tenant"]}>
                <Appartment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/landlord"
            element={
              <ProtectedRoute roles={["Landlord"]}>
                <LandLord_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["Tenant", "Landlord"]}>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apartments/apply"
            element={
              <ProtectedRoute roles={["Tenant"]}>
                <Apply_page />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          {/* <Route path="*" element={<Login />} /> */}
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>
);
