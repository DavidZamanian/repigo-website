import React, { useEffect } from "react";
import {
  Routes,
  Route,
  useLocation,
  Navigate,
  useNavigate,
} from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import { Header } from "@/components/Header/Header";
import Footer from "@/components/Footer/Footer";
import Home from "@/pages/Home";
import AppInfo from "@/pages/AppInfo";
import Contact from "@/pages/Contact";
import Privacy from "@/pages/Privacy";
import Terms from "@/pages/Terms";
import VerifyEmail from "@/pages/VerifyEmail";

const App: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Handle GitHub Pages SPA redirect
  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const redirectPath = searchParams.get("redirect");

    if (redirectPath && location.pathname === "/") {
      // Remove the redirect parameter and navigate to the intended route
      navigate(redirectPath, { replace: true });
    }
  }, [location, navigate]);
  return (
    <div className="app">
      <Header />
      <div className="pageContainer">
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>
            <Route path="/" element={<Home />} />
            {/* <Route path="/about" element={<AppInfo />} /> */}
            <Route path="/app" element={<AppInfo />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            <Route path="/verify" element={<VerifyEmail />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </AnimatePresence>
      </div>
      <Footer />
    </div>
  );
};

export default App;
