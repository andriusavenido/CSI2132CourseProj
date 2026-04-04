import React, { useState } from 'react';
import { createRenting } from '../../api/renting';
import { actionBtnStyle } from './tableStyles';

interface RentingForm {
    customer_id: string;
    customer_name: string;
    hotel: string;
    hotel_chain: string;
    check_in_date: string;
    check_out_date: string;
}

const defaultForm: RentingForm = {
    customer_id: '',
    customer_name: '',
    hotel: '',
    hotel_chain: '',
    check_in_date: '',
    check_out_date: '',
};

interface Props {
    room: any;
    hotelId: number;
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

const RentingModal: React.FC<Props> = ({ room, hotelId, onClose }) => {
    const employeeId = Number(sessionStorage.getItem('employeeId'));

    const [form, setForm] = useState<RentingForm>(defaultForm);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            await createRenting({
                customer_id: Number(form.customer_id),
                customer_name: form.customer_name,
                hotel: form.hotel,
                hotel_chain: form.hotel_chain,
                room_number: room.room_number,
                hotel_id: hotelId,
                price: room.price ?? 0,
                check_in_date: form.check_in_date,
                check_out_date: form.check_out_date || undefined,
                employee_id: employeeId,
            });
            setSuccess(true);
        } catch {
            setError('Failed to create renting. Please check the details and try again.');
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
                style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '1.75rem', width: '100%', maxWidth: '520px', boxShadow: '0 8px 40px rgba(0,0,0,0.18)' }}
                onClick={e => e.stopPropagation()}
            >
                {/* Modal header */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1.25rem' }}>
                    <div>
                        <h2 style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700, color: '#111827' }}>Start Renting</h2>
                        <p style={{ margin: '0.25rem 0 0', fontSize: '0.8rem', color: '#6b7280' }}>
                            Room {room.room_number} &mdash; ${Number(room.price ?? 0).toFixed(2)} / night
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
                        <p style={{ fontWeight: 600, color: 'var(--boba-teal)', margin: '0 0 1rem' }}>Renting created successfully!</p>
                        <button onClick={onClose} style={actionBtnStyle}>Close</button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '0.875rem' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>Customer ID</label>
                                <input name="customer_id" type="number" value={form.customer_id} onChange={handleChange} required placeholder="e.g. 42" style={inputStyle} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>Customer Name</label>
                                <input name="customer_name" type="text" value={form.customer_name} onChange={handleChange} required placeholder="Full name" style={inputStyle} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>Hotel Name</label>
                                <input name="hotel" type="text" value={form.hotel} onChange={handleChange} required placeholder="e.g. Serene Downtown" style={inputStyle} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>Hotel Chain</label>
                                <input name="hotel_chain" type="text" value={form.hotel_chain} onChange={handleChange} required placeholder="e.g. Serene Hotels" style={inputStyle} />
                            </div>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>Check-In Date</label>
                                <input name="check_in_date" type="date" value={form.check_in_date} onChange={handleChange} required style={inputStyle} />
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
                                <label style={{ fontSize: '0.8rem', fontWeight: 500, color: '#374151' }}>
                                    Check-Out Date <span style={{ color: '#9ca3af', fontWeight: 400 }}>(optional)</span>
                                </label>
                                <input name="check_out_date" type="date" value={form.check_out_date} onChange={handleChange} style={inputStyle} />
                            </div>
                        </div>

                        {error && (
                            <p style={{ color: '#dc2626', fontSize: '0.825rem', margin: 0, padding: '0.5rem 0.75rem', backgroundColor: '#fef2f2', borderRadius: '6px' }}>
                                {error}
                            </p>
                        )}

                        <div style={{ padding: '0.625rem 0.75rem', backgroundColor: '#f9fafb', borderRadius: '7px', fontSize: '0.8rem', color: '#6b7280', border: '1px solid #e5e7eb' }}>
                            Processing as Employee #{employeeId}
                        </div>

                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '0.25rem' }}>
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
                                {loading ? 'Creating...' : 'Begin Renting'}
                            </button>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default RentingModal;
