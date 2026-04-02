import React, { useState } from 'react';
import LoginForm from '../components/Employee/LoginForm';
import RegisterForm from '../components/Employee/RegisterForm';

const EmployeeLogin: React.FC = () => {
    const [view, setView] = useState<'login' | 'register'>('login');
    const [employeeId, setEmployeeId] = useState<number | null>(
        sessionStorage.getItem('employeeId') ? Number(sessionStorage.getItem('employeeId')) : null
    );

    if (employeeId) {
        return (
            <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ backgroundColor: '#ffffff', borderRadius: '12px', padding: '2.5rem', maxWidth: '400px', width: '100%', boxShadow: '0 4px 24px rgba(0,0,0,0.08)', textAlign: 'center' }}>
                    <p style={{ fontSize: '1rem', color: '#374151', marginBottom: '1.5rem' }}>Signed in as employee <strong>#{employeeId}</strong></p>
                    <button
                        onClick={() => { sessionStorage.clear(); setEmployeeId(null); }}
                        style={{ padding: '0.75rem 1.5rem', backgroundColor: 'var(--boba-teal)', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                    >
                        Sign Out
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: view === 'login' ? 'center' : 'flex-start', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
            {view === 'login'
                ? <LoginForm onCreateAccount={() => setView('register')} onLogin={id => setEmployeeId(id)} />
                : <RegisterForm onBackToLogin={() => setView('login')} />
            }
        </div>
    );
};

export default EmployeeLogin;
