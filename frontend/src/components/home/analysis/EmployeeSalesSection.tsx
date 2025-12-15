import React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import { formatIndianPrice } from '@/utils/formatIndianPrice';

interface Employee {
    id: number;
    name: string;
    role: string;
}

interface EmployeeSalesData {
    totalSales: number;
    totalBills: number;
    monthlySales: number;
    monthlyBills: number;
    todaySales: number;
    todayBills: number;
}

interface EmployeeSalesSectionProps {
    employees: Employee[] | undefined;
    selectedEmployeeId: number | null;
    onEmployeeChange: (employeeId: number) => void;
    employeeSalesData: EmployeeSalesData | undefined;
    isLoading: boolean;
}

const EmployeeSalesSection: React.FC<EmployeeSalesSectionProps> = ({
    employees,
    selectedEmployeeId,
    onEmployeeChange,
    employeeSalesData,
    isLoading,
}) => {
    return (
        <div className="mt-6 bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl shadow-lg p-8 border border-slate-200">
            <div className="mb-8">
                <div className="flex items-center gap-3 mb-6">
                    <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg flex items-center justify-center shadow-md">
                        <span className="text-white text-2xl">👥</span>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800">Sales by Employee</h2>
                </div>
                <FormControl fullWidth variant="outlined" sx={{
                    '& .MuiOutlinedInput-root': {
                        backgroundColor: 'white',
                        borderRadius: '12px',
                        '&:hover fieldset': {
                            borderColor: '#3b82f6',
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: '#2563eb',
                            borderWidth: '2px',
                        },
                    },
                    '& .MuiInputLabel-root.Mui-focused': {
                        color: '#2563eb',
                    },
                }}>
                    <InputLabel id="employee-select-label">🔍 Select Employee</InputLabel>
                    <Select
                        labelId="employee-select-label"
                        value={selectedEmployeeId || ''}
                        onChange={(e) => onEmployeeChange(Number(e.target.value))}
                        label="🔍 Select Employee"
                        sx={{
                            height: '56px',
                            fontSize: '16px',
                        }}
                    >
                        {employees?.slice().sort((a, b) => a.name.localeCompare(b.name)).map((employee) => (
                            <MenuItem
                                key={employee.id}
                                value={employee.id}
                                sx={{
                                    padding: '12px 16px',
                                    '&:hover': {
                                        backgroundColor: '#eff6ff',
                                    },
                                    '&.Mui-selected': {
                                        backgroundColor: '#dbeafe',
                                        '&:hover': {
                                            backgroundColor: '#bfdbfe',
                                        },
                                    },
                                }}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 bg-gradient-to-br from-blue-400 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                                        {employee.name.charAt(0).toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-800">{employee.name}</p>
                                        <p className="text-xs text-gray-500">{employee.role}</p>
                                    </div>
                                </div>
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>

            {selectedEmployeeId && (
                <div>
                    {isLoading ? (
                        <div className="flex justify-center py-8">
                            <CircularProgress size={50} />
                        </div>
                    ) : employeeSalesData ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {/* Total Sales */}
                            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-4 border border-blue-200">
                                <p className="text-sm text-gray-600 mb-1">Total Sales</p>
                                <p className="text-2xl font-bold text-blue-600">{formatIndianPrice(employeeSalesData.totalSales)}</p>
                            </div>

                            {/* Total Bills */}
                            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-4 border border-green-200">
                                <p className="text-sm text-gray-600 mb-1">Total Bills</p>
                                <p className="text-2xl font-bold text-green-600">{employeeSalesData.totalBills}</p>
                            </div>

                            {/* Monthly Sales */}
                            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-4 border border-purple-200">
                                <p className="text-sm text-gray-600 mb-1">Monthly Sales</p>
                                <p className="text-2xl font-bold text-purple-600">{formatIndianPrice(employeeSalesData.monthlySales)}</p>
                            </div>

                            {/* Monthly Bills */}
                            <div className="bg-gradient-to-br from-yellow-50 to-yellow-100 rounded-lg p-4 border border-yellow-200">
                                <p className="text-sm text-gray-600 mb-1">Monthly Bills</p>
                                <p className="text-2xl font-bold text-yellow-600">{employeeSalesData.monthlyBills}</p>
                            </div>

                            {/* Today's Sales */}
                            <div className="bg-gradient-to-br from-pink-50 to-pink-100 rounded-lg p-4 border border-pink-200">
                                <p className="text-sm text-gray-600 mb-1">Today's Sales</p>
                                <p className="text-2xl font-bold text-pink-600">{formatIndianPrice(employeeSalesData.todaySales)}</p>
                            </div>

                            {/* Today's Bills */}
                            <div className="bg-gradient-to-br from-indigo-50 to-indigo-100 rounded-lg p-4 border border-indigo-200">
                                <p className="text-sm text-gray-600 mb-1">Today's Bills</p>
                                <p className="text-2xl font-bold text-indigo-600">{employeeSalesData.todayBills}</p>
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600 text-center py-4">No data available</p>
                    )}
                </div>
            )}

            {!selectedEmployeeId && (
                <div className="text-center py-8 text-gray-500">
                    <p className="text-lg">Select an employee to view their sales performance</p>
                </div>
            )}
        </div>
    );
};

export default EmployeeSalesSection;
