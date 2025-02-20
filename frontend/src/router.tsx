import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Cookies from "js-cookie";
import HomePage from "@/pages/HomePage";
import AboutPage from "@/pages/AboutPage";
import LandingPage from "@/pages/LandingPage";
import NavBar from "./components/NavBar";

export default function AppRouter() {
    const [accessGranted, setAccessGranted] = useState(false);

    useEffect(() => {
        const accessCookie = Cookies.get("access_granted");
        if (accessCookie) {
            setAccessGranted(true);
        }
    }, []);

    const handleAccessGranted = () => {
        Cookies.set("access_granted", "true", { expires: 3 }); // Cookie expires in 3 days
        setAccessGranted(true);
    };

    return (
        <Router>
            {accessGranted && <NavBar />}
            <Routes>
                {!accessGranted ? (
                    <Route path="*" element={<LandingPage onAccessGranted={handleAccessGranted} />} />
                ) : (
                    <>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/about" element={<AboutPage />} />
                    </>
                )}
            </Routes>
        </Router>
    );
}
