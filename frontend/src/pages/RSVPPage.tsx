import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent } from "@/components/Card";
import Button from "@/components/Button";
import {
    fetchInvitation,
    submitRSVP,
    RSVPResponse,
    Guest
} from "@/api/apiService";

interface LookupForm {
    first_name: string;
    last_name: string;
}

export default function RSVPPage() {
    const { register, handleSubmit } = useForm<LookupForm>();
    const [guestData, setGuestData] = useState<RSVPResponse | null>(null);
    const [loading, setLoading] = useState(false);
    const [submitting, setSubmitting] = useState<number | null>(null);
    const [error, setError] = useState("");

    const lookupInvitation = async (data: LookupForm) => {
        setLoading(true);
        setError("");

        const response = await fetchInvitation(data.first_name, data.last_name);

        if (response.data) {
            setGuestData(response.data);
        } else {
            setError(response.error || "Invitation not found. Please check your name.");
            setGuestData(null);
        }

        setLoading(false);
    };

    const handleRSVP = async (guestId: number, status: string) => {
        if (!guestData) return;

        setSubmitting(guestId);
        setError("");

        const response = await submitRSVP(guestData.rsvp_code, guestId, status);

        if (response.data) {
            // Update status in UI
            setGuestData((prev) => {
                if (!prev) return null;
                return {
                    ...prev,
                    guests: prev.guests.map((g: Guest) =>
                        g.id === guestId ? { ...g, status } : g
                    ),
                };
            });
        } else {
            setError(response.error || "Error submitting RSVP. Please try again.");
        }

        setSubmitting(null);
    };

    return (
        <div className="flex flex-col items-center min-h-screen p-4 bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">RSVP Lookup</h1>

            {/* Lookup Form */}
            <form onSubmit={handleSubmit(lookupInvitation)} className="bg-white p-6 rounded-lg shadow-lg mb-6 w-full max-w-md">
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
                                {/* Guest Name & Email */}
                                <div className="flex-auto text-left">
                                    <span className="block font-medium">{guest.first_name} {guest.last_name}</span>
                                    {guest.email && <span className="block text-sm text-gray-500">{guest.email}</span>}
                                </div>

                                {/* RSVP Buttons with Ring Indicating Selection */}
                                <div className="flex flex-col gap-2 mt-3 sm:mt-0 w-full sm:w-auto sm:flex-row sm:items-center sm:justify-end">
                                    <Button
                                        onClick={() => handleRSVP(guest.id, "confirmed")}
                                        className={`px-4 py-2 w-full sm:w-auto ${guest.status === "confirmed" ? "ring-2 ring-green-500" : ""}`}
                                        disabled={submitting === guest.id}
                                    >
                                        {submitting === guest.id ? "Submitting..." : "✅ Confirm"}
                                    </Button>
                                    <Button
                                        onClick={() => handleRSVP(guest.id, "declined")}
                                        className={`px-4 py-2 w-full sm:w-auto bg-red-500 hover:bg-red-600 ${guest.status === "declined" ? "ring-2 ring-red-500" : ""}`}
                                        disabled={submitting === guest.id}
                                    >
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