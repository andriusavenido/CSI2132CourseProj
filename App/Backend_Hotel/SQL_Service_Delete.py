import db_pool

# ------------------------------------------------------------------------------
# Booking Section
# ------------------------------------------------------------------------------


async def delete_booking(booking_id):
    """
    Able to delete a customer booking
    """
    query = """
        DELETE FROM booking
        WHERE id = $1
        RETURNING *;
    """
    async with db_pool.pool.acquire() as connection:
        result = await connection.fetchrow(query, booking_id)
        return dict(result) if result else None
    
