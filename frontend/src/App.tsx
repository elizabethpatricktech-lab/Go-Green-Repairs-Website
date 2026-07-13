import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import MoreAboutUs from "./pages/MoreAboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Financing from "./pages/Financing";
import MoreReviews from "./pages/MoreReviews";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import RequestService from "./pages/RequestService";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/more-about-us" element={<MoreAboutUs />} />
      <Route path="/financing" element={<Financing />} />
      <Route path="/more-reviews" element={<MoreReviews />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        }
      />

      <Route
        path="/register"
        element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        }
      />
      <Route
        path="/request-service"
        element={
          <ProtectedRoute>
            <RequestService />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}
