import React, { useEffect, useState } from "react";
import { getCustomerBookings, updateCustomer, type Customer } from "../api/customer";
import { useCustomer } from "../context/CustomerContext";
import { deleteBooking, type Booking } from "../api/bookings";
import { useNavigate } from "react-router";
import logo from "../assets/logo.svg";

const emptyCustomer: Customer = {
    phone_number: "",
    full_name: "",
    street: "",
    city: "",
    zip_code: "",
    country: "",
    ssn_sin: "",
    id_type: "",
    date_of_registration: "",
};

const CustomerProfile: React.FC = () => {
    const { customer, customerId } = useCustomer();
    const [formData, setFormData] = useState<Customer>(emptyCustomer);
    const [bookings, setBookings] = useState<Booking[]>([]);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [saveStatus, setSaveStatus] = useState<"idle" | "saving" | "success" | "error">("idle");
    const [bookingError, setBookingError] = useState<string | null>(null);
    const [deletingId, setDeletingId] = useState<number | null>(null);
    const navi = useNavigate();

    useEffect(() => {
        if (customer) {
            setFormData(customer);
        }
    }, [customer]);

    useEffect(() => {
        const fetchBookings = async () => {
            if (!customerId) return;
            try {
                setLoadingBookings(true);
                setBookingError(null);
                const data = await getCustomerBookings(customerId);
                setBookings(Array.isArray(data.bookings) ? data.bookings : []);
            } catch (err) {
                console.error("failed to fetch bookings", err);
                setBookingError("Unable to load bookings right now.");
            } finally {
                setLoadingBookings(false);
            }
        };

        fetchBookings();
    }, [customerId]);

    const handleChange = (field: keyof Customer) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setFormData((prev) => ({ ...prev, [field]: event.target.value }));
    };

    const handleSave = async (event: React.FormEvent) => {
        event.preventDefault();
        if (!customerId) return;

        try {
            setSaveStatus("saving");
            await updateCustomer(customerId, formData);
            setSaveStatus("success");
        } catch (err) {
            console.error("failed to update customer", err);
            setSaveStatus("error");
        }
    };

    const handleDeleteBooking = async (bookingId: number | undefined) => {
        if (bookingId == undefined|| bookingId <= 1) {
            return;
        }
        try {
            setDeletingId(bookingId);
            await deleteBooking(bookingId);
            setBookings((prev) => prev.filter((booking) => booking.booking_id !== bookingId));
        } catch (err) {
            console.error("failed to delete booking", err);
            setBookingError("Unable to delete booking right now.");
        } finally {
            setDeletingId(null);
        }
    };


    const handleBookSomething = () =>{
        navi('/customer/chains');
    }

    return (
        <div style={{ minHeight: "100vh", backgroundColor: "#f8fafc", fontFamily: "var(--sans)" }}>
            <header style={{
                position: "sticky",
                top: 0,
                zIndex: 100,
                backgroundColor: "#ffffff",
                borderBottom: "1px solid #e5e7eb",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "0 2rem",
                height: "64px",
                boxShadow: "0 1px 4px rgba(0,0,0,0.06)",
            }}>
                <button
                    onClick={() => navi("/")}
                    style={{ display: "flex", alignItems: "center", gap: "0.625rem", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                >
                    <img src={logo} alt="Serene" style={{ width: "36px", height: "36px" }} />
                    <span style={{ fontSize: "1.1rem", fontWeight: 700, color: "var(--boba-teal)", letterSpacing: "0.04em" }}>
                        Serene
                    </span>
                </button>

                <div style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}>
                    <button
                        onClick={() => navi("/customer/profile")}
                        style={{
                            padding: "0.5rem 1.1rem",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: 600,
                            fontSize: "0.9rem",
                            backgroundColor: "rgba(46,107,90,0.1)",
                            color: "var(--boba-teal)",
                            transition: "background 0.15s, color 0.15s",
                        }}
                    >
                        Profile
                    </button>
                    <button
                        onClick={() => navi("/customer/chains")}
                        style={{
                            padding: "0.5rem 1.1rem",
                            border: "none",
                            borderRadius: "6px",
                            cursor: "pointer",
                            fontWeight: 400,
                            fontSize: "0.9rem",
                            backgroundColor: "transparent",
                            color: "#6b7280",
                            transition: "background 0.15s, color 0.15s",
                        }}
                    >
                        Book a Hotel
                    </button>
                </div>
            </header>

            <main className="flex flex-col items-center p-6">
                <h1 className="mb-2 text-3xl font-bold text-boba-silver">Customer Dashboard</h1>
                <p className="mb-6 text-lg text-boba-mid-teal">Manage your profile and bookings</p>

                <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-boba-bg p-6 rounded-lg">
                        <h2 className="text-xl font-semibold text-boba-silver mb-4">Your Details</h2>
                        <form className="space-y-4" onSubmit={handleSave}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-sm text-boba-silver mb-1">Full Name</label>
                                    <input
                                        type="text"
                                        value={formData.full_name}
                                        onChange={handleChange("full_name")}
                                        className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-boba-silver mb-1">Phone Number</label>
                                    <input
                                        type="text"
                                        value={formData.phone_number}
                                        onChange={handleChange("phone_number")}
                                        className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-boba-silver mb-1">Street</label>
                                    <input
                                        type="text"
                                        value={formData.street}
                                        onChange={handleChange("street")}
                                        className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-boba-silver mb-1">City</label>
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={handleChange("city")}
                                        className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-boba-silver mb-1">Zip Code</label>
                                    <input
                                        type="text"
                                        value={formData.zip_code}
                                        onChange={handleChange("zip_code")}
                                        className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-boba-silver mb-1">Country</label>
                                    <input
                                        type="text"
                                        value={formData.country}
                                        onChange={handleChange("country")}
                                        className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-boba-silver mb-1">ID Type</label>
                                    <input
                                        type="text"
                                        value={formData.id_type}
                                        onChange={handleChange("id_type")}
                                        className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm text-boba-silver mb-1">SSN/SIN</label>
                                    <input
                                        type="text"
                                        value={formData.ssn_sin}
                                        disabled
                                        className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded opacity-70"
                                    />
                                </div>
                                <div className="md:col-span-2">
                                    <label className="block text-sm text-boba-silver mb-1">Date of Registration</label>
                                    <input
                                        type="text"
                                        value={formData.date_of_registration}
                                        disabled
                                        className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded opacity-70"
                                    />
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-boba-blue-green text-white rounded hover:bg-boba-blue-green-hover transition-colors focus:outline-none focus:ring-2 focus:ring-boba-teal"
                                    disabled={saveStatus === "saving"}
                                >
                                    {saveStatus === "saving" ? "Saving..." : "Save Changes"}
                                </button>
                                {saveStatus === "success" && (
                                    <span className="text-sm text-boba-mid-teal">Profile updated.</span>
                                )}
                                {saveStatus === "error" && (
                                    <span className="text-sm text-red-400">Update failed.</span>
                                )}
                            </div>
                        </form>
                </div>

                <div className="bg-boba-deep-teal border border-boba-slate rounded-lg p-4 shadow-lg flex flex-col">
                        <h2 className="text-xl font-semibold text-boba-silver mb-4">Active Bookings</h2>
                        {loadingBookings ? (
                            <p className="text-boba-silver">Loading bookings...</p>
                        ) : bookingError ? (
                            <p className="text-red-400">{bookingError}</p>
                        ) : bookings.length === 0 ? (
                            <p className="text-boba-silver">No active bookings yet.</p>
                        ) : (
                            <div className="space-y-3 text-sm text-boba-silver">
                                {bookings.map((booking, index) => (
                                    <div
                                        key={`${booking.hotel_id ?? "hotel"}-${booking.room_number ?? "room"}-${index}`}
                                        className="bg-boba-charcoal border border-boba-slate rounded p-3"
                                    >
                                        <p>
                                            <strong>Guest:</strong> {booking.customer_name ?? "N/A"}
                                        </p>
                                        <p>
                                            <strong>Hotel Chain:</strong> {booking.hotel_chain ?? "N/A"}
                                        </p>
                                        <p>
                                            <strong>Hotel:</strong> {booking.hotel ?? booking.hotel_id ?? "N/A"}
                                        </p>
                                        <p>
                                            <strong>Room:</strong> {booking.room_number ?? "N/A"}
                                        </p>
                                        <p>
                                            <strong>Price:</strong> {booking.price ?? "N/A"}
                                        </p>
                                        <p>
                                            <strong>Status:</strong> {booking.status ?? "Active"}
                                        </p>
                                        {booking.booking_id !== undefined && booking.booking_id > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => handleDeleteBooking(booking.booking_id)}
                                                className="mt-3 w-full px-3 py-2 bg-boba-silver text-white rounded hover:bg-boba-silver-hover transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
                                                disabled={deletingId === booking.booking_id}
                                            >
                                                {deletingId === booking.booking_id ? "Deleting..." : "Delete Booking"}
                                            </button>
                                        )}
                                    </div>
                                ))}
                            </div>
                        )}

                        <button
                            type="button"
                            className="mt-6 w-full px-4 py-2 bg-boba-blue-green text-white rounded hover:bg-boba-blue-green-hover transition-colors focus:outline-none focus:ring-2 focus:ring-boba-teal"
                            onClick={handleBookSomething}
                        >
                            Book a Hotel
                        </button>
                </div>
            </div>
            </main>
        </div>
    );
};

export default CustomerProfile;