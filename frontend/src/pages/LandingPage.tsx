import { useState } from "react";

export default function LandingPage({ onAccessGranted }: { onAccessGranted: () => void }) {
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");

        const response = await fetch("http://localhost:8000/api/validate-password", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ password }),
        });

        if (response.ok) {
            onAccessGranted(); // Show main content
        } else {
            setError("Incorrect password. Please try again.");
        }
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
                />
                {error && <p className="text-red-500 text-sm">{error}</p>}
                <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 w-full">
                    Submit
                </button>
            </form>
        </div>
    );
}
