from db_pool import pool

"""
able to delete a customer booking
"""
async def delete_booking(booking_id):
    query = """
        DELETE FROM booking
        WHERE id = $1
        RETURNING *;
    """
    async with pool.acquire() as connection:
        result = await connection.fetchrow(query, booking_id)
        return dict(result) if result else None
    
