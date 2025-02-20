import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { FiMenu, FiX } from "react-icons/fi";

export default function NavBar() {
    const [isOpen, setIsOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
    const location = useLocation();

    // Update `isMobile` state on window resize
    useEffect(() => {
        const handleResize = () => setIsMobile(window.innerWidth < 768);
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    const toggleMenu = () => setIsOpen(!isOpen);

    const navItems = [
        { name: "Home", path: "/" },
        { name: "About", path: "/about" },
        { name: "Schedule", path: "/schedule" },
        { name: "Wedding Party", path: "/wedding-party" },
        { name: "Travel", path: "/travel" },
        { name: "Things To Do", path: "/things-to-do" },
        { name: "Registry", path: "/registry" },
        { name: "FAQs", path: "/faq" },
        { name: "RSVP", path: "/rsvp" },
    ];

    return (
        <nav className="bg-white shadow-md py-4 px-6 w-full fixed top-0 left-0 z-50">
            <div className="flex justify-between items-center max-w-7xl mx-auto">
                {/* Wedding Title */}
                <h1 className="text-xl font-bold text-gray-800 italic">K & A</h1>

                {/* Desktop Navigation */}
                {!isMobile && (
                    <ul className="hidden md:flex space-x-8">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    className={`hover:text-blue-500 transition ${location.pathname === item.path ? "text-blue-600 font-semibold" : "text-gray-700"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                )}

                {/* Mobile Menu Button */}
                {isMobile && (
                    <button className="md:hidden text-gray-800" onClick={toggleMenu}>
                        {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
                    </button>
                )}
            </div>

            {/* Mobile Dropdown Menu */}
            {isMobile && isOpen && (
                <div className="md:hidden bg-white border-t mt-2 py-2 px-4 shadow-lg">
                    <ul className="flex flex-col space-y-2">
                        {navItems.map((item) => (
                            <li key={item.path}>
                                <Link
                                    to={item.path}
                                    onClick={() => setIsOpen(false)}
                                    className={`block py-2 px-4 rounded ${location.pathname === item.path ? "bg-blue-100 text-blue-600 font-semibold" : "text-gray-700"
                                        }`}
                                >
                                    {item.name}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </nav>
    );
}
