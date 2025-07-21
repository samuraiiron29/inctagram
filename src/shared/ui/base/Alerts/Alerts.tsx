import React from 'react';

type AlertType = 'info' | 'success' | 'warning' | 'error';

interface AlertsProps {
    message: string;
    type?: AlertType;
}

export const Alerts: React.FC<AlertsProps> = ({ message, type = 'info' }) => {
    const colorMap: Record<AlertType, string> = {
        info: 'bg-blue-100 text-blue-800',
        success: 'bg-green-100 text-green-800',
        warning: 'bg-yellow-100 text-yellow-800',
        error: 'bg-red-100 text-red-800',
    };

    return (
        <div className={`p-4 rounded ${colorMap[type]} border`}>
            {message}
        </div>
    );
};
