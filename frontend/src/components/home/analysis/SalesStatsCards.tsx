import React from 'react';
import { formatIndianPrice } from '@/utils/formatIndianPrice';

interface SalesStatsCardsProps {
    totalSales: number;
    totalBills: number;
    monthlySales: number;
    monthlyBills: number;
    todaySales: number;
    todayBills: number;
}

const SalesStatsCards: React.FC<SalesStatsCardsProps> = ({
    totalSales,
    totalBills,
    monthlySales,
    monthlyBills,
    todaySales,
    todayBills,
}) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Total Sales Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Total Sales</h2>
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <span className="text-blue-600 text-xl">₹</span>
                    </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">{formatIndianPrice(totalSales)}</p>
                <p className="text-sm text-gray-500 mt-2">Total revenue generated</p>
            </div>

            {/* Total Bills Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Total Bills</h2>
                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                        <span className="text-green-600 text-xl">📦</span>
                    </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">{totalBills}</p>
                <p className="text-sm text-gray-500 mt-2">Total orders placed</p>
            </div>

            {/* Monthly Sales Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Monthly Sales</h2>
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                        <span className="text-purple-600 text-xl">📊</span>
                    </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">{formatIndianPrice(monthlySales)}</p>
                <p className="text-sm text-gray-500 mt-2">This month's revenue</p>
            </div>

            {/* Monthly Bills Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Monthly Bills</h2>
                    <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-yellow-600 text-xl">📝</span>
                    </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">{monthlyBills}</p>
                <p className="text-sm text-gray-500 mt-2">This month's orders</p>
            </div>

            {/* Today's Sales Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Today's Sales</h2>
                    <div className="w-10 h-10 bg-pink-100 rounded-full flex items-center justify-center">
                        <span className="text-pink-600 text-xl">💰</span>
                    </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">{formatIndianPrice(todaySales)}</p>
                <p className="text-sm text-gray-500 mt-2">Today's revenue</p>
            </div>

            {/* Today's Bills Card */}
            <div className="bg-white rounded-lg shadow-md p-6 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                    <h2 className="text-lg font-semibold text-gray-700">Today's Bills</h2>
                    <div className="w-10 h-10 bg-indigo-100 rounded-full flex items-center justify-center">
                        <span className="text-indigo-600 text-xl">🧾</span>
                    </div>
                </div>
                <p className="text-3xl font-bold text-gray-800">{todayBills}</p>
                <p className="text-sm text-gray-500 mt-2">Today's orders</p>
            </div>
        </div>
    );
};

export default SalesStatsCards;
