from pydantic import BaseModel
from typing import Optional


# ------------------------------------------------------------------------------
# Hotel Chain
# ------------------------------------------------------------------------------


class HotelChainCreate(BaseModel):
    chain_name: str
    street: Optional[str] = None
    city: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None
    number_of_hotels: int = 0


# ------------------------------------------------------------------------------
# Hotel
# ------------------------------------------------------------------------------


class HotelCreate(BaseModel):
    chain_id: int
    rating: Optional[int] = None
    street: Optional[str] = None
    city: Optional[str] = None
    zip_code: Optional[str] = None
    country: Optional[str] = None
    email_address: str
    manager_id: Optional[int] = None


# ------------------------------------------------------------------------------
# Employee
# ------------------------------------------------------------------------------


class EmployeeCreate(BaseModel):
    ssn_sin: str
    full_name: str
    street: str
    city: str
    zip_code: Optional[str] = None
    country: str
    hotel_id: Optional[int] = None


# ------------------------------------------------------------------------------
# Customer
# ------------------------------------------------------------------------------


class CustomerCreate(BaseModel):
    phone_number: str
    full_name: str
    street: str
    city: str
    zip_code: str
    country: str
    ssn_sin: str
    id_type: str
    date_of_registration: str


# ------------------------------------------------------------------------------
# Room
# ------------------------------------------------------------------------------


class RoomCreate(BaseModel):
    hotel_id: int
    room_number: str
    price: Optional[int] = None
    amenities: Optional[str] = None
    capacity: Optional[int] = None
    room_view: Optional[str] = None
    bed_extension: Optional[bool] = None


class RoomDamageCreate(BaseModel):
    hotel_id: int
    room_number: str
    damage_type: str


# ------------------------------------------------------------------------------
# Booking
# ------------------------------------------------------------------------------


class BookingCreate(BaseModel):
    customer_id: int
    customer_name: str
    room_number: str
    hotel_chain: str
    hotel: str
    hotel_id: int
    price: float
    status: str  # 'Booked' | 'Cancelled' | 'Completed'


# ------------------------------------------------------------------------------
# Renting
# ------------------------------------------------------------------------------


class RentingCreate(BaseModel):
    customer_id: int
    customer_name: str
    hotel: str
    hotel_chain: str
    room_number: str
    hotel_id: int
    price: float
    check_in_date: str
    check_out_date: Optional[str] = None


class BookingToRentingRequest(BaseModel):
    check_in_date: str
    check_out_date: Optional[str] = None


# ------------------------------------------------------------------------------
# Works On
# ------------------------------------------------------------------------------


class WorksOnCreate(BaseModel):
    employee_id: int
    renting_id: int


# ------------------------------------------------------------------------------
# Contact Info
# ------------------------------------------------------------------------------


class ChainNumberCreate(BaseModel):
    chain_id: int
    phone_number: str


class ChainEmailCreate(BaseModel):
    chain_id: int
    email_address: str


class HotelNumberCreate(BaseModel):
    hotel_id: int
    phone_number: str


# ------------------------------------------------------------------------------
# Employee Positions
# ------------------------------------------------------------------------------


class EmployeePositionCreate(BaseModel):
    employee_id: int
    role_positions: str
