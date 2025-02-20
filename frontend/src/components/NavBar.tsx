import { Link } from "react-router-dom";

export default function NavBar() {
    return (
        <nav className="bg-white shadow-md py-4 px-6 flex justify-center border-b border-gray-200">
            <div className="flex items-center space-x-8">
                <h1 className="text-3xl font-serif font-bold">Krish & Anisha</h1>
                <ul className="flex space-x-8 list-none p-0 m-0">
                    <li className="inline"><Link to="/" className="hover:text-gray-500 transition">Home</Link></li>
                    <li className="inline"><Link to="/about" className="hover:text-gray-500 transition">About</Link></li>
                    <li className="inline"><Link to="/schedule" className="hover:text-gray-500 transition">Schedule</Link></li>
                    <li className="inline"><Link to="/wedding-party" className="hover:text-gray-500 transition">Wedding Party</Link></li>
                    <li className="inline"><Link to="/travel" className="hover:text-gray-500 transition">Travel</Link></li>
                    <li className="inline"><Link to="/things-to-do" className="hover:text-gray-500 transition">Things To Do</Link></li>
                    <li className="inline"><Link to="/registry" className="hover:text-gray-500 transition">Registry</Link></li>
                    <li className="inline"><Link to="/faq" className="hover:text-gray-500 transition">FAQs</Link></li>
                    <li className="inline"><Link to="/rsvp" className="hover:text-gray-500 transition">RSVP</Link></li>
                </ul>
            </div>
        </nav>
    );
}
