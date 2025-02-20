import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { motion } from "framer-motion";
import { fetchWeddingInfo } from "@/api";
import backgroundImage from "@/assets/wedding-background.webp";

export default function HomePage() {
  const [weddingInfo, setWeddingInfo] = useState<{ event: string; date: string; location: string } | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchWeddingInfo().then(setWeddingInfo);
  }, []);

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 text-white"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <motion.h1
        style={{ color: "white" }}
        className="text-5xl font-extrabold mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Krish & Anisha
      </motion.h1>
      {weddingInfo && (
        <div className="text-lg mb-4 bg-white bg-opacity-75 text-gray-900 p-3 rounded-lg shadow-md">
          {weddingInfo.event} <br />
          {weddingInfo.date} <br />
          {weddingInfo.location}
        </div>
      )}
      <Card className="w-96 shadow-lg bg-opacity-90 bg-white text-black">
        <CardContent className="p-4 text-center">
          <p className="text-lg mb-4">
            Join us for a magical wedding experience filled with love, laughter, and tradition!
          </p>
          <Button onClick={() => navigate("/rsvp")}>
            RSVP Now
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
