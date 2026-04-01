const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

//typing
// ---- Types ----
export interface Customer {
    phone_number: string;
    full_name: string;
    street: string;
    city: string;
    zip_code: string;
    country: string;
    ssn_sin: string;
    id_type: string;
    date_of_registration: string;
}

export interface CustomerResponse {
    message: string;
    customer: any; 
}

export interface BookingResponse {
    customer_id: number;
    bookings: any[]; 
}

//api calls
export async function createCustomer(
    customer: Customer
): Promise<CustomerResponse> {
    const response = await fetch(`${BASE_URL}/customer`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(customer),
    });

    if (!response.ok) {
        throw new Error("Failed to create customer");
    }
    return response.json();
}

//get customer by id
export async function getCustomerById(
    customerId: number
): Promise<CustomerResponse> {
    const response = await fetch(
        `${BASE_URL}/customer/${customerId}`
    );
    if (!response.ok) {
        throw new Error("Failed to fetch customer");
    }
    return response.json();
}

//get customers bookings
export async function getCustomerBookings(
    customerId: number
): Promise<BookingResponse> {
    const response = await fetch(
        `${BASE_URL}/customers/booking/${customerId}`
    );

    if (!response.ok) {
        throw new Error("Failed to fetch bookings");
    }

    return response.json();
}

//update customer
export async function updateCustomer(
    customerId: number,
    customer: Customer
): Promise<CustomerResponse> {
    const response = await fetch(
        `${BASE_URL}/update_customer/${customerId}`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(customer),
        }
    );

    if (!response.ok) {
        throw new Error("Failed to update customer");
    }

    return response.json();
}