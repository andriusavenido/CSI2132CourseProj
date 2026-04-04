import React from 'react';

export const tableStyle: React.CSSProperties = {
    width: '100%',
    borderCollapse: 'collapse',
    fontSize: '0.875rem',
};

export const thStyle: React.CSSProperties = {
    padding: '0.75rem 1rem',
    textAlign: 'left',
    fontWeight: 600,
    fontSize: '0.75rem',
    color: '#6b7280',
    textTransform: 'uppercase',
    letterSpacing: '0.05em',
    backgroundColor: '#f9fafb',
    borderBottom: '1px solid #e5e7eb',
    whiteSpace: 'nowrap',
};

export const tdStyle: React.CSSProperties = {
    padding: '0.875rem 1rem',
    color: '#374151',
    borderBottom: '1px solid #f3f4f6',
    verticalAlign: 'middle',
};

export const trStyle = (i: number): React.CSSProperties => ({
    backgroundColor: i % 2 === 0 ? '#ffffff' : '#fafafa',
});

export const emptyTdStyle: React.CSSProperties = {
    padding: '2.5rem',
    textAlign: 'center',
    color: '#9ca3af',
};

export const badgeStyle: React.CSSProperties = {
    display: 'inline-block',
    padding: '0.2rem 0.5rem',
    backgroundColor: 'rgba(46,107,90,0.08)',
    color: 'var(--boba-teal)',
    borderRadius: '4px',
    fontSize: '0.8rem',
    fontWeight: 600,
};

export const actionBtnStyle: React.CSSProperties = {
    padding: '0.45rem 1rem',
    backgroundColor: 'var(--boba-teal)',
    color: '#ffffff',
    border: 'none',
    borderRadius: '6px',
    fontWeight: 600,
    fontSize: '0.825rem',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
};

export const statusBadgeStyle = (status: string): React.CSSProperties => {
    const map: Record<string, { bg: string; color: string }> = {
        Booked: { bg: 'rgba(46,107,90,0.1)', color: 'var(--boba-teal)' },
        Cancelled: { bg: '#fef2f2', color: '#dc2626' },
        Completed: { bg: '#f0fdf4', color: '#16a34a' },
    };
    const s = map[status] ?? { bg: '#f3f4f6', color: '#6b7280' };
    return {
        display: 'inline-block',
        padding: '0.2rem 0.5rem',
        backgroundColor: s.bg,
        color: s.color,
        borderRadius: '4px',
        fontSize: '0.8rem',
        fontWeight: 600,
    };
};
