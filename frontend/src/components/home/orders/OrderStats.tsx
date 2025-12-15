import React from 'react';

interface OrderStatsProps {
    totalOrders: number;
    currentPage: number;
    totalPages: number;
}

const OrderStats: React.FC<OrderStatsProps> = ({ totalOrders, currentPage, totalPages }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                <p className="text-sm text-gray-600 mb-1">Total Orders</p>
                <p className="text-3xl font-bold text-blue-600">{totalOrders}</p>
            </div>
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                <p className="text-sm text-gray-600 mb-1">Current Page</p>
                <p className="text-3xl font-bold text-green-600">{currentPage + 1}</p>
            </div>
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                <p className="text-sm text-gray-600 mb-1">Total Pages</p>
                <p className="text-3xl font-bold text-purple-600">{totalPages}</p>
            </div>
        </div>
    );
};

export default OrderStats;
