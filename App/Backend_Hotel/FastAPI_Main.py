from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager
from logging import getLogger
from datetime import datetime, timezone
from Models import (
    CustomerCreate,
    EmployeeCreate,
    HotelCreate,
    RoomCreate,
    RentingCreate,
    BookingCreate,
)
from App.Backend_Hotel.SQL_Service_Insert import (
    insert_customer,
    init_db_pool,
    insert_employee,
    insert_hotel,
    insert_room,
    book_room,
    rent_room,
)


logger = getLogger(__name__)

startup_time: datetime | None = None


# ------------------------------------------------------------------------------
# Application Lifespan
# ------------------------------------------------------------------------------


@asynccontextmanager
async def lifespan(app: FastAPI):
    global startup_time
    startup_time = datetime.now(timezone.utc)
    logger.info("Application started at %s", startup_time.isoformat())
    # Initialize the asyncpg pool
    await init_db_pool()
    yield
    logger.info("Application shutting down")


app = FastAPI(
    title="Hotel API",
    version="1.0.0",
    lifespan=lifespan,
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health", tags=["Status"])
def health_check():
    """Returns service health and uptime."""
    uptime_seconds = (
        (datetime.now(timezone.utc) - startup_time).total_seconds()
        if startup_time
        else None
    )
    return {
        "status": "healthy",
        "uptime_seconds": uptime_seconds,
        "started_at": startup_time.isoformat() if startup_time else None,
    }


@app.get("/", tags=["Status"])
def root():
    return {"message": "Hotel API is running", "version": "1.0.0"}


# ------------------------------------------------------------------------------
# Endpoints for Hotel
# ------------------------------------------------------------------------------


# Insert endpoints for creating
@app.post("/customer", tags=["Customer"], status_code=201)
async def create_customer(customer: CustomerCreate):
    """Create a new customer record."""

    new_customer = await insert_customer(customer)

    return {"message": "Customer created successfully", "customer": new_customer}


@app.post("/employee", tags=["Employee"], status_code=201)
async def create_employee(employee: EmployeeCreate):
    """Create a new employee record."""

    new_employee = await insert_employee(employee)

    return {"message": "Employee created successfully", "employee": new_employee}


@app.post("/hotel", tags=["Hotel"], status_code=201)
async def create_hotel(hotel: HotelCreate):
    """Create a new hotel record."""

    new_hotel = await insert_hotel(hotel)

    return {"message": "Hotel created successfully", "hotel": new_hotel}


@app.post("/room", tags=["Room"], status_code=201)
async def create_room(room: RoomCreate):
    """Create a new room record."""

    new_room = await insert_room(room)

    return {"message": "Room created successfully", "room": new_room}


@app.post("/rent_room", tags=["Renting"], status_code=201)
async def rent_room(rental: RentingCreate):
    """Rent a room."""

    new_rental = await rent_room(rental)

    return {"message": "Room rented successfully", "rental": new_rental}


@app.post("/book_room", tags=["Booking"], status_code=201)
async def book_room(booking: BookingCreate):
    """Book a room."""

    new_booking = await book_room(booking)

    return {"message": "Room booked successfully", "booking": new_booking}


# Get view endpoints for Hotel, Employee, Customer, Room, Booking, Renting, Chain
@app.get("/chains", tags=["Chain"])
async def list_chains():
    """List all hotel chains."""

    # TODO: Implement actual database function to retrieve the hotel chains from the database

    return {"chains": []}


@app.get("/hotels", tags=["Hotel"])
async def list_hotels():
    """List all hotels."""

    # TODO: Implement actual database function to retrieve the hotels from the database

    return {"hotels": []}


@app.get("/hotels/rooms/{hotel_id}", tags=["Hotel"])
async def get_hotel(hotel_id: int):
    """Get details of a specific hotel by ID."""

    # TODO: Implement actual database function to retrieve the hotel's rooms

    return {"hotel_id": hotel_id, "rooms": []}


@app.get("/employees/booking/{hotel_id}", tags=["Employee"])
async def get_employee_bookings(hotel_id: int):
    """Get bookings for a specific hotel by ID."""

    # TODO: Implement actual database function to retrieve the employee bookings for the hotel

    return {"hotel_id": hotel_id, "bookings": []}


@app.get("/employees/renting/{hotel_id}", tags=["Employee"])
async def get_employee_rentings(hotel_id: int):
    """Get rentings for a specific hotel by ID."""

    # TODO: Implement actual database function to retrieve the employee rentings for the hotel

    return {"hotel_id": hotel_id, "rentings": []}


@app.get("/customers/booking/{customer_id}", tags=["Customer"])
async def get_customer_bookings(customer_id: int):
    """Get bookings for a specific customer by ID."""

    # TODO: Implement actual database function to retrieve the customer bookings

    return {"customer_id": customer_id, "bookings": []}


# Delete endpoints for Hotel, Employee, Customer, Room
@app.post("/delete_customer", tags=["Customer"])
async def delete_customer(customer_id: int):
    """Delete a customer by ID."""

    # TODO: Implement actual database function to delete the customer

    return {"message": "Customer deleted successfully", "customer_id": customer_id}


@app.post("/delete_employee/{employee_id}", tags=["Employee"])
async def delete_employee(employee_id: int):
    """Delete an employee by ID."""

    # TODO: Implement actual database function to delete the employee
    # Note: need to check employee ID to confirm they are a manager before allowing deletion

    return {"message": "Employee deleted successfully", "employee_id": employee_id}


@app.post("/delete_hotel/{hotel_id}", tags=["Hotel"])
async def delete_hotel(hotel_id: int):
    """Delete a hotel by ID."""

    # TODO: Implement actual database function to delete the hotel
    # Note: need to check hotel ID to confirm it exists before allowing deletion

    return {"message": "Hotel deleted successfully", "hotel_id": hotel_id}


@app.post("/delete_room/{room_id}", tags=["Room"])
async def delete_room(room_id: int):
    """Delete a room by ID."""

    # TODO: Implement actual database function to delete the room

    return {"message": "Room deleted successfully", "room_id": room_id}


# Update endpoints for Hotel, Employee, Customer, Room
@app.post("/update_customer/{customer_id}", tags=["Customer"])
async def update_customer(customer_id: int, customer: CustomerCreate):
    """Update a customer by ID."""

    # TODO: Implement actual database function to update the customer

    return {
        "message": "Customer updated successfully",
        "customer_id": customer_id,
        "customer": customer,
    }


@app.post("/update_employee/{employee_id}", tags=["Employee"])
async def update_employee(employee_id: int, employee: EmployeeCreate):
    """Update an employee by ID."""

    # TODO: Implement actual database function to update the employee

    return {
        "message": "Employee updated successfully",
        "employee_id": employee_id,
        "employee": employee,
    }


@app.post("/update_hotel/{hotel_id}", tags=["Hotel"])
async def update_hotel(hotel_id: int, hotel: HotelCreate):
    """Update a hotel by ID."""

    # TODO: Implement actual database function to update the hotel

    return {
        "message": "Hotel updated successfully",
        "hotel_id": hotel_id,
        "hotel": hotel,
    }


@app.post("/update_room/{room_id}", tags=["Room"])
async def update_room(room_id: int, room: RoomCreate):
    """Update a room by ID."""

    # TODO: Implement actual database function to update the room

    return {
        "message": "Room updated successfully",
        "room_id": room_id,
        "room": room,
    }


@app.post("/update_booking/{booking_id}", tags=["Booking"])
async def update_booking(booking_id: int, booking: BookingCreate):
    """Update a booking by ID."""

    # TODO: Implement actual database function to update the booking to renting from employee

    return {
        "message": "Booking updated to renting successfully",
        "booking_id": booking_id,
        "booking": booking,
    }


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5000)
