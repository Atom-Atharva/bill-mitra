import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';

interface HardworkingEmployeeCardProps {
    isLoading: boolean;
    employeeData: {
        user: {
            name: string;
            role: string;
        };
        bills: number;
    } | undefined;
    onClick: () => void;
}

const HardworkingEmployeeCard: React.FC<HardworkingEmployeeCardProps> = ({
    isLoading,
    employeeData,
    onClick,
}) => {
    return (
        <div
            className="bg-gradient-to-br from-orange-50 to-orange-100 rounded-lg shadow-md p-6 border border-orange-200 cursor-pointer hover:shadow-lg transition-shadow"
            onClick={onClick}
        >
            <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-800">Most Hardworking Employee</h2>
                <div className="w-12 h-12 bg-orange-200 rounded-full flex items-center justify-center">
                    <span className="text-orange-700 text-2xl">🏆</span>
                </div>
            </div>
            {isLoading ? (
                <div className="flex justify-center py-4">
                    <CircularProgress size={30} />
                </div>
            ) : employeeData ? (
                <>
                    <p className="text-2xl font-bold text-gray-800 mb-1">{employeeData.user.name}</p>
                    <p className="text-sm text-gray-600 mb-2">{employeeData.user.role}</p>
                    <div className="flex items-center gap-2">
                        <span className="text-orange-600 font-semibold text-lg">{employeeData.bills}</span>
                        <span className="text-gray-600 text-sm">bills processed</span>
                    </div>
                    <p className="text-xs text-gray-500 mt-3">Click to view details</p>
                </>
            ) : (
                <p className="text-gray-600">No data available</p>
            )}
        </div>
    );
};

export default HardworkingEmployeeCard;
