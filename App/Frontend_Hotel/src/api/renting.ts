const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

// ---- Types ----
export interface Renting {
    customer_id: number;
    customer_name: string;
    hotel: string;
    hotel_chain: string;
    room_number: string;
    hotel_id: number;
    price: number;
    check_in_date: string;
    check_out_date?: string;
    employee_id: number;
}

export interface BookingToRentingRequest {
    employee_id: number;
    check_in_date: string;
    check_out_date?: string;
}

export interface RentingResponse {
    message: string;
    rental: any;
}

export interface ConvertRentingResponse {
    message: string;
    renting: any;
}

// ---- API Calls ----

// create a renting directly
export async function createRenting(
    rental: Renting
): Promise<RentingResponse> {
    const response = await fetch(`${BASE_URL}/rent_room`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(rental),
    });

    if (!response.ok) {
        throw new Error("Failed to create renting");
    }

    return response.json();
}

// convert an existing booking to a renting
export async function convertBookingToRenting(
    bookingId: number,
    request: BookingToRentingRequest
): Promise<ConvertRentingResponse> {
    const response = await fetch(`${BASE_URL}/booking_to_renting/${bookingId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(request),
    });

    if (!response.ok) {
        throw new Error("Failed to convert booking to renting");
    }

    return response.json();
}

