import asyncpg
import os
from dotenv import load_dotenv
from logging import getLogger

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), '.env'))

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
            logger.error("DATABASE_URL is not set")
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