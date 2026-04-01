const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

export interface HotelChain {
    chain_id: number;
    chain_name: string;
    street?: string;
    city?: string;
    zip_code?: string;
    country?: string;
    number_of_hotels: number;
}

export interface Hotel {
    hotel_id: number;
    chain_id: number;
    rating?: number;
    street?: string;
    city?: string;
    zip_code?: string;
    country?: string;
    email_address: string;
    manager_id?: number;
}

export interface HotelCreate {
    chain_id: number;
    rating?: number;
    street?: string;
    city?: string;
    zip_code?: string;
    country?: string;
    email_address: string;
    manager_id?: number;
}

export interface HotelChainResponse {
    chains: HotelChain[];
}

export interface HotelResponse {
    hotels: Hotel[];
}

export interface HotelRoomsResponse {
    hotel_id: number;
    rooms: any[];
}

//grab hotel chains
export async function getHotelChains(): Promise<HotelChain[]> {
    const response = await fetch(`${BASE_URL}/chains`);

    if (!response.ok) {
        throw new Error("Failed to fetch hotel chains");
    }

    const data: HotelChainResponse = await response.json();
    return data.chains;
}

//get hotels
export async function getHotels(chainId?: number): Promise<Hotel[]> {
    const url = chainId ? `${BASE_URL}/hotels?chain_id=${chainId}` : `${BASE_URL}/hotels`;
    const response = await fetch(url);

    if (!response.ok) {
        throw new Error("Failed to fetch hotels");
    }

    const data: HotelResponse = await response.json();
    return data.hotels;
}

//get all hotel rooms
export async function getHotelRooms(hotelId: number): Promise<any[]> {
    const response = await fetch(`${BASE_URL}/hotels/rooms/${hotelId}`);

    if (!response.ok) {
        throw new Error("Failed to fetch hotel rooms");
    }

    const data: HotelRoomsResponse = await response.json();
    return data.rooms;
}


//create hotel
export async function createHotel(hotel: HotelCreate): Promise<Hotel> {
    const response = await fetch(`${BASE_URL}/hotel`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(hotel),
    });

    if (!response.ok) {
        throw new Error("Failed to create hotel");
    }

    const data = await response.json();
    return data.hotel;
}
