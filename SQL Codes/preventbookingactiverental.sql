CREATE OR REPLACE FUNCTION prevent_booking_if_rented()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM Renting r
        WHERE r.room_number = NEW.room_number
          AND r.hotel = NEW.hotel
          AND r.hotel_chain = NEW.hotel_chain
          AND r.hotel_id = NEW.hotel_id
        AND r.check_out_date IS NULL
          
    ) THEN
        RAISE EXCEPTION 'Cannot create booking: room is currently rented or overlaps with an active renting';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_booking_insert
BEFORE INSERT ON Booking
FOR EACH ROW
EXECUTE FUNCTION prevent_booking_if_rented();