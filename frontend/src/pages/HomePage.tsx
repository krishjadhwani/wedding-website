import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { motion } from "framer-motion";
import { fetchWeddingInfo } from "@/api";
import backgroundImage from "@/assets/wedding-background.webp";

export default function HomePage() {
  const [weddingInfo, setWeddingInfo] = useState<{ event: string; date: string; location: string } | null>(null);
  const [count, setCount] = useState(0);

  useEffect(() => {
    fetchWeddingInfo().then(setWeddingInfo);
  }, []);

  console.log(weddingInfo)

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-r from-red-600 via-orange-500 to-yellow-400 text-white"
      style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <motion.h1
        className="text-5xl font-extrabold mb-6 drop-shadow-lg"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Krish & Anisha's Wedding Celebration
      </motion.h1>
      {weddingInfo && (
        <p className="text-lg mb-4 bg-black bg-opacity-50 p-3 rounded-lg">
          {weddingInfo.event} on {weddingInfo.date} at {weddingInfo.location}
        </p>
      )}
      <Card className="w-96 shadow-lg bg-opacity-90 bg-white text-black">
        <CardContent className="p-4 text-center">
          <p className="text-lg mb-2">Join us for a magical wedding experience filled with love, laughter, and tradition!</p>
          <Button onClick={() => setCount(count + 1)}>
            RSVP Now ({count})
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
