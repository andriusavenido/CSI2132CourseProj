const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

// ---- Types ----
export interface Booking {
    customer_id: number;
    customer_name: string;
    room_number: string;
    hotel_chain: string;
    hotel: string;
    hotel_id: number;
    price: number;
    status: string; // 'Booked' | 'Cancelled' | 'Completed'
}

export interface BookingResponse {
    message: string;
    booking: any;
}

export interface DeleteBookingResponse {
    message: string;
    booking_id: any;
}

// create a booking
export async function createBooking(
    booking: Booking
): Promise<BookingResponse> {
    const response = await fetch(`${BASE_URL}/book_room`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
    });

    if (!response.ok) {
        throw new Error("Failed to create booking");
    }

    return response.json();
}

// delete a booking by id
export async function deleteBooking(
    bookingId: number
): Promise<DeleteBookingResponse> {
    const response = await fetch(`${BASE_URL}/delete_booking/${bookingId}`, {
        method: "DELETE",
    });

    if (!response.ok) {
        throw new Error("Failed to delete booking");
    }

    return response.json();
}

// update a booking by id
export async function updateBooking(
    bookingId: number,
    booking: Booking
): Promise<BookingResponse> {
    const response = await fetch(`${BASE_URL}/update_booking/${bookingId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(booking),
    });

    if (!response.ok) {
        throw new Error("Failed to update booking");
    }

    return response.json();
}

