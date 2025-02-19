import { useEffect, useState } from "react";
import Button from "@/components/Button";
import { Card, CardContent } from "@/components/Card";
import { motion } from "framer-motion";
import { fetchWeddingInfo } from "@/api";

export default function HomePage() {
  const [weddingInfo, setWeddingInfo] = useState<{ event: string; date: string; location: string } | null>(null);

  useEffect(() => {
    fetchWeddingInfo().then(setWeddingInfo);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <motion.h1
        className="text-4xl font-bold mb-4"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        Welcome to Our Wedding Website
      </motion.h1>
      <Card className="w-96 shadow-lg">
        <CardContent className="p-4 text-center">
          {weddingInfo ? (
            <p className="text-lg mb-2">
              {weddingInfo.event} on {weddingInfo.date} at {weddingInfo.location}
            </p>
          ) : (
            <p className="text-lg mb-2">Loading wedding details...</p>
          )}
          <Button>RSVP Now</Button>
        </CardContent>
      </Card>
    </div>
  );
}
