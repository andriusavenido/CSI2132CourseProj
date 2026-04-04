import React, { useState } from 'react';
import { updateEmployee } from '../../api/employee';
import type { Employee } from '../../api/employee';

interface Props {
    employeeId: number;
    initialData: Employee;
    onSignOut: () => void;
    onBack: () => void;
}

const fields: { label: string; name: keyof Employee; type?: string; placeholder?: string }[] = [
    { label: 'Full Name', name: 'full_name', placeholder: 'Jane Doe' },
    { label: 'SSN / SIN', name: 'ssn_sin', placeholder: '123-456-789' },
    { label: 'Street', name: 'street', placeholder: '123 Main St' },
    { label: 'City', name: 'city', placeholder: 'Ottawa' },
    { label: 'Zip / Postal Code', name: 'zip_code', placeholder: 'K1A 0A6' },
    { label: 'Country', name: 'country', placeholder: 'Canada' },
    { label: 'Hotel ID', name: 'hotel_id', type: 'number', placeholder: '1' },
];

const inputStyle: React.CSSProperties = {
    padding: '0.625rem 0.875rem',
    border: '1px solid #d1d5db',
    borderRadius: '8px',
    fontSize: '0.9rem',
    outline: 'none',
    color: '#1a1a1a',
    backgroundColor: '#ffffff',
    width: '100%',
    boxSizing: 'border-box',
};

const EmployeeProfileForm: React.FC<Props> = ({ employeeId, initialData, onSignOut, onBack }) => {
    const [form, setForm] = useState<Employee>({ ...initialData });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const isDirty = JSON.stringify(form) !== JSON.stringify(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'hotel_id' ? Number(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!isDirty) return;
        setError(null);
        setLoading(true);
        try {
            const result = await updateEmployee(form, employeeId);
            // Persist updated employee to session
            sessionStorage.setItem('employee', JSON.stringify(result.employee ?? form));
            setSuccess(true);
        } catch {
            setError('Failed to update profile. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f9fafb', padding: '3rem 2rem', boxSizing: 'border-box' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <button
                    type="button"
                    onClick={onBack}
                    style={{ background: 'none', border: 'none', color: 'var(--boba-teal)', fontSize: '0.875rem', fontWeight: 500, cursor: 'pointer', padding: 0, marginBottom: '1.5rem', display: 'block' }}
                >
                    ← Back to Dashboard
                </button>

                <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.75rem', fontWeight: 600, color: '#1a1a1a' }}>
                    My Profile
                </h2>
                <p style={{ margin: '0 0 2.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    Employee #{employeeId} — update your details below
                </p>

                {success ? (
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                        <p style={{ fontSize: '1.1rem', color: 'var(--boba-teal)', fontWeight: 600, margin: '0 0 1.5rem' }}>
                            Profile updated successfully!
                        </p>
                        <button
                            onClick={onBack}
                            style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--boba-teal)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                        >
                            Back to Dashboard
                        </button>
                    </div>
                ) : (
                    <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2.5rem', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
                        <form onSubmit={handleSubmit} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
                            {fields.map(({ label, name, type, placeholder }) => (
                                <div key={name} style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                                    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>{label}</label>
                                    <input
                                        type={type ?? 'text'}
                                        name={name}
                                        placeholder={placeholder}
                                        value={form[name] ?? ''}
                                        onChange={handleChange}
                                        style={inputStyle}
                                    />
                                </div>
                            ))}

                            <div style={{ gridColumn: '1 / -1', borderTop: '1px solid #e5e7eb', marginTop: '0.5rem', paddingTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                {error && (
                                    <p style={{ color: '#dc2626', fontSize: '0.875rem', margin: 0, padding: '0.5rem 0.75rem', backgroundColor: '#fef2f2', borderRadius: '6px' }}>
                                        {error}
                                    </p>
                                )}
                                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                    <button
                                        type="button"
                                        onClick={onSignOut}
                                        style={{ padding: '0.65rem 1.25rem', backgroundColor: 'transparent', color: '#dc2626', border: '1px solid #fca5a5', borderRadius: '8px', fontWeight: 500, fontSize: '0.875rem', cursor: 'pointer' }}
                                    >
                                        Sign Out
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={!isDirty || loading}
                                        style={{
                                            padding: '0.75rem 2rem',
                                            backgroundColor: 'var(--boba-teal)',
                                            color: '#ffffff',
                                            border: 'none',
                                            borderRadius: '8px',
                                            fontSize: '0.95rem',
                                            fontWeight: 600,
                                            cursor: isDirty && !loading ? 'pointer' : 'not-allowed',
                                            opacity: isDirty && !loading ? 1 : 0.5,
                                        }}
                                    >
                                        {loading ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EmployeeProfileForm;
