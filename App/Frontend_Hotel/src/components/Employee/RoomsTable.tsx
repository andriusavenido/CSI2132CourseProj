import React from 'react';
import { tableStyle, thStyle, tdStyle, trStyle, emptyTdStyle, badgeStyle, actionBtnStyle } from './tableStyles';

interface Props {
    rooms: any[];
    loading: boolean;
    onStartRenting: (room: any) => void;
}

const TableCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>{children}</div>
    </div>
);

const RoomsTable: React.FC<Props> = ({ rooms, loading, onStartRenting }) => {
    if (loading) return <p style={{ color: '#9ca3af', padding: '3rem', textAlign: 'center' }}>Loading...</p>;

    return (
        <TableCard>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        {['Room #', 'Capacity', 'Price / night', 'View', 'Amenities', 'Bed Extension', ''].map(h => (
                            <th key={h} style={thStyle}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rooms.length === 0 ? (
                        <tr><td colSpan={7} style={emptyTdStyle}>No rooms found for this hotel.</td></tr>
                    ) : rooms.map((room, i) => (
                        <tr key={i} style={trStyle(i)}>
                            <td style={tdStyle}><span style={badgeStyle}>{room.room_number}</span></td>
                            <td style={tdStyle}>{room.capacity ?? '—'}</td>
                            <td style={tdStyle}>{room.price != null ? `$${Number(room.price).toFixed(2)}` : '—'}</td>
                            <td style={tdStyle}>{room.room_view ?? '—'}</td>
                            <td style={{ ...tdStyle, maxWidth: '200px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {room.amenities ?? '—'}
                            </td>
                            <td style={tdStyle}>{room.bed_extension != null ? (room.bed_extension ? 'Yes' : 'No') : '—'}</td>
                            <td style={{ ...tdStyle, textAlign: 'right' }}>
                                <button onClick={() => onStartRenting(room)} style={actionBtnStyle}>
                                    Start Renting
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </TableCard>
    );
};

export default RoomsTable;
