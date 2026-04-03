-- Our Indexes

-- 1. Customer booking lookup : with large number of bookings, this index will speed up queries that filter by customer_id in the Booking table.
CREATE INDEX idx_booking_customer
ON Booking(customer_id);

-- 2. Hotel booking lookup : the index on hotel_id in the Booking table will speed up queries that filter by hotel_id, which is common when looking for all bookings for a specific hotel
CREATE INDEX idx_booking_hotel
ON Booking(hotel_id);

-- 3. Rooms per hotel lookup  : this index is more important on the customer side, where
--- they want to view all rooms by hotel , will speed up queries to avoid scanning entire room table when looking for rooms in a specific hotel, which is a common operation when customers are browsing available rooms.
CREATE INDEX idx_room_hotel
ON Room(hotel_id);

-- 4. Renting per employee : can speedup the flow of employees looking up their  assinged work 
CREATE INDEX idx_workson_employee
ON Works_On(employee_id);

-- 5. Hotels per chain //optimizes filtering for hotels within a chain
CREATE INDEX idx_hotel_chain
ON Hotel(chain_id);