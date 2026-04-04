const BASE_URL: string = import.meta.env.VITE_API_BASE_URL;

// ---- Types ----

export interface Employee {
    ssn_sin: string
    full_name: string
    street: string
    city: string
    zip_code: string
    country: string
    hotel_id: number
}

export interface EmployeesResponse {
    message: string
    employee: Employee
}

export interface EmployeeRentingResponse {
    employee_id: number
    renting: any[]
}

// ---- API Calls ----
export async function createEmployee(employee: Employee): Promise<EmployeesResponse> {
    const response = await fetch(`${BASE_URL}/employee`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });

    const data = await response.json();
    return data;
}

export async function updateEmployee(employee: Employee, employeeID: number): Promise<EmployeesResponse> {
    const response = await fetch(`${BASE_URL}/update_employee/${employeeID}`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(employee),
    });

    const data = await response.json();
    return data;
}

export async function getEmployeeByID(employeeID: number): Promise<EmployeesResponse> {
    const response = await fetch(`${BASE_URL}/employee/${employeeID}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    const data = await response.json();
    return data;
}

export async function getEmployeeBookings(hotelId: number): Promise<{ hotel_id: number; bookings: any[] }> {
    const response = await fetch(`${BASE_URL}/employees/booking/${hotelId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
}

export async function getEmployeeRentings(employeeId: number): Promise<{ employee_id: number; rentings: any[] }> {
    const response = await fetch(`${BASE_URL}/employees/renting/${employeeId}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
    });
    const data = await response.json();
    return data;
}

