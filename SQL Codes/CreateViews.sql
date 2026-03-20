CREATE VIEW available_rooms_per_city AS
SELECT 
    h.city,
    COUNT(r.room_number) AS available_rooms
FROM Room r
JOIN Hotel h ON r.hotel_id = h.hotel_id
LEFT JOIN Renting rent
    ON r.hotel_id = rent.hotel_id AND r.room_number = rent.room_number
    AND (rent.check_out_date IS NULL OR rent.check_out_date::DATE >= CURRENT_DATE)
WHERE rent.renting_id IS NULL  
GROUP BY h.city
ORDER BY h.city;

CREATE OR REPLACE VIEW hotel_total_capacity AS
SELECT
    h.hotel_id,
    hc.chain_name,
    h.email_address,
    SUM(r.capacity) AS total_capacity
FROM Hotel h
JOIN Hotel_Chain hc ON h.chain_id = hc.chain_id
JOIN Room r ON h.hotel_id = r.hotel_id
GROUP BY h.hotel_id, hc.chain_name, h.email_address
ORDER BY h.hotel_id;