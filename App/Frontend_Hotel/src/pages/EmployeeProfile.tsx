import React from 'react';
import { useNavigate } from 'react-router';
import EmployeeProfileForm from '../components/Employee/EmployeeProfileForm';
import type { Employee } from '../api/employee';

const EmployeeProfile: React.FC = () => {
    const navigate = useNavigate();

    const employeeId = Number(sessionStorage.getItem('employeeId'));
    const employee: Employee | null = (() => {
        try { return JSON.parse(sessionStorage.getItem('employee') || 'null'); }
        catch { return null; }
    })();

    if (!employeeId || !employee) {
        navigate('/employee');
        return null;
    }

    const handleSignOut = () => {
        sessionStorage.clear();
        navigate('/employee');
    };

    return (
        <EmployeeProfileForm
            employeeId={employeeId}
            initialData={employee}
            onSignOut={handleSignOut}
            onBack={() => navigate('/employee/dashboard')}
        />
    );
};

export default EmployeeProfile;
