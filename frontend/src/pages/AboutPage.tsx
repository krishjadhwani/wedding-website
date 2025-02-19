import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/Card";

export default function AboutPage() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <motion.h1
                className="text-4xl font-bold mb-4"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
            >
                About Us
            </motion.h1>
            <Card className="w-96 shadow-lg">
                <CardContent className="p-4 text-center">
                    <p className="text-lg mb-2">Learn more about our journey and wedding plans.</p>
                </CardContent>
            </Card>
        </div>
    );
}