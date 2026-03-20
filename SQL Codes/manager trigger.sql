CREATE OR REPLACE FUNCTION check_single_manager()
RETURNS TRIGGER AS $$
BEGIN
    IF NEW.role_positions = 'Manager' THEN
        IF EXISTS (
            SELECT 1
            FROM Employee_Positions ep
            JOIN Employee e ON ep.employee_id = e.employee_id
            WHERE ep.role_positions = 'Manager'
            AND e.hotel_id = (SELECT hotel_id FROM hotelapp.Employee WHERE employee_id = NEW.employee_id)
        ) THEN
            RAISE EXCEPTION 'This hotel already has a manager.';
        END IF;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER one_manager_per_hotel
BEFORE INSERT ON hotelapp.Employee_Positions
FOR EACH ROW
EXECUTE FUNCTION check_single_manager();