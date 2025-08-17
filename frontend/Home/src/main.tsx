import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "./App.tsx";
import Appartment from "./pages/appartment.tsx";
import Apply from "./pages/apply.tsx";
import "bootstrap/dist/css/bootstrap.min.css";
import User from "./pages/User.tsx";
import Admin_page from "./pages/Admin.tsx";
import LandLord_page from "./pages/Landlord.tsx";
import UnAuthorizedPage from "./pages/UnAuthorizedPage.tsx";
import Apply_page from "./pages/apply.tsx";
import ContextProvider from "./context/ContextProvider.tsx";
import ProtectedRoute from "./context/ProtectedRoute.tsx";

createRoot(document.getElementById("root")!).render(
  <ContextProvider>
    <StrictMode>
      <BrowserRouter>
        <Routes>
          {/* <Route path="/" element={<App />} /> */}
          <Route
            path="/apartments"
            element={
              <ProtectedRoute roles={["admin", "user", "landlord"]}>
                <Appartment />
              </ProtectedRoute>
            }
          />
          <Route
            path="/Admin"
            element={
              <ProtectedRoute roles={["admin"]}>
                <Admin_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/landlord"
            element={
              <ProtectedRoute roles={["admin", "landlord"]}>
                <LandLord_page />
              </ProtectedRoute>
            }
          />
          <Route
            path="/user"
            element={
              <ProtectedRoute roles={["apartments", "user"]}>
                <User />
              </ProtectedRoute>
            }
          />
          <Route
            path="/apartments/apply"
            element={
              <ProtectedRoute roles={["admin", "user"]}>
                <Apply_page />
              </ProtectedRoute>
            }
          />
          <Route path="/UnAuthorized_Access" element={<UnAuthorizedPage />} />
          <Route path="/appartment" element={<Appartment />} />
          <Route path="/apply" element={<Apply />} />
          <Route path="*" element={<App />} />
        </Routes>
      </BrowserRouter>
    </StrictMode>
  </ContextProvider>
);
