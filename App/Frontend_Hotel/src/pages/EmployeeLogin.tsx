import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import LoginForm from '../components/Employee/LoginForm';
import RegisterForm from '../components/Employee/RegisterForm';

const EmployeeLogin: React.FC = () => {
    const navigate = useNavigate();
    const [view, setView] = useState<'login' | 'register'>('login');

    // If already logged in, redirect to dashboard
    useEffect(() => {
        if (sessionStorage.getItem('employeeId')) {
            navigate('/employee/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleLogin = (id: number) => {
        void id;
        navigate('/employee/dashboard', { replace: true });
    };

    return (
        <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb', display: 'flex', alignItems: view === 'login' ? 'center' : 'flex-start', justifyContent: 'center', padding: '2rem', overflowY: 'auto' }}>
            {view === 'login'
                ? <LoginForm onCreateAccount={() => setView('register')} onLogin={handleLogin} />
                : <RegisterForm onBackToLogin={() => setView('login')} />
            }
        </div>
    );
};

export default EmployeeLogin;
