import logging
import db_pool

logger = logging.getLogger(__name__)

# ------------------------------------------------------------------------------
# Chain Section
# ------------------------------------------------------------------------------


async def get_all_chains():
    logger.info("Executing query: SELECT * FROM hotel_chain;")
    query = "SELECT * FROM hotel_chain;"
    async with db_pool.pool.acquire() as connection:
        results = await connection.fetch(query)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


# ------------------------------------------------------------------------------
# Hotel Section
# ------------------------------------------------------------------------------


async def get_all_hotels_in_chain(chain_id):
    logger.info(
        f"Executing query: SELECT * FROM hotel WHERE chain_id = $1; | Params: chain_id={chain_id}"
    )
    query = "SELECT * FROM hotel WHERE chain_id = $1;"
    async with db_pool.pool.acquire() as connection:
        results = await connection.fetch(query, chain_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


async def get_rooms_in_hotel(hotel_id):
    logger.info(
        f"Executing query: SELECT * FROM room WHERE hotel_id = $1; | Params: hotel_id={hotel_id}"
    )
    query = "SELECT * FROM room WHERE hotel_id = $1;"
    async with db_pool.pool.acquire() as connection:
        results = await connection.fetch(query, hotel_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


# ------------------------------------------------------------------------------
# Customer Section
# ------------------------------------------------------------------------------


async def get_customer_by_id(customer_id):
    logger.info(
        f"Executing query: SELECT * FROM customer WHERE customer_id = $1; | Params: customer_id={customer_id}"
    )
    query = "SELECT * FROM customer WHERE customer_id = $1;"
    async with db_pool.pool.acquire() as connection:
        result = await connection.fetchrow(query, customer_id)
        logger.info(f"Returned customer: {result}")
        return dict(result) if result else None


async def get_bookings_for_customer(customer_id):
    logger.info(
        f"Executing query: SELECT * FROM booking WHERE customer_id = $1; | Params: customer_id={customer_id}"
    )
    query = "SELECT * FROM booking WHERE customer_id = $1;"
    async with db_pool.pool.acquire() as connection:
        results = await connection.fetch(query, customer_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


# ------------------------------------------------------------------------------
# Employee Section
# ------------------------------------------------------------------------------


async def get_bookings_for_hotel(hotel_id):
    logger.info(
        f"Executing query: SELECT * FROM booking WHERE hotel_id = $1; | Params: hotel_id={hotel_id}"
    )
    query = "SELECT * FROM booking WHERE hotel_id = $1;"
    async with db_pool.pool.acquire() as connection:
        results = await connection.fetch(query, hotel_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


async def get_rentings_for_employee(employee_id):
    logger.info(f"Fetching rentings for employee_id={employee_id}")
    query = """
        SELECT r.*
        FROM renting r
        JOIN works_on w ON r.renting_id = w.renting_id
        WHERE w.employee_id = $1;
    """
    async with db_pool.pool.acquire() as connection:
        results = await connection.fetch(query, employee_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


async def get_employee_by_id(employee_id):
    logger.info(
        f"Executing query: SELECT * FROM employee WHERE employee_id = $1; | Params: employee_id={employee_id}"
    )
    query = "SELECT * FROM employee WHERE employee_id = $1;"
    async with db_pool.pool.acquire() as connection:
        result = await connection.fetchrow(query, employee_id)
        logger.info(f"Returned employee: {result}")
        return dict(result) if result else None


# ------------------------------------------------------------------------------
# Custom View Section
# ------------------------------------------------------------------------------


async def get_available_rooms_per_city():
    logger.info("Grab the custom view made from the database")
    query = "SELECT * FROM available_rooms_per_city;"
    async with db_pool.pool.acquire() as connection:
        results = await connection.fetch(query)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


async def get_hotel_total_capacity():
    logger.info("Grab the custom view made from the database")
    query = "SELECT * FROM hotel_total_capacity;"
    async with db_pool.pool.acquire() as connection:
        results = await connection.fetch(query)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]
