INSERT INTO Room (hotel_id, room_number, price, amenities, capacity, room_view, bed_extension)
SELECT 
    h.hotel_id,
    (100 + r.capacity)::text AS room_number,
    CASE 
        WHEN r.capacity = 1 THEN 100
        WHEN r.capacity = 2 THEN 120
        WHEN r.capacity = 3 THEN 150
        WHEN r.capacity = 4 THEN 180
        WHEN r.capacity = 5 THEN 220
    END AS price,
    CASE 
        WHEN r.capacity = 1 THEN 'WiFi,TV'
        WHEN r.capacity = 2 THEN 'WiFi,TV,MiniBar'
        WHEN r.capacity = 3 THEN 'WiFi,TV,Balcony'
        WHEN r.capacity = 4 THEN 'WiFi,TV,Balcony,MiniBar'
        WHEN r.capacity = 5 THEN 'WiFi,TV,Balcony,Suite'
    END AS amenities,
    r.capacity,
    CASE 
        WHEN r.capacity <= 2 THEN 'City'
        WHEN r.capacity = 3 THEN 'Park'
        ELSE 'Sea'
    END AS room_view,
    CASE 
        WHEN r.capacity >= 3 THEN TRUE
        ELSE FALSE
    END AS bed_extension
FROM generate_series(1,40) AS h(hotel_id)
CROSS JOIN generate_series(1,5) AS r(capacity);