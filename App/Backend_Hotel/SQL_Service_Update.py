from db_pool import pool

async def update_customer(customer_id, customer):
    query = """
        UPDATE customer
        SET phone_number = $1,
            full_name = $2,
            street = $3,
            city = $4,
            zip_code = $5,
            country = $6,
            ssn_sin = $7,
            id_type = $8,
            date_of_registration = $9
        WHERE customer_id = $10
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
            customer_id
        )
        return dict(result) if result else None
    
async def update_employee(employee_id, employee): 
    query = """
        UPDATE employee
        SET ssn_sin = $1,
            full_name = $2,
            street = $3,
            city = $4,
            zip_code = $5,
            country = $6,
            hotel_id = $7
        WHERE employee_id = $8
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
            employee_id
        )
        return dict(result) if result else None
    
async def update_hotel(hotel_id, hotel):
    query = """
        UPDATE hotel
        SET name = $1,
            street = $2,
            city = $3,
            zip_code = $4,
            country = $5
        WHERE hotel_id = $6
        RETURNING *;
    """
    async with pool.acquire() as connection:
        result = await connection.fetchrow(
            query,
            hotel.name,
            hotel.street,
            hotel.city,
            hotel.zip_code,
            hotel.country,
            hotel_id
        )
        return dict(result) if result else None
    
async def update_room(room_id, room):
    query = """
        UPDATE room
        SET hotel_id = $1,
            room_number = $2,
            price = $3,
            amenities = $4,
            capacity = $5,
            room_view = $6,
            bed_extension = $7
        WHERE room_id = $8
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
            room_id
        )
        return dict(result) if result else None
    
async def update_booking(booking_id, booking):
    query = """
        UPDATE booking
        SET customer_id = $1,
            room_id = $2,
            employee_id = $3,
            check_in_date = $4,
            check_out_date = $5,
            status = $6
        WHERE booking_id = $7
        RETURNING *;
    """
    async with pool.acquire() as connection:
        result = await connection.fetchrow(
            query,
            booking.customer_id,
            booking.room_id,
            booking.employee_id,
            booking.check_in_date,
            booking.check_out_date,
            booking.status,
            booking_id
        )
        return dict(result) if result else None