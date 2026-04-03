import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { getHotels, type Hotel } from "../api/hotels";

const HotelSelection: React.FC = () => {
    const { chainsId } = useParams<{ chainsId: string }>();
    const location = useLocation();
    const chainName = (location.state as any)?.chainName || "Hotel";
    const [hotels, setHotels] = useState<Hotel[] | null>(null);
    const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedRating, setSelectedRating] = useState<number | "">("");
    const [selectedCountry, setSelectedCountry] = useState<string>("");
    const [selectedCity, setSelectedCity] = useState<string>("");
    const navigate = useNavigate();

    // Fetch hotels on mount
    useEffect(() => {
        const fetchHotels = async () => {
            if (chainsId) {
                const data = await getHotels(Number(chainsId));
                setHotels(data);
                setFilteredHotels(data);
                console.log(data);
            }
        };

        fetchHotels();
    }, []);

    // Filter hotels based on search, rating, country, and city
    useEffect(() => {
        if (!hotels) return;

        let filtered = hotels.filter((hotel) => {
            const matchesSearch =
                hotel.city?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel.country?.toLowerCase().includes(searchTerm.toLowerCase()) ||
                hotel.street?.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesRating = selectedRating === "" || hotel.rating === selectedRating;
            const matchesCountry = selectedCountry === "" || hotel.country === selectedCountry;
            const matchesCity = selectedCity === "" || hotel.city === selectedCity;

            return matchesSearch && matchesRating && matchesCountry && matchesCity;
        });

        setFilteredHotels(filtered);
    }, [hotels, searchTerm, selectedRating, selectedCountry, selectedCity]);

    const handleSelectHotel = (hotel: Hotel) => {
        // Navigate to room selection with hotel info
        navigate(`/customer/hotels/${hotel.hotel_id}`, { 
            state: { hotelName: `Hotel ${hotel.hotel_id}`, hotel: hotel } 
        });
    };

    const uniqueCountries = hotels ? [...new Set(hotels.map(h => h.country).filter(Boolean))] : [];
    const uniqueRatings = hotels ? [...new Set(hotels.map(h => h.rating).filter(r => r !== undefined))] : [];
    const uniqueCities = hotels ? [...new Set(hotels.map(h => h.city).filter(Boolean))] : [];

    return (
        <div className=" bg-white flex flex-col items-center p-6">
            <h1 className="mb-2 text-3xl font-bold text-boba-silver">
                {chainName}
            </h1>
            <p className="mb-6 text-lg text-boba-mid-teal">
                Hotel Selection
            </p>

            {/* Filters and Search */}
            <div className="w-full max-w-6xl mb-6">
                <div className="bg-boba-deep-teal p-4 rounded-lg shadow-lg">
                    <div className="flex flex-wrap gap-4 items-center">
                        {/* Search Bar */}
                        <div className="flex-1 min-w-64">
                            <input
                                type="text"
                                placeholder="Search by city, country, or street..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-4 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                            />
                        </div>

                        {/* Rating Filter */}
                        <div className="min-w-32">
                            <select
                                value={selectedRating}
                                onChange={(e) => setSelectedRating(e.target.value === "" ? "" : parseInt(e.target.value))}
                                className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                            >
                                <option value="">All Ratings</option>
                                {uniqueRatings.map((rating) => (
                                    <option key={rating} value={rating}>
                                        {rating} Stars
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Country Filter */}
                        <div className="min-w-32">
                            <select
                                value={selectedCountry}
                                onChange={(e) => setSelectedCountry(e.target.value)}
                                className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                            >
                                <option value="">All Countries</option>
                                {uniqueCountries.map((country) => (
                                    <option key={country} value={country}>
                                        {country}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* City Filter */}
                        <div className="min-w-32">
                            <select
                                value={selectedCity}
                                onChange={(e) => setSelectedCity(e.target.value)}
                                className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                            >
                                <option value="">All Cities</option>
                                {uniqueCities.map((city) => (
                                    <option key={city} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                </div>
            </div>

            {/* Hotels Grid */}
            <div className="w-full max-w-6xl bg-boba-bg p-6 rounded-lg">
                {filteredHotels.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredHotels.map((hotel) => (
                            <HotelBlock
                                key={hotel.hotel_id}
                                hotel={hotel}
                                onSelect={handleSelectHotel}
                            />
                        ))}
                    </div>
                ) : hotels ? (
                    <p className="text-center text-boba-silver text-lg">
                        No hotels match your filters.
                    </p>
                ) : (
                    <p className="text-center text-boba-silver text-lg">
                        Loading hotels...
                    </p>
                )}
            </div>
        </div>
    );
};

interface HotelBlockProps {
    hotel: Hotel;
    onSelect: (hotel: Hotel) => void;
}

const HotelBlock: React.FC<HotelBlockProps> = ({ hotel, onSelect }) => {
    return (
        <div className="bg-boba-deep-teal border border-boba-slate rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-3">
                <h2 className="text-xl font-semibold text-boba-silver mb-2">
                    Hotel ID: {hotel.hotel_id}
                </h2>
                {hotel.rating && (
                    <div className="flex items-center mb-2">
                        <span className="text-boba-mid-teal font-medium">
                            Rating: {hotel.rating} Stars
                        </span>
                    </div>
                )}
            </div>

            <div className="space-y-1 text-sm text-boba-silver">
                <p>
                    <strong>Street:</strong> {hotel.street || "N/A"}
                </p>
                <p>
                    <strong>City:</strong> {hotel.city || "N/A"}
                </p>
                <p>
                    <strong>Zip Code:</strong> {hotel.zip_code || "N/A"}
                </p>
                <p>
                    <strong>Country:</strong> {hotel.country || "N/A"}
                </p>
                <p>
                    <strong>Email:</strong> {hotel.email_address}
                </p>
            </div>

            <button
                onClick={() => onSelect(hotel)}
                className="mt-4 w-full px-4 py-2 bg-boba-blue-green text-white rounded hover:bg-boba-blue-green-hover transition-colors focus:outline-none focus:ring-2 focus:ring-boba-teal"
                aria-label={`Select Hotel ${hotel.hotel_id}`}
            >
                Select This Hotel
            </button>
        </div>
    );
};

export default HotelSelection;