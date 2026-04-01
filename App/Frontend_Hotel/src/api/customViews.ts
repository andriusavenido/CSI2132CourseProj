const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

// ---- Types ----
export interface AvailableRoomsPerCity {
    city: string;
    available_rooms: number;
}

export interface HotelTotalCapacity {
    hotel_id: number;
    chain_name: string;
    email_address: string;
    total_capacity: number;
}

export interface AvailableRoomsResponse {
    hotels_with_available_rooms: AvailableRoomsPerCity[];
}

export interface HotelCapacityResponse {
    hotel_total_capacity: HotelTotalCapacity[];
}


// ---- API Functions ----

/**
 * Get hotels with available rooms per city.
 * Calls the /Custom_View/available_rooms_per_city endpoint.
 */
export async function getAvailableRoomsPerCity(): Promise<AvailableRoomsResponse> {
    const response = await fetch(`${BASE_URL}/Custom_View/available_rooms_per_city`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch available rooms per city: ${response.statusText}`);
    }

    return response.json();
}

/**
 * Get total capacity of hotels.
 * Calls the /Custom_View/hotel_total_capacity endpoint.
 */
export async function getHotelTotalCapacity(): Promise<HotelCapacityResponse> {
    const response = await fetch(`${BASE_URL}/Custom_View/hotel_total_capacity`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch hotel total capacity: ${response.statusText}`);
    }

    return response.json();
}