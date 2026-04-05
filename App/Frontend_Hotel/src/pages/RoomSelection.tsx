import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router";
import { getHotelRooms, type Hotel } from "../api/hotels";
import { type Room } from "../api/room";

const RoomSelection: React.FC = () => {
    const { hotelId } = useParams<{ hotelId: string }>();
    const location = useLocation();
    const hotelName = (location.state as any)?.hotelName || "Hotel";
    const hotelData = (location.state as any)?.hotel as Hotel | undefined;
    const chainName = (location.state as any)?.chainName || "Hotel";

    const [rooms, setRooms] = useState<Room[] | null>(null);
    const [filteredRooms, setFilteredRooms] = useState<Room[]>([]);

    // Booking/Renting Details states
    const [checkInDate, setCheckInDate] = useState("");
    const [checkOutDate, setCheckOutDate] = useState("");
    
    // Filter states
    const [selectedCapacities, setSelectedCapacities] = useState<number[]>([]);
    const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
    const [selectedViews, setSelectedViews] = useState<string[]>([]);
    const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
    const [includeBedExtension, setIncludeBedExtension] = useState(false);

    const navigate = useNavigate();

    // Fetch rooms on mount
    useEffect(() => {
        const fetchRooms = async () => {
            if (hotelId) {
                const data = await getHotelRooms(Number(hotelId));
                setRooms(data);
                setFilteredRooms(data);
                console.log(data);
            }
        };

        fetchRooms();
    }, [hotelId]);

    // Filter rooms based on capacity, price, view, amenities, and bed extension
    useEffect(() => {
        if (!rooms) return;

        let filtered = rooms.filter((room) => {
            // Check capacity filter
            const matchesCapacity =
                selectedCapacities.length === 0 ||
                (room.capacity && selectedCapacities.includes(room.capacity));

            // Check price range
            const matchesPrice = !room.price || (room.price >= priceRange[0] && room.price <= priceRange[1]);

            // Check view filter
            const matchesView =
                selectedViews.length === 0 || !room.room_view ||
                selectedViews.includes(room.room_view);

            // Check amenities filter
            const matchesAmenities =
                selectedAmenities.length === 0 || !room.amenities ||
                selectedAmenities.some((amenity) =>
                    room.amenities?.toLowerCase().includes(amenity.toLowerCase())
                );

            // Check bed extension filter
            const matchesBedExtension = !includeBedExtension || room.bed_extension === true;

            return matchesCapacity && matchesPrice && matchesView && matchesAmenities && matchesBedExtension;
        });

        setFilteredRooms(filtered);
    }, [rooms, selectedCapacities, priceRange, selectedViews, selectedAmenities, includeBedExtension]);

    const handleCapacityToggle = (capacity: number) => {
        setSelectedCapacities((prev) =>
            prev.includes(capacity)
                ? prev.filter((c) => c !== capacity)
                : [...prev, capacity]
        );
    };

    const handleViewToggle = (view: string) => {
        setSelectedViews((prev) =>
            prev.includes(view)
                ? prev.filter((v) => v !== view)
                : [...prev, view]
        );
    };

    const handleAmenityToggle = (amenity: string) => {
        setSelectedAmenities((prev) =>
            prev.includes(amenity)
                ? prev.filter((a) => a !== amenity)
                : [...prev, amenity]
        );
    };

    const uniqueCapacities = rooms
        ? [...new Set(rooms.map((r) => r.capacity).filter(Boolean))].sort((a, b) => (a || 0) - (b || 0))
        : [];

    const uniqueViews = rooms
        ? [...new Set(rooms.map((r) => r.room_view).filter(Boolean))].sort()
        : [];

    const uniqueAmenities = rooms
  ? [...new Set(
        rooms
          .flatMap((r) =>
            r.amenities
              ? r.amenities.split(",").map((a) => a.trim())
              : []
          )
          .filter((a): a is string => Boolean(a))
    )].sort()
  : [];

    const minPrice = Math.min(...(rooms?.map((r) => r.price || 0) || [0]));
    const maxPrice = Math.max(...(rooms?.map((r) => r.price || 1000) || [1000]));

    return (
        <div className="bg-white flex flex-col items-center p-6">
            <h1 className="mb-2 text-3xl font-bold text-boba-silver">
               {chainName}: {hotelName}
            </h1>
            <p className="mb-6 text-lg text-boba-mid-teal">
                Room Selection
            </p>

                {/* Filters Section */}
            <div className="w-full max-w-6xl mb-6">
                <div className="bg-boba-deep-teal p-6 rounded-lg shadow-lg">
                    <h3 className="text-white font-bold mb-4">Filter Rooms</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* Capacity Checkboxes */}
                        <div>
                            <h4 className="text-boba-silver font-semibold mb-3">Capacity (Guests)</h4>
                            <div className="space-y-2">
                                {uniqueCapacities.map((capacity) => (
                                    <label
                                        key={capacity}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedCapacities.includes(capacity || 0)}
                                            onChange={() => handleCapacityToggle(capacity || 0)}
                                            className="w-4 h-4 accent-boba-blue-green rounded"
                                        />
                                        <span className="ml-2 text-sm text-boba-silver">
                                            {capacity} {capacity === 1 ? "Guest" : "Guests"}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Price Range Slider */}
                        <div>
                            <h4 className="text-boba-silver font-semibold mb-3">
                                Price Range: ${priceRange[0]} - ${priceRange[1]}
                            </h4>
                            <input
                                type="range"
                                min={minPrice}
                                max={maxPrice}
                                value={priceRange[1]}
                                onChange={(e) =>
                                    setPriceRange([priceRange[0], parseInt(e.target.value)])
                                }
                                className="w-full accent-boba-blue-green"
                            />
                        </div>

                        {/* Room View Dropdown */}
                        <div>
                            <label className="block text-boba-silver font-semibold mb-3">
                                Room View
                            </label>
                            <select
                                value={selectedViews[0] || ""}
                                onChange={(e) => setSelectedViews(e.target.value ? [e.target.value] : [])}
                                className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                            >
                                <option value="">All Views</option>
                                {uniqueViews.map((view) => (
                                    <option key={view} value={view}>
                                        {view}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Amenities Checkboxes */}
                        <div>
                            <h4 className="text-boba-silver font-semibold mb-3">Amenities</h4>
                            <div className="space-y-2 max-h-40 overflow-y-auto">
                                {uniqueAmenities.map((amenity) => (
                                    <label
                                        key={amenity}
                                        className="flex items-center cursor-pointer"
                                    >
                                        <input
                                            type="checkbox"
                                            checked={selectedAmenities.includes(amenity)}
                                            onChange={() => handleAmenityToggle(amenity)}
                                            className="w-4 h-4 accent-boba-blue-green rounded"
                                        />
                                        <span className="ml-2 text-sm text-boba-silver">
                                            {amenity}
                                        </span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* Bed Extension Checkbox */}
                        <div>
                            <h4 className="text-boba-silver font-semibold mb-3">Room Features</h4>
                            <label className="flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={includeBedExtension}
                                    onChange={(e) => setIncludeBedExtension(e.target.checked)}
                                    className="w-4 h-4 accent-boba-blue-green rounded"
                                />
                                <span className="ml-2 text-sm text-boba-silver">
                                    Bed Extension Available
                                </span>
                            </label>
                        </div>
                    </div>
                </div>
            </div>

            {/* Booking/Renting Details Section */}
            <div className="w-full max-w-6xl mb-6">
                <div className="bg-boba-deep-teal p-6 rounded-lg shadow-lg">
                    <h3 className="text-white font-bold mb-4">Booking/Renting Details</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm text-boba-silver mb-2">
                                Check-in Date
                            </label>
                            <input
                                type="date"
                                value={checkInDate}
                                onChange={(e) => setCheckInDate(e.target.value)}
                                className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                            />
                        </div>
                        <div>
                            <label className="block text-sm text-boba-silver mb-2">
                                Check-out Date
                            </label>
                            <input
                                type="date"
                                value={checkOutDate}
                                onChange={(e) => setCheckOutDate(e.target.value)}
                                className="w-full px-3 py-2 bg-boba-charcoal text-boba-silver border border-boba-slate rounded focus:outline-none focus:ring-2 focus:ring-boba-blue-green"
                            />
                        </div>
                    </div>
                </div>
            </div>

        

            {/* Rooms Grid */}
            <div className="w-full max-w-6xl bg-boba-bg p-6 rounded-lg overflow-y">
                <h2 className=""></h2>
                {filteredRooms.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ">
                        {filteredRooms.map((room) => (
                            <RoomBlock
                                key={`${room.hotel_id}-${room.room_number}`}
                                room={room}
                            />
                        ))}
                    </div>
                ) : rooms ? (
                    <p className="text-center text-boba-silver text-lg">
                        No rooms match your filters.
                    </p>
                ) : (
                    <p className="text-center text-boba-silver text-lg">
                        Loading rooms...
                    </p>
                )}
            </div>
        </div>
    );
};

interface RoomBlockProps {
    room: Room;
}

const RoomBlock: React.FC<RoomBlockProps> = ({ room }) => {
    return (
        <div className="bg-boba-deep-teal border border-boba-slate rounded-lg p-4 shadow-lg hover:shadow-xl transition-shadow">
            <div className="mb-3">
                <h2 className="text-xl font-semibold text-boba-silver mb-2">
                    Room {room.room_number}
                </h2>
                {room.capacity && (
                    <div className="flex items-center mb-2">
                        <span className="text-boba-mid-teal font-medium">
                            Capacity: {room.capacity} {room.capacity === 1 ? "Guest" : "Guests"}
                        </span>
                    </div>
                )}
            </div>

            <div className="space-y-2 text-sm text-boba-silver mb-4">
                {room.price && (
                    <p>
                        <strong>Price:</strong> ${room.price}/night
                    </p>
                )}
                {room.room_view && (
                    <p>
                        <strong>View:</strong> {room.room_view}
                    </p>
                )}
                {room.bed_extension !== undefined && (
                    <p>
                        <strong>Bed Extension:</strong> {room.bed_extension ? "Available" : "Not Available"}
                    </p>
                )}
                {room.amenities && (
                    <p>
                        <strong>Amenities:</strong> {room.amenities}
                    </p>
                )}
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => {}}
                    className="flex-1 px-4 py-2 bg-boba-blue-green text-white rounded hover:bg-boba-blue-green-hover transition-colors focus:outline-none focus:ring-2 focus:ring-boba-teal font-medium"
                    aria-label={`Book Room ${room.room_number}`}
                >
                    Book
                </button>
                <button
                    onClick={() => {}}
                    className="flex-1 px-4 py-2 bg-boba-teal text-white rounded hover:bg-boba-teal-hover transition-colors focus:outline-none focus:ring-2 focus:ring-boba-mid-teal font-medium"
                    aria-label={`Rent Room ${room.room_number}`}
                >
                    Rent
                </button>
            </div>
        </div>
    );
};

export default RoomSelection;
