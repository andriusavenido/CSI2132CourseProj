
import logging
from db_pool import pool

logger = logging.getLogger(__name__)


async def get_all_chains():
    logger.info("Executing query: SELECT * FROM hotel_chain;")
    query = "SELECT * FROM hotel_chain;"
    async with pool.acquire() as connection:
        results = await connection.fetch(query)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


async def get_all_hotels_in_chain(chain_id):
    logger.info(f"Executing query: SELECT * FROM hotel WHERE chain_id = $1; | Params: chain_id={chain_id}")
    query = "SELECT * FROM hotel WHERE chain_id = $1;"
    async with pool.acquire() as connection:
        results = await connection.fetch(query, chain_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


async def get_rooms_in_hotel(hotel_id):
    logger.info(f"Executing query: SELECT * FROM room WHERE hotel_id = $1; | Params: hotel_id={hotel_id}")
    query = "SELECT * FROM room WHERE hotel_id = $1;"
    async with pool.acquire() as connection:
        results = await connection.fetch(query, hotel_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


async def get_bookings_for_hotel(hotel_id):
    logger.info(f"Executing query: SELECT * FROM booking WHERE hotel_id = $1; | Params: hotel_id={hotel_id}")
    query = "SELECT * FROM booking WHERE hotel_id = $1;"
    async with pool.acquire() as connection:
        results = await connection.fetch(query, hotel_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


async def get_rentings_for_hotel(hotel_id):
    logger.info(f"Executing query: SELECT * FROM renting WHERE hotel_id = $1; | Params: hotel_id={hotel_id}")
    query = "SELECT * FROM renting WHERE hotel_id = $1;"
    async with pool.acquire() as connection:
        results = await connection.fetch(query, hotel_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]


async def get_bookings_for_customer(customer_id):
    logger.info(f"Executing query: SELECT * FROM booking WHERE customer_id = $1; | Params: customer_id={customer_id}")
    query = "SELECT * FROM booking WHERE customer_id = $1;"
    async with pool.acquire() as connection:
        results = await connection.fetch(query, customer_id)
        logger.info(f"Returned {len(results)} results")
        return [dict(result) for result in results]
