import logging
import db_pool

logger = logging.getLogger(__name__)

# ------------------------------------------------------------------------------
# Hotel Section
# ------------------------------------------------------------------------------


async def insert_hotel(hotel):
    logger.info(f"Inserting hotel: {hotel}")
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
    async with db_pool.pool.acquire() as connection:
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
        logger.info(f"Hotel insert result: {result}")
        return dict(result) if result else None


# ------------------------------------------------------------------------------
# Room Section
# ------------------------------------------------------------------------------


async def insert_room(room):
    logger.info(f"Inserting room: {room}")
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
    async with db_pool.pool.acquire() as connection:
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
        logger.info(f"Room insert result: {result}")
        return dict(result) if result else None


# ------------------------------------------------------------------------------
# Employee Section
# ------------------------------------------------------------------------------


async def insert_employee(employee):
    logger.info(f"Inserting employee: {employee}")
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
    async with db_pool.pool.acquire() as connection:
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
        logger.info(f"Employee insert result: {result}")
        return dict(result) if result else None


# ------------------------------------------------------------------------------
# Customer Section
# ------------------------------------------------------------------------------


async def insert_customer(customer):
    logger.info(f"Inserting customer: {customer}")
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
    async with db_pool.pool.acquire() as connection:
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
        logger.info(f"Customer insert result: {result}")
        return dict(result) if result else None


# ------------------------------------------------------------------------------
# Booking Section
# ------------------------------------------------------------------------------


async def book_room(booking):
    logger.info(f"Booking room: {booking}")
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
    async with db_pool.pool.acquire() as connection:
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
        logger.info(f"Book room result: {result}")
        return dict(result) if result else None


# ------------------------------------------------------------------------------
# Renting Section
# ------------------------------------------------------------------------------


async def rent_room(rental):
    logger.info(f"Renting room: {rental}")
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
    works_on_query = "INSERT INTO works_on (employee_id, renting_id) VALUES ($1, $2);"
    async with db_pool.pool.acquire() as connection:
        async with connection.transaction():
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
            if result:
                await connection.execute(
                    works_on_query, rental.employee_id, result["renting_id"]
                )
            logger.info(f"Rent room result: {result}")
            return dict(result) if result else None


# ------------------------------------------------------------------------------
# Convert Booking to Renting
# ------------------------------------------------------------------------------


async def booking_to_renting(
    booking_id: int, employee_id: int, check_in_date: str, check_out_date: str = None
):
    fetch_query = "SELECT * FROM booking WHERE booking_id = $1;"
    insert_renting_query = """
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
    update_booking_query = (
        "UPDATE booking SET status = 'completed' WHERE booking_id = $1;"
    )

    async with db_pool.pool.acquire() as connection:
        async with connection.transaction():
            booking = await connection.fetchrow(fetch_query, booking_id)
            if not booking:
                return None

            renting = await connection.fetchrow(
                insert_renting_query,
                booking["customer_id"],
                booking["customer_name"],
                booking["hotel"],
                booking["hotel_chain"],
                booking["room_number"],
                booking["hotel_id"],
                booking["price"],
                check_in_date,
                check_out_date,
            )
            await connection.execute(update_booking_query, booking_id)
            await connection.execute(
                "INSERT INTO works_on (employee_id, renting_id) VALUES ($1, $2);",
                employee_id,
                renting["renting_id"],
            )
            logger.info(f"Converted booking {booking_id} to renting {dict(renting)}")
            return dict(renting) if renting else None
