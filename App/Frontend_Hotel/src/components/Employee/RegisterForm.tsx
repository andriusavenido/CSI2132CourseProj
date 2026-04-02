import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import { createEmployee } from '../../api/employee';
import type { Employee } from '../../api/employee';

interface Props {
    onBackToLogin: () => void;
}

const RegisterForm: React.FC<Props> = ({ onBackToLogin }) => {
    const navigate = useNavigate();
    const [form, setForm] = useState<Employee>({
        ssn_sin: '',
        full_name: '',
        street: '',
        city: '',
        zip_code: '',
        country: '',
        hotel_id: 0,
    });
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: name === 'hotel_id' ? Number(value) : value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);
        try {
            await createEmployee(form);
            setSuccess(true);
            navigate('/employee/rentings');
        } catch {
            setError('Failed to create account. Please try again.');
        }
    };

    if (success) {
        return (
            <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                <p style={{ fontSize: '1.1rem', color: 'var(--boba-teal)', fontWeight: 600 }}>Account created successfully!</p>
                <button onClick={onBackToLogin} style={{ marginTop: '1.5rem', padding: '0.75rem 1.5rem', backgroundColor: 'var(--boba-teal)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}>
                    Back to Login
                </button>
            </div>
        );
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

    return (
        <div style={{ minHeight: '100vh', width: '100%', backgroundColor: '#f9fafb', padding: '3rem 2rem', boxSizing: 'border-box' }}>
            <div style={{ maxWidth: '720px', margin: '0 auto' }}>
                <button
                            type="button"
                            onClick={onBackToLogin}
                            style={{
                                background: 'none',
                                border: 'none',
                                color: 'var(--boba-teal)',
                                fontSize: '0.875rem',
                                fontWeight: 500,
                                cursor: 'pointer',
                                textAlign: 'left',
                            }}
                        >
                            ← Back to Login
                        </button>
                <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.75rem', fontWeight: 600, color: '#1a1a1a' }}>
                    Create Account
                </h2>
                <p style={{ margin: '0 0 2.5rem', fontSize: '0.875rem', color: '#6b7280' }}>
                    Fill in your details to register
                </p>

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
                                required={name !== 'zip_code'}
                                style={{
                                    padding: '0.625rem 0.875rem',
                                    border: '1px solid #d1d5db',
                                    borderRadius: '8px',
                                    fontSize: '0.9rem',
                                    outline: 'none',
                                    color: '#1a1a1a',
                                    backgroundColor: '#ffffff',
                                }}
                            />
                        </div>
                    ))}

                    <div style={{ gridColumn: '1 / -1', display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
                        {error && <p style={{ color: '#dc2626', fontSize: '0.875rem', margin: 0 }}>{error}</p>}
                        <button
                            type="submit"
                            style={{
                                padding: '0.75rem',
                                backgroundColor: 'var(--boba-teal)',
                                color: '#ffffff',
                                border: 'none',
                                borderRadius: '8px',
                                fontSize: '0.95rem',
                                fontWeight: 600,
                                cursor: 'pointer',
                            }}
                        >
                            Create Account
                        </button>
                        
                    </div>
                </form>
            </div>
        </div>
    );
};

export default RegisterForm;
