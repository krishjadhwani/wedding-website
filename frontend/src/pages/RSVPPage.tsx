import { useState } from "react";
import axios from "axios";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/Card";
import Button from "@/components/Button";

interface Guest {
    id: number;
    first_name: string;
    last_name: string;
    email?: string;
    status: string;
}

interface RSVPResponse {
    rsvp_code: string;
    group_name: string;
    guests: Guest[];
}

interface LookupForm {
    first_name: string;
    last_name: string;
}

export default function RSVPPage() {
    const { register, handleSubmit } = useForm();
    const [guestData, setGuestData] = useState<RSVPResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState<number | null>(null);
    const [error, setError] = useState("");

    const fetchInvitation = async (data: LookupForm) => {
        setLoading(true);
        setError("");
        try {
            const response = await axios.get<RSVPResponse>(
                `http://localhost:8000/api/invite`,
                { params: { first_name: data.first_name, last_name: data.last_name } }
            );
            setGuestData(response.data);
        } catch (err) {
            console.error("Error fetching invitation:", err);

            // Log error to backend
            axios.post("http://localhost:8000/api/log-error", { error: err })
                .catch(console.error); // Log any issues sending error to backend

            setError("Invitation not found. Please check your name.");
            setGuestData(null);
        }
        setLoading(false);
    };

    const submitRSVP = async (guestId: number, status: string) => {
        if (!guestData) return;

        setSubmitting(guestId);
        try {
            await axios.post("http://localhost:8000/api/rsvp", {
                rsvp_code: guestData.rsvp_code,
                guest_id: guestId,
                status,
            });

            // Update status in UI
            setGuestData((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    guests: prev.guests.map((g) =>
                        g.id === guestId ? { ...g, status } : g
                    ),
                };
            });
        } catch (err) {
            console.error("Error submitting RSVP:", err);

            // Log error to backend
            axios.post("http://localhost:8000/api/log-error", { error: err })
                .catch(console.error); // Log any issues sending error to backend

            setError("Error submitting RSVP. Please try again.");
        }
        setSubmitting(null);
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">RSVP Lookup</h1>

            {/* Lookup Form */}
            <form onSubmit={handleSubmit(fetchInvitation)} className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-md">
                <div className="flex flex-col w-full gap-3">
                    {/* First Name & Last Name Fields */}
                    <div className="flex flex-col sm:flex-row gap-3">
                        <input
                            {...register("first_name")}
                            placeholder="First Name"
                            className="border p-2 rounded flex-1"
                            required
                            disabled={loading}
                        />
                        <input
                            {...register("last_name")}
                            placeholder="Last Name"
                            className="border p-2 rounded flex-1"
                            required
                            disabled={loading}
                        />
                    </div>

                    {/* Button */}
                    <div className="flex justify-center">
                        <Button type="submit" className="sm:w-auto w-full" disabled={loading}>
                            {loading ? "Searching..." : "Find My Invitation"}
                        </Button>
                    </div>
                </div>
            </form>

            {/* Display Invitation Details */}
            {loading && <p className="text-gray-500">Loading invitation details...</p>}

            {guestData && (
                <Card className="w-full max-w-md bg-white shadow-lg">
                    <CardContent>
                        <h2 className="text-xl font-bold mb-2">Group: {guestData.group_name}</h2>
                        <p className="text-sm text-gray-500 mb-4">RSVP Code: {guestData.rsvp_code}</p>

                        {/* List of Guests */}
                        {guestData.guests.map((guest, index) => (
                            <div
                                key={guest.id}
                                className={`flex flex-col sm:flex-row justify-between items-start sm:items-center p-4 ${index !== guestData.guests.length - 1 ? "border-b" : ""}`}
                            >
                                <div className="flex-auto text-left">
                                    <span className="block font-medium">{guest.first_name} {guest.last_name}</span>
                                    {guest.email && <span className="block text-sm text-gray-500">{guest.email}</span>}
                                </div>
                                <div className="sm:flex-col gap-2 mt-3 sm:mt-0 w-full sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                                    <Button onClick={() => submitRSVP(guest.id, "confirmed")} className="px-4 py-2 mb-2 w-full sm:w-auto" disabled={submitting === guest.id}>
                                        {submitting === guest.id ? "Submitting..." : "✅ Confirm"}
                                    </Button>
                                    <Button onClick={() => submitRSVP(guest.id, "declined")} className="px-4 py-2 w-full sm:w-auto bg-red-500 hover:bg-red-600" disabled={submitting === guest.id}>
                                        {submitting === guest.id ? "Submitting..." : "❌ Decline"}
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </CardContent>
                </Card>
            )}

            {error && <p className="text-red-500 mt-4">{error}</p>}
        </div>
    );
}
