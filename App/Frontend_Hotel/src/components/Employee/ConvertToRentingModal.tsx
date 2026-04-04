import React, { useState } from 'react';
import { convertBookingToRenting } from '../../api/renting';
import { actionBtnStyle } from './tableStyles';

interface Props {
    booking: any;
    onClose: () => void;
}

const inputStyle: React.CSSProperties = {
    padding: '0.55rem 0.75rem',
    border: '1px solid #d1d5db',
    borderRadius: '7px',
    fontSize: '0.875rem',
    color: '#1a1a1a',
    outline: 'none',
    width: '100%',
    boxSizing: 'border-box',
};

const ConvertToRentingModal: React.FC<Props> = ({ booking, onClose }) => {
    const employeeId = Number(sessionStorage.getItem('employeeId'));
    const bookingId: number = booking.booking_id ?? booking.id;

    const [checkInDate, setCheckInDate] = useState<string>(booking.check_in_date ?? '');
    const [checkOutDate, setCheckOutDate] = useState<string>(booking.check_out_date ?? '');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await convertBookingToRenting(bookingId, {
                employee_id: employeeId,
                check_in_date: checkInDate,
                check_out_date: checkOutDate || undefined,
            });
            setSuccess(true);
        } catch {
            setError('Failed to convert booking. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div
            style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 200, padding: '1rem' }}
            onClick={onClose}
        >
            <div
                style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.75rem', width: '100%', maxWidth: '460px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>Convert to Renting</h2>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#6b7280' }}>
                            Booking #{bookingId} &mdash; {booking.customer_name ?? '—'} &mdash; Room {booking.room_number ?? '—'}
                        </p>
                    </div>
                    <button
                        onClick={onClose}
                        style={{ background: 'none', border: 'none', fontSize: '1rem', color: '#9ca3af', cursor: 'pointer', lineHeight: 1, padding: '0.2rem' }}
                    >
                        ✕
                    </button>
                </div>

                {success ? (
                    <div style={{ textAlign: 'center', padding: '1rem 0' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>✓</div>
                        <p style={{ fontWeight: 600, color: 'var(--boba-teal)', margin: '0 0 1rem' }}>Booking converted to renting!</p>
                        <button onClick={onClose} style={actionBtnStyle}>Close</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>Check-In Date</label>
                                <input
                                    type="date"
                                    value={checkInDate}
                                    onChange={e => setCheckInDate(e.target.value)}
                                    required
                                    style={inputStyle}
                                />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>
                                    Check-Out Date <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span>
                                </label>
                                <input
                                    type="date"
                                    value={checkOutDate}
                                    onChange={e => setCheckOutDate(e.target.value)}
                                    style={inputStyle}
                                />
                            </div>
                        </div>

                        <div style={{ padding: '0.625rem 0.75rem', backgroundColor: '#f9fafb', borderRadius: '7px', fontSize: '0.8rem', color: '#6b7280', border: '1px solid #e5e7eb' }}>
                            Processing as Employee #{employeeId}
                        </div>

                        {error && (
                            <p style={{ color: '#dc2626', fontSize: '0.825rem', margin: 0, padding: '0.5rem 0.75rem', backgroundColor: '#fef2f2', borderRadius: '6px' }}>
                                {error}
                            </p>
                        )}

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                            <button
                                type="button"
                                onClick={onClose}
                                style={{ padding: '0.45rem 1rem', backgroundColor: 'transparent', color: '#6b7280', border: '1px solid #d1d5db', borderRadius: '6px', fontWeight: 500, fontSize: '0.825rem', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                disabled={loading}
                                style={{ ...actionBtnStyle, opacity: loading ? 0.7 : 1, cursor: loading ? 'not-allowed' : 'pointer' }}
                            >
                                {loading ? 'Converting...' : 'Confirm'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ConvertToRentingModal;
