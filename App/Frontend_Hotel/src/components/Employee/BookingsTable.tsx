import React, { useState } from 'react';
import { tableStyle, thStyle, tdStyle, trStyle, emptyTdStyle, badgeStyle, statusBadgeStyle, actionBtnStyle } from './tableStyles';
import ConvertToRentingModal from './ConvertToRentingModal';

interface Props {
    bookings: any[];
    loading: boolean;
}

const TableCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>{children}</div>
    </div>
);

const BookingsTable: React.FC<Props> = ({ bookings, loading }) => {
    const [selectedBooking, setSelectedBooking] = useState<any | null>(null);

    if (loading) return <p style={{ color: '#9ca3af', padding: '3rem', textAlign: 'center' }}>Loading...</p>;

    return (
        <>
            <TableCard>
                <table style={tableStyle}>
                    <thead>
                        <tr>
                            {['Booking ID', 'Customer', 'Room #', 'Check-In', 'Check-Out', 'Price', 'Status', ''].map(h => (
                                <th key={h} style={thStyle}>{h}</th>
                            ))}
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length === 0 ? (
                            <tr><td colSpan={8} style={emptyTdStyle}>No bookings found for this hotel.</td></tr>
                        ) : bookings.map((b, i) => (
                            <tr key={i} style={trStyle(i)}>
                                <td style={tdStyle}><span style={badgeStyle}>{b.booking_id ?? b.id ?? '—'}</span></td>
                                <td style={tdStyle}>{b.customer_name ?? '—'}</td>
                                <td style={tdStyle}>{b.room_number ?? '—'}</td>
                                <td style={tdStyle}>{b.check_in_date ?? '—'}</td>
                                <td style={tdStyle}>{b.check_out_date ?? '—'}</td>
                                <td style={tdStyle}>{b.price != null ? `$${Number(b.price).toFixed(2)}` : '—'}</td>
                                <td style={tdStyle}>
                                    <span style={statusBadgeStyle(b.status)}>{b.status ?? '—'}</span>
                                </td>
                                <td style={{ ...tdStyle, textAlign: 'right' }}>
                                    <button onClick={() => setSelectedBooking(b)} style={actionBtnStyle}>
                                        Convert to Renting
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </TableCard>

            {selectedBooking && (
                <ConvertToRentingModal
                    booking={selectedBooking}
                    onClose={() => setSelectedBooking(null)}
                />
            )}
        </>
    );
};

export default BookingsTable;
