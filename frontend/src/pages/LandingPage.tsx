import { useState } from "react";
import { validatePassword } from "@/api/apiService";

export default function LandingPage({ onAccessGranted }: { onAccessGranted: () => void }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        const response = await validatePassword(password);

        if (response.data?.success) {
            onAccessGranted(); // Show main content
        } else {
            setError(response.error || "Incorrect password. Please try again.");
        }

        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Enter Password</h1>
            <form onSubmit={handleSubmit} className="bg-white p-6 shadow-lg rounded-lg">
                <p className="mb-3 text-sm text-gray-600">
                    Check your invitation for the password.
                </p>
                <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="border p-2 rounded w-full mb-2"
                    placeholder="Enter password"
                    disabled={loading}
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button
                    type="submit"
                    className="bg-blue-600 text-black px-4 py-2 rounded hover:bg-blue-700 w-full"
                    disabled={loading}
                >
                    {loading ? "Submitting..." : "Submit"}
                </button>
            </form>
        </div>
    );
}