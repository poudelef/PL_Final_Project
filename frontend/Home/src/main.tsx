import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.tsx";
import Appartment from "./appartment.tsx";
import Apply from "./components/apply.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import Login from "./pages/Login.tsx";
import Admin_page from "./pages/Admin.tsx";
import LandLord_page from "./pages/Landlord.tsx";
import UnAuthorizedPage from "./pages/UnAuthorizedPage.tsx";
import UserPage from "./pages/UserPage.tsx";
import ContextProvider from "./context/ContextProvider.tsx";
import ProtectedRoute from "./context/ProtectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route path="/login" element={<Login />} />
          <Route
            path="Admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Admin_page />
              </ProtectedRoute>
            }
          />
          <Route path="/User" element={<UserPage />} />
          <Route path="/LandLord" element={<LandLord_page />} />
          <Route path="/UnAuthorized_Access" element={<UnAuthorizedPage />} />
          <Route path="/appartment" element={<Appartment />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </ContextProvider>
);
