CREATE OR REPLACE FUNCTION prevent_booking_if_rented()
RETURNS TRIGGER AS $$
BEGIN
    IF EXISTS (
        SELECT 1
        FROM hotelapp.Renting r
        WHERE r.room_number = NEW.room_number
          AND r.hotel = NEW.hotel
          AND r.hotel_chain = NEW.hotel_chain
          AND r.hotel_id = NEW.hotel_id
          AND (
                -- Case 1: ongoing renting (no checkout yet)
                r.check_out_date IS NULL

                -- Case 2: overlap with booking dates (if Booking has dates)
                OR (
                    NEW.check_in_date < r.check_out_date
                    AND NEW.check_out_date > r.check_in_date
                )
              )
    ) THEN
        RAISE EXCEPTION 'Cannot create booking: room is currently rented or overlaps with an active renting';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER before_booking_insert
BEFORE INSERT ON hotelapp.Booking
FOR EACH ROW
EXECUTE FUNCTION prevent_booking_if_rented();