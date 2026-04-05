import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { getAvailableHotelRooms } from '../api/hotels';
import { getEmployeeBookings, getEmployeeRentings } from '../api/employee';
import type { Employee } from '../api/employee';
import DashboardHeader, { type Tab } from '../components/Employee/DashboardHeader';
import RoomsTable from '../components/Employee/RoomsTable';
import BookingsTable from '../components/Employee/BookingsTable';
import RentingsTable from '../components/Employee/RentingsTable';
import RentingModal from '../components/Employee/RentingModal';

const EmployeeDashboard: React.FC = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>('rooms');

    const employeeId = Number(sessionStorage.getItem('employeeId'));
    const employee: Employee | null = (() => {
        try { return JSON.parse(sessionStorage.getItem('employee') || 'null'); }
        catch { return null; }
    })();
    const hotelId = employee?.hotel_id ?? null;

    const [rooms, setRooms] = useState<any[]>([]);
    const [bookings, setBookings] = useState<any[]>([]);
    const [rentings, setRentings] = useState<any[]>([]);
    const [loadingRooms, setLoadingRooms] = useState(false);
    const [loadingBookings, setLoadingBookings] = useState(false);
    const [loadingRentings, setLoadingRentings] = useState(false);

    const [selectedRoom, setSelectedRoom] = useState<any | null>(null);

    useEffect(() => {
        if (!employeeId || !employee) navigate('/employee');
    }, [employeeId, employee, navigate]);

    // Fetch rooms
    useEffect(() => {
        if (!hotelId) return;
        setLoadingRooms(true);
        getAvailableHotelRooms(hotelId)
            .then(data => setRooms(data ?? []))
            .catch(() => setRooms([]))
            .finally(() => setLoadingRooms(false));
    }, [hotelId]);

    // Fetch bookings
    useEffect(() => {
        if (!hotelId) return;
        setLoadingBookings(true);
        getEmployeeBookings(hotelId)
            .then(data => setBookings(data.bookings ?? []))
            .catch(() => setBookings([]))
            .finally(() => setLoadingBookings(false));
    }, [hotelId]);

    // Fetch rentings
    useEffect(() => {
        if (!employeeId) return;
        setLoadingRentings(true);
        getEmployeeRentings(employeeId)
            .then(data => setRentings(data.rentings ?? []))
            .catch(() => setRentings([]))
            .finally(() => setLoadingRentings(false));
    }, [employeeId]);

    const subheader: Record<Tab, { title: string; subtitle: string }> = {
        rooms: { title: 'Rooms', subtitle: `Hotel #${hotelId} • ${rooms.length} room${rooms.length !== 1 ? 's' : ''}` },
        bookings: { title: 'Hotel Bookings', subtitle: `Active bookings for Hotel #${hotelId}` },
        rentings: { title: 'My Rentings', subtitle: 'Rentings you have processed' },
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f8fafc', fontFamily: 'var(--sans)' }}>
            <DashboardHeader
                activeTab={activeTab}
                onTabChange={setActiveTab}
                employee={employee}
                onLogoClick={() => navigate('/')}
                onProfile={() => navigate('/employee/profile')}
            />

            <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem 1.5rem' }}>
                <div style={{ marginBottom: '1.5rem' }}>
                    <h1 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                        {subheader[activeTab].title}
                    </h1>
                    <p style={{ fontSize: '0.875rem', color: '#6b7280', margin: '0.25rem 0 0' }}>
                        {subheader[activeTab].subtitle}
                    </p>
                </div>

                {activeTab === 'rooms' && (
                    <RoomsTable rooms={rooms} loading={loadingRooms} onStartRenting={setSelectedRoom} />
                )}
                {activeTab === 'bookings' && (
                    <BookingsTable bookings={bookings} loading={loadingBookings} />
                )}
                {activeTab === 'rentings' && (
                    <RentingsTable rentings={rentings} loading={loadingRentings} />
                )}
            </main>

            {selectedRoom && hotelId && (
                <RentingModal
                    room={selectedRoom}
                    hotelId={hotelId}
                    onClose={() => setSelectedRoom(null)}
                />
            )}
        </div>
    );
};

export default EmployeeDashboard;
