import React from 'react';
import { tableStyle, thStyle, tdStyle, trStyle, emptyTdStyle, badgeStyle } from './tableStyles';

interface Props {
    rentings: any[];
    loading: boolean;
}

const TableCard: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div style={{ backgroundColor: '#ffffff', borderRadius: '10px', border: '1px solid #e5e7eb', overflow: 'hidden', boxShadow: '0 1px 6px rgba(0,0,0,0.05)' }}>
        <div style={{ overflowX: 'auto' }}>{children}</div>
    </div>
);

const RentingsTable: React.FC<Props> = ({ rentings, loading }) => {
    if (loading) return <p style={{ color: '#9ca3af', padding: '3rem', textAlign: 'center' }}>Loading...</p>;

    return (
        <TableCard>
            <table style={tableStyle}>
                <thead>
                    <tr>
                        {['Renting ID', 'Customer', 'Room #', 'Check-In', 'Check-Out', 'Price'].map(h => (
                            <th key={h} style={thStyle}>{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {rentings.length === 0 ? (
                        <tr><td colSpan={6} style={emptyTdStyle}>No rentings found.</td></tr>
                    ) : rentings.map((r, i) => (
                        <tr key={i} style={trStyle(i)}>
                            <td style={tdStyle}><span style={badgeStyle}>{r.renting_id ?? r.id ?? '—'}</span></td>
                            <td style={tdStyle}>{r.customer_name ?? '—'}</td>
                            <td style={tdStyle}>{r.room_number ?? '—'}</td>
                            <td style={tdStyle}>{r.check_in_date ?? '—'}</td>
                            <td style={tdStyle}>{r.check_out_date ?? '—'}</td>
                            <td style={tdStyle}>{r.price != null ? `$${Number(r.price).toFixed(2)}` : '—'}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </TableCard>
    );
};

export default RentingsTable;
