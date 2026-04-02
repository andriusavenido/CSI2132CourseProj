import React, { useState } from 'react';
import { getEmployeeByID } from '../../api/employee';

interface Props {
    onCreateAccount: () => void;
    onLogin: (employeeId: number) => void;
}

const LoginForm: React.FC<Props> = ({ onCreateAccount, onLogin }) => {
    const [employeeId, setEmployeeId] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.SyntheticEvent) => {
        e.preventDefault();
        setError(null);
        setLoading(true);
        try {
            const id = Number(employeeId);
            const result = await getEmployeeByID(id);
            if (!result.employee) {
                setError('Employee not found. Please check your ID.');
                return;
            }
            sessionStorage.setItem('employeeId', String(id));
            sessionStorage.setItem('employee', JSON.stringify(result.employee));
            onLogin(id);
        } catch {
            setError('Login failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2.5rem', width: '100%', maxWidth: '400px', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}>
            <h2 style={{ margin: '0 0 0.25rem', fontSize: '1.5rem', fontWeight: 600, color: '#1a1a1a' }}>
                Employee Login
            </h2>
            <p style={{ margin: '0 0 2rem', fontSize: '0.875rem', color: '#6b7280' }}>
                Sign in with your employee ID
            </p>

            <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.375rem' }}>
                    <label style={{ fontSize: '0.875rem', fontWeight: 500, color: '#374151' }}>Employee ID</label>
                    <input
                        type="number"
                        placeholder="Enter your employee ID"
                        value={employeeId}
                        onChange={e => setEmployeeId(e.target.value)}
                        required
                        style={{
                            padding: '0.625rem 0.875rem',
                            border: '1px solid #d1d5db',
                            borderRadius: '8px',
                            fontSize: '0.9rem',
                            outline: 'none',
                            color: '#1a1a1a',
                        }}
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    style={{
                        marginTop: '0.5rem',
                        padding: '0.75rem',
                        backgroundColor: 'var(--boba-teal)',
                        color: '#ffffff',
                        border: 'none',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        cursor: loading ? 'not-allowed' : 'pointer',
                        opacity: loading ? 0.7 : 1,
                    }}
                >
                    {loading ? 'Signing in...' : 'Sign In'}
                </button>
            </form>

            {error && <p style={{ color: '#dc2626', fontSize: '0.875rem', marginTop: '0.75rem' }}>{error}</p>}

            <div style={{ marginTop: '1.5rem', borderTop: '1px solid #f0f0f0', paddingTop: '1.5rem', textAlign: 'center' }}>
                <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.75rem' }}>
                    Don't have an account?
                </p>
                <button
                    onClick={onCreateAccount}
                    style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: '#ffffff',
                        color: 'var(--boba-teal)',
                        border: '1.5px solid var(--boba-teal)',
                        borderRadius: '8px',
                        fontSize: '0.95rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                    }}
                >
                    Create Account
                </button>
            </div>
        </div>
    );
};

export default LoginForm;
