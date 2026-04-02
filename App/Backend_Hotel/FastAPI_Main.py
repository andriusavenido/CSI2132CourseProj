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
    BookingToRentingRequest,
)
from App.Backend_Hotel.SQL_Service_Insert import (
    insert_customer,
    insert_employee,
    insert_hotel,
    insert_room,
    book_room,
    rent_room,
    booking_to_renting,
)

from App.Backend_Hotel.SQL_Service_View import (
    get_all_chains,
    get_all_hotels_in_chain,
    get_rooms_in_hotel,
    get_bookings_for_hotel,
    get_bookings_for_customer,
    get_customer_by_id,
    get_available_rooms_per_city,
    get_hotel_total_capacity,
    get_employee_by_id,
    get_rentings_for_employee,
)

from App.Backend_Hotel.SQL_Service_Delete import delete_booking

from App.Backend_Hotel.SQL_Service_Update import (
    update_customer,
    update_employee,
    update_hotel,
    update_room,
    update_booking,
)

from db_pool import init_db_pool

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


# ------------------------------------------------------------------------------
# Status Section
# ------------------------------------------------------------------------------


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
# Chain Section
# ------------------------------------------------------------------------------


@app.get("/chains", tags=["Chain"])
async def list_chains():
    """List all hotel chains."""

    chains = await get_all_chains()

    return {"chains": chains}


# ------------------------------------------------------------------------------
# Hotel Section
# ------------------------------------------------------------------------------


@app.post("/hotel", tags=["Hotel"], status_code=201)
async def create_hotel(hotel: HotelCreate):
    """Create a new hotel record."""

    new_hotel = await insert_hotel(hotel)

    return {"message": "Hotel created successfully", "hotel": new_hotel}


@app.get("/hotels", tags=["Hotel"])
async def list_hotels(chain_id: int = None):
    """List all hotels."""

    if chain_id:
        hotels = await get_all_hotels_in_chain(chain_id)
    else:
        hotels = []

    return {"hotels": hotels}


@app.get("/hotels/rooms/{hotel_id}", tags=["Hotel"])
async def get_hotel(hotel_id: int = None):
    """Get details of a specific hotel by ID."""

    if hotel_id:
        rooms = await get_rooms_in_hotel(hotel_id)
    else:
        rooms = []

    return {"hotel_id": hotel_id, "rooms": rooms}


@app.post("/update_hotel/{hotel_id}", tags=["Hotel"])
async def update_hotel(hotel_id: int, hotel: HotelCreate):
    """Update a hotel by ID."""

    new_update_hotel = await update_hotel(hotel_id, hotel)

    return {
        "message": "Hotel updated successfully",
        "hotel_id": hotel_id,
        "hotel": new_update_hotel,
    }


# ------------------------------------------------------------------------------
# Room Section
# ------------------------------------------------------------------------------


@app.post("/room", tags=["Room"], status_code=201)
async def create_room(room: RoomCreate):
    """Create a new room record."""

    new_room = await insert_room(room)

    return {"message": "Room created successfully", "room": new_room}


@app.post("/update_room/{room_id}", tags=["Room"])
async def update_room(room_id: int, room: RoomCreate):
    """Update a room by ID."""

    new_update_room = await update_room(room_id, room)

    return {
        "message": "Room updated successfully",
        "room_id": room_id,
        "room": new_update_room,
    }


# ------------------------------------------------------------------------------
# Employee Section
# ------------------------------------------------------------------------------


@app.post("/employee", tags=["Employee"], status_code=201)
async def create_employee(employee: EmployeeCreate):
    """Create a new employee record."""

    new_employee = await insert_employee(employee)

    return {"message": "Employee created successfully", "employee": new_employee}


@app.get("/employees/booking/{hotel_id}", tags=["Employee"])
async def get_employee_bookings(hotel_id: int = None):
    """Get bookings for a specific hotel by ID."""

    if hotel_id:
        bookings = await get_bookings_for_hotel(hotel_id)
    else:
        bookings = []

    return {"hotel_id": hotel_id, "bookings": bookings}


@app.get("/employees/renting/{employee_id}", tags=["Employee"])
async def get_employee_rentings(employee_id: int):
    """Get all rentings handled by a specific employee."""

    rentings = await get_rentings_for_employee(employee_id)

    return {"employee_id": employee_id, "rentings": rentings}


