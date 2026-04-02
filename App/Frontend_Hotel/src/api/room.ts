const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

// ---- Types ----
export interface Room {
    hotel_id: number;
    room_number: string;
    price?: number;
    amenities?: string;
    capacity?: number;
    room_view?: string;
    bed_extension?: boolean;
}

export interface RoomResponse {
    message: string;
    room: any;
}

export interface HotelRoomsResponse {
    hotel_id: number;
    rooms: any[];
}


// create a room
export async function createRoom(room: Room): Promise<RoomResponse> {
    const response = await fetch(`${BASE_URL}/room`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(room),
    });

    if (!response.ok) {
        throw new Error("Failed to create room");
    }

    return response.json();
}

// update a room by id
export async function updateRoom(
    roomId: number,
    room: Room
): Promise<RoomResponse> {
    const response = await fetch(`${BASE_URL}/update_room/${roomId}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(room),
    });

    if (!response.ok) {
        throw new Error("Failed to update room");
    }

    return response.json();
}

