import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import backgroundImage from "@/assets/IMG_8260.jpg";
import { fetchWeddingInfo, WeddingInfo } from "@/api/apiService";

export default function HomePage() {
  const navigate = useNavigate();
  const [weddingInfo, setWeddingInfo] = useState<WeddingInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getWeddingInfo = async () => {
      setLoading(true);
      const response = await fetchWeddingInfo();

      if (response.data) {
        setWeddingInfo(response.data);
      } else {
        setError(response.error || "Failed to load wedding information");
        console.error("Error fetching wedding info:", response.error);
      }

      setLoading(false);
    };

    getWeddingInfo();
  }, []);

  return (
    <div
      className="relative w-full h-screen flex flex-col justify-between items-center text-white"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "44% 50%",
      }}
    >
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-50"></div>

      {/* Title at the Top */}
      <div className="relative z-10 text-center pt-10">
        <h1 className="md:px-40 px-2 text-6xl md:text-7xl font-light italic">Krish & Anisha</h1>
      </div>

      {/* Date, Location, and RSVP at the Bottom */}
      <div className="relative z-10 text-center bg-white bg-opacity-70 px-6 py-4 rounded-lg shadow-md">
        {loading ? (
          <p className="text-gray-700">Loading wedding details...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <>
            <p className="text-xl font-semibold text-gray-900 font-light italic">
              {weddingInfo?.date || "November 30 - December 1, 2025"}
            </p>
            <p className="text-lg text-gray-700 font-light italic">{weddingInfo?.location || "Mumbai, ITC Maratha"}</p>
          </>
        )}
        <Button onClick={() => navigate("/rsvp")} className="mt-4 text-lg text-black px-6 py-3 block mx-auto">
          RSVP Now
        </Button>
      </div>
    </div>
  );
}