import React from 'react';
import logo from '../../assets/logo.svg';
import type { Employee } from '../../api/employee';

export type Tab = 'rooms' | 'bookings' | 'rentings';

interface Props {
    activeTab: Tab;
    onTabChange: (tab: Tab) => void;
    employee: Employee | null;
    onLogoClick: () => void;
    onProfile: () => void;
}

const TABS: { key: Tab; label: string }[] = [
    { key: 'rooms', label: 'Rooms' },
    { key: 'bookings', label: 'Bookings' },
    { key: 'rentings', label: 'Rentings' },
];

const DashboardHeader: React.FC<Props> = ({ activeTab, onTabChange, employee, onLogoClick, onProfile }) => (
    <header style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 2rem',
        height: '64px',
        boxShadow: '0 1px 4px rgba(0,0,0,0.06)',
    }}>
        {/* Logo — clickable, goes to main page */}
        <button
            onClick={onLogoClick}
            style={{ display: 'flex', alignItems: 'center', gap: '0.625rem', background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
        >
            <img src={logo} alt="Serene" style={{ width: '36px', height: '36px' }} />
            <span style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--boba-teal)', letterSpacing: '0.04em' }}>
                Serene
            </span>
        </button>

        {/* Right side: Tabs + Profile */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
            {TABS.map(tab => (
                <button
                    key={tab.key}
                    onClick={() => onTabChange(tab.key)}
                    style={{
                        padding: '0.5rem 1.1rem',
                        border: 'none',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        fontWeight: activeTab === tab.key ? 600 : 400,
                        fontSize: '0.9rem',
                        backgroundColor: activeTab === tab.key ? 'rgba(46,107,90,0.1)' : 'transparent',
                        color: activeTab === tab.key ? 'var(--boba-teal)' : '#6b7280',
                        transition: 'background 0.15s, color 0.15s',
                    }}
                >
                    {tab.label}
                </button>
            ))}

            <div style={{ width: '1px', height: '24px', backgroundColor: '#e5e7eb', margin: '0 0.625rem' }} />

            <button
                title="Profile"
                onClick={onProfile}
                style={{
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    backgroundColor: 'var(--boba-teal)',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 600,
                    fontSize: '0.85rem',
                    flexShrink: 0,
                }}
            >
                {employee?.full_name ? employee.full_name.charAt(0).toUpperCase() : '?'}
            </button>
        </div>
    </header>
);

export default DashboardHeader;
