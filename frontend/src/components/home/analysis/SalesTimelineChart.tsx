import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import TextField from '@mui/material/TextField';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { formatIndianPrice } from '@/utils/formatIndianPrice';

interface TimelineDataPoint {
    date: string;
    sales: number;
    bills: number;
}

interface SalesTimelineChartProps {
    fromDate: string;
    toDate: string;
    onFromDateChange: (date: string) => void;
    onToDateChange: (date: string) => void;
    timelineData: TimelineDataPoint[] | undefined;
    isLoading: boolean;
    error: any;
}

const SalesTimelineChart: React.FC<SalesTimelineChartProps> = ({
    fromDate,
    toDate,
    onFromDateChange,
    onToDateChange,
    timelineData,
    isLoading,
    error,
}) => {
    return (
        <div className="mt-6 bg-gradient-to-br from-white to-gray-50 rounded-xl shadow-lg p-8 border border-gray-200">
            <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg flex items-center justify-center shadow-md">
                    <span className="text-white text-2xl">📈</span>
                </div>
                <h2 className="text-2xl font-bold text-gray-800">Sales Timeline</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <TextField
                    label="From Date"
                    type="date"
                    value={fromDate}
                    onChange={(e) => onFromDateChange(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            '&:hover fieldset': {
                                borderColor: '#9333ea',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#7e22ce',
                                borderWidth: '2px',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#7e22ce',
                        },
                    }}
                />
                <TextField
                    label="To Date"
                    type="date"
                    value={toDate}
                    onChange={(e) => onToDateChange(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    fullWidth
                    sx={{
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: 'white',
                            borderRadius: '12px',
                            '&:hover fieldset': {
                                borderColor: '#9333ea',
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#7e22ce',
                                borderWidth: '2px',
                            },
                        },
                        '& .MuiInputLabel-root.Mui-focused': {
                            color: '#7e22ce',
                        },
                    }}
                />
            </div>

            {isLoading ? (
                <div className="flex justify-center py-12">
                    <CircularProgress size={60} />
                </div>
            ) : error ? (
                <div className="flex items-center justify-center h-64 border-2 border-red-300 rounded-lg bg-red-50">
                    <div className="text-center p-6">
                        <div className="w-16 h-16 bg-red-200 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-red-600 text-3xl">⚠️</span>
                        </div>
                        <p className="text-red-600 text-lg font-semibold mb-2">Invalid Date Range</p>
                        <p className="text-red-500 text-sm">From Date cannot be after To Date.</p>
                        <p className="text-gray-600 text-sm mt-2">Please select a valid date range</p>
                    </div>
                </div>
            ) : timelineData && timelineData.length > 0 ? (
                <div className="bg-white rounded-xl p-6 shadow-sm">
                    <ResponsiveContainer width="100%" height={400}>
                        <LineChart data={timelineData}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                            <XAxis
                                dataKey="date"
                                stroke="#6b7280"
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => {
                                    const date = new Date(value);
                                    return `${date.getMonth() + 1}/${date.getDate()}`;
                                }}
                            />
                            <YAxis
                                yAxisId="left"
                                stroke="#8b5cf6"
                                style={{ fontSize: '12px' }}
                                tickFormatter={(value) => `₹${(value / 1000).toFixed(0)}k`}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                stroke="#10b981"
                                style={{ fontSize: '12px' }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'white',
                                    border: '1px solid #e5e7eb',
                                    borderRadius: '12px',
                                    padding: '12px',
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                                }}
                                formatter={(value: any, name: string) => {
                                    if (name === 'sales') {
                                        return [formatIndianPrice(value), 'Sales'];
                                    }
                                    return [value, 'Bills'];
                                }}
                                labelFormatter={(label) => {
                                    const date = new Date(label);
                                    return date.toLocaleDateString('en-IN', {
                                        month: 'short',
                                        day: 'numeric',
                                        year: 'numeric'
                                    });
                                }}
                            />
                            <Legend
                                wrapperStyle={{
                                    paddingTop: '20px',
                                    fontSize: '14px',
                                    fontWeight: '600',
                                }}
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="sales"
                                stroke="#8b5cf6"
                                strokeWidth={3}
                                dot={{ fill: '#8b5cf6', r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Sales (₹)"
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="bills"
                                stroke="#10b981"
                                strokeWidth={3}
                                dot={{ fill: '#10b981', r: 4 }}
                                activeDot={{ r: 6 }}
                                name="Bills"
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
            ) : (
                <div className="flex items-center justify-center h-64 border-2 border-dashed border-gray-300 rounded-lg bg-gray-50">
                    <div className="text-center">
                        <p className="text-gray-500 text-lg">No data available for selected date range</p>
                        <p className="text-gray-400 text-sm mt-2">Try selecting a different date range</p>
                    </div>
                </div>
            )}
        </div>
    );
};

export default SalesTimelineChart;