@app.post("/update_employee/{employee_id}", tags=["Employee"])
async def update_employee(employee_id: int, employee: EmployeeCreate):
    """Update an employee by ID."""

    new_update_employee = await update_employee(employee_id, employee)

    return {
        "message": "Employee updated successfully",
        "employee_id": employee_id,
        "employee": new_update_employee,
    }


@app.get("/employee/{employee_id}", tags=["Employee"])
async def get_employee(employee_id: int):
    """Get details of a specific employee by ID."""

    employee = await get_employee_by_id(employee_id)

    if not employee:
        raise HTTPException(status_code=404, detail="Employee not found")

    return {"employee": employee}


# ------------------------------------------------------------------------------
# Customer Section
# ------------------------------------------------------------------------------


@app.post("/customer", tags=["Customer"], status_code=201)
async def create_customer(customer: CustomerCreate):
    """Create a new customer record."""

    new_customer = await insert_customer(customer)

    return {"message": "Customer created successfully", "customer": new_customer}


@app.get("/customer/{customer_id}", tags=["Customer"])
async def get_customer(customer_id: int):
    """Get a customer by ID."""

    customer = await get_customer_by_id(customer_id)

    if not customer:
        raise HTTPException(status_code=404, detail="Customer not found")

    return {"customer": customer}


@app.get("/customers/booking/{customer_id}", tags=["Customer"])
async def get_customer_bookings(customer_id: int):
    """Get bookings for a specific customer by ID."""

    if customer_id:
        bookings = await get_bookings_for_customer(customer_id)
    else:
        bookings = []

    return {"customer_id": customer_id, "bookings": bookings}


@app.post("/update_customer/{customer_id}", tags=["Customer"])
async def update_customer(customer_id: int, customer: CustomerCreate):
    """Update a customer by ID."""

    new_update_customer = await update_customer(customer_id, customer)

    return {
        "message": "Customer updated successfully",
        "customer_id": customer_id,
        "customer": new_update_customer,
    }


# ------------------------------------------------------------------------------
# Booking Section
# ------------------------------------------------------------------------------


@app.post("/book_room", tags=["Booking"], status_code=201)
async def book_room(booking: BookingCreate):
    """Book a room."""

    new_booking = await book_room(booking)

    return {"message": "Room booked successfully", "booking": new_booking}


@app.delete("/delete_booking/{booking_id}", tags=["Booking"])
async def delete_booking(booking_id: int):
    """Delete a booking by ID."""

    new_delete_booking = await delete_booking(booking_id)

    return {"message": "Booking deleted successfully", "booking_id": new_delete_booking}


@app.post("/update_booking/{booking_id}", tags=["Booking"])
async def update_booking(booking_id: int, booking: BookingCreate):
    """Update a booking by ID."""

    new_update_booking = await update_booking(booking_id, booking)

    return {
        "message": "Booking updated to renting successfully",
        "booking_id": booking_id,
        "booking": new_update_booking,
    }


# ------------------------------------------------------------------------------
# Renting Section
# ------------------------------------------------------------------------------


@app.post("/rent_room", tags=["Renting"], status_code=201)
async def rent_room(rental: RentingCreate):
    """Rent a room."""

    new_rental = await rent_room(rental)

    return {"message": "Room rented successfully", "rental": new_rental}


@app.post("/booking_to_renting/{booking_id}", tags=["Renting"], status_code=201)
async def convert_booking_to_renting(booking_id: int, request: BookingToRentingRequest):
    """Convert an existing booking into a renting record."""

    renting = await booking_to_renting(
        booking_id, request.employee_id, request.check_in_date, request.check_out_date
    )

    if not renting:
        raise HTTPException(status_code=404, detail="Booking not found")

    return {"message": "Booking converted to renting successfully", "renting": renting}


# ------------------------------------------------------------------------------
# Custom View Section
# ------------------------------------------------------------------------------


@app.get("/Custom_View/available_rooms_per_city", tags=["Custom View"])
async def get_available_rooms_per_city():
    """Get hotels with available rooms."""

    hotels_with_available_rooms = await get_available_rooms_per_city()

    return {"hotels_with_available_rooms": hotels_with_available_rooms}


@app.get("/Custom_View/hotel_total_capacity", tags=["Custom View"])
async def get_hotel_total_capacity():
    """Get total capacity of hotels."""

    hotel_total_capacity = await get_hotel_total_capacity()

    return {"hotel_total_capacity": hotel_total_capacity}


if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="0.0.0.0", port=5000)
