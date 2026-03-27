import asyncpg
import os

from db_pool import pool
"""
Initialize the database connection pool using asyncpg. 
"""


async def insert_customer(customer):
    query = """
            INSERT INTO customer (
                phone_number,
                full_name,
                street,
                city,
                zip_code,
                country,
                ssn_sin,
                id_type,
                date_of_registration
            )
            VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
            RETURNING *;
    """
    async with pool.acquire() as connection:
        result = await connection.fetchrow(
            query,
            customer.phone_number,
            customer.full_name,
            customer.street,
            customer.city,
            customer.zip_code,
            customer.country,
            customer.ssn_sin,
            customer.id_type,
            customer.date_of_registration,
        )
        return dict(result) if result else None


async def insert_employee(employee):
    query = """
        INSERT INTO employee (
            ssn_sin,
            full_name,
            street,
            city,
            zip_code,
            country,
            hotel_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    """
    async with pool.acquire() as connection:
        result = await connection.fetchrow(
            query,
            employee.ssn_sin,
            employee.full_name,
            employee.street,
            employee.city,
            employee.zip_code,
            employee.country,
            employee.hotel_id,
        )
        return dict(result) if result else None


async def insert_hotel(hotel):
    query = """
        INSERT INTO hotel (
            chain_id,
            rating,
            street,
            city,
            zip_code,
            country,
            email_address,
            manager_id
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    """
    async with pool.acquire() as connection:
        result = await connection.fetchrow(
            query,
            hotel.chain_id,
            hotel.rating,
            hotel.street,
            hotel.city,
            hotel.zip_code,
            hotel.country,
            hotel.email_address,
            hotel.manager_id,
        )
        return dict(result) if result else None


async def insert_room(room):
    query = """
        INSERT INTO room (
            hotel_id,
            room_number,
            price,
            amenities,
            capacity,
            room_view,
            bed_extension
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7)
        RETURNING *;
    """
    async with pool.acquire() as connection:
        result = await connection.fetchrow(
            query,
            room.hotel_id,
            room.room_number,
            room.price,
            room.amenities,
            room.capacity,
            room.room_view,
            room.bed_extension,
        )
        return dict(result) if result else None


async def rent_room(rental):
    query = """
        INSERT INTO renting (
            customer_id,
            customer_name,
            hotel,
            hotel_chain,
            room_number,
            hotel_id,
            price,
            check_in_date,
            check_out_date
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)
        RETURNING *;
    """
    async with pool.acquire() as connection:
        result = await connection.fetchrow(
            query,
            rental.customer_id,
            rental.customer_name,
            rental.hotel,
            rental.hotel_chain,
            rental.room_number,
            rental.hotel_id,
            rental.price,
            rental.check_in_date,
            rental.check_out_date,
        )
        return dict(result) if result else None


async def book_room(booking):
    query = """
        INSERT INTO booking (
            customer_id,
            customer_name,
            room_number,
            hotel_chain,
            hotel,
            hotel_id,
            price,
            status
        )
        VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        RETURNING *;
    """
    async with pool.acquire() as connection:
        result = await connection.fetchrow(
            query,
            booking.customer_id,
            booking.customer_name,
            booking.room_number,
            booking.hotel_chain,
            booking.hotel,
            booking.hotel_id,
            booking.price,
            booking.status,
        )
        return dict(result) if result else None
