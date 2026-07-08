import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Brands from "./pages/Brands";
import MoreAboutUs from "./pages/MoreAboutUs";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Financing from "./pages/Financing";
import MoreReviews from "./pages/MoreReviews";
import Dashboard from "./pages/Dashboard";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/brands" element={<Brands />} />
      <Route path="/more-about-us" element={<MoreAboutUs />} />
      <Route path="/financing" element={<Financing />} />
      <Route path="/more-reviews" element={<MoreReviews />} />
      <Route path="/privacy-policy" element={<PrivacyPolicy />} />
      <Route path="/dashboard" element={<Dashboard />} />
    </Routes>
  );
}
