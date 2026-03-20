import asyncpg

pool: asyncpg.pool.Pool = None

async def init_db_pool():
    global pool
    pool = await asyncpg.create_pool(
        user='your_username',
        password='your_password',
        database='y',
        host='localhost',
        port=5432,
        min_size=1,
        max_size=10
    )
