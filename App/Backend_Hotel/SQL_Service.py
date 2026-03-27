import asyncpg
import os
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

from logging import getLogger
logger = getLogger(__name__)
pool: asyncpg.pool.Pool = None

"""
Initialize the database connection pool using asyncpg. 
"""
async def init_db_pool():
    global pool
    try:
        db_url = os.getenv("DATABASE_URL")
        if not db_url:
            raise ValueError("DATABASE_URL is not set")

        pool = await asyncpg.create_pool(
            dsn=db_url,
            min_size=1,
            max_size=10
        )

        logger.info("Database pool initialized successfully")

    except Exception as e:
        logger.error(f"Failed to initialize DB pool: {e}")
        raise


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
            customer.date_of_registration
        )
        return dict(result) if result else None