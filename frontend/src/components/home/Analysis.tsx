import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchSalesData } from '@/apis/fetchSalesData';
import { fetchHardworkingEmployee } from '@/apis/fetchHardworkingEmployee';
import { fetchMostSellableItem } from '@/apis/fetchMostSellableItem';
import { fetchEmployeeSales } from '@/apis/fetchEmployeeSales';
import { fetchAllEmployees } from '@/apis/fetchAllEmployees';
import { fetchSalesTimeline } from '@/apis/fetchSalesTimeline';
import CircularProgress from '@mui/material/CircularProgress';
import SalesStatsCards from './analysis/SalesStatsCards';
import HardworkingEmployeeCard from './analysis/HardworkingEmployeeCard';
import MostSellableItemCard from './analysis/MostSellableItemCard';
import EmployeeSalesSection from './analysis/EmployeeSalesSection';
import SalesTimelineChart from './analysis/SalesTimelineChart';
import EmployeeDetailsDialog from './analysis/EmployeeDetailsDialog';
import ItemDetailsDialog from './analysis/ItemDetailsDialog';

const Analysis: React.FC = () => {
    const [employeeDialogOpen, setEmployeeDialogOpen] = useState(false);
    const [itemDialogOpen, setItemDialogOpen] = useState(false);
    const [selectedEmployeeId, setSelectedEmployeeId] = useState<number | null>(null);

    // Date range for sales timeline (default to last 30 days)
    const [fromDate, setFromDate] = useState(() => {
        const date = new Date();
        date.setDate(date.getDate() - 30);
        return date.toISOString().split('T')[0];
    });
    const [toDate, setToDate] = useState(() => new Date().toISOString().split('T')[0]);

    const { data: salesData, isLoading, isError, error } = useQuery({
        queryKey: ['salesData'],
        queryFn: fetchSalesData,
    });

    const { data: employeeData, isLoading: isEmployeeLoading } = useQuery({
        queryKey: ['hardworkingEmployee'],
        queryFn: fetchHardworkingEmployee,
    });

    const { data: itemData, isLoading: isItemLoading } = useQuery({
        queryKey: ['mostSellableItem'],
        queryFn: fetchMostSellableItem,
    });

    const { data: employees } = useQuery({
        queryKey: ['allEmployees'],
        queryFn: fetchAllEmployees,
    });

    const { data: employeeSalesData, isLoading: isEmployeeSalesLoading } = useQuery({
        queryKey: ['employeeSales', selectedEmployeeId],
        queryFn: () => fetchEmployeeSales(selectedEmployeeId!),
        enabled: selectedEmployeeId !== null,
    });

    const { data: timelineData, isLoading: isTimelineLoading, error: timelineError } = useQuery({
        queryKey: ['salesTimeline', fromDate, toDate],
        queryFn: () => fetchSalesTimeline(fromDate, toDate),
    });

    console.log('Sales Data:', salesData);
    console.log('Is Error:', isError);
    console.log('Error:', error);

    if (isLoading) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-gray-50">
                <CircularProgress size={60} />
            </div>
        );
    }

    if (isError) {
        return (
            <div className="h-full w-full flex items-center justify-center bg-gray-50">
                <div className="text-center">
                    <p className="text-red-600 text-xl font-semibold">Failed to load sales data</p>
                    <p className="text-gray-600 mt-2">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-y-auto bg-gray-50">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Sales Analysis</h1>
                    <p className="text-gray-600 mt-2">Analyze your store's sales performance and trends</p>
                </div>

                {/* Sales Analytics Cards */}
                <SalesStatsCards
                    totalSales={salesData?.totalSales || 0}
                    totalBills={salesData?.totalBills || 0}
                    monthlySales={salesData?.monthlySales || 0}
                    monthlyBills={salesData?.monthlyBills || 0}
                    todaySales={salesData?.todaySales || 0}
                    todayBills={salesData?.todayBills || 0}
                />

                {/* Hardworking Employee and Most Sellable Item Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                    <HardworkingEmployeeCard
                        isLoading={isEmployeeLoading}
                        employeeData={employeeData}
                        onClick={() => setEmployeeDialogOpen(true)}
                    />
                    <MostSellableItemCard
                        isLoading={isItemLoading}
                        itemData={itemData}
                        onClick={() => setItemDialogOpen(true)}
                    />
                </div>

                {/* Employee Sales Card */}
                <EmployeeSalesSection
                    employees={employees}
                    selectedEmployeeId={selectedEmployeeId}
                    onEmployeeChange={setSelectedEmployeeId}
                    employeeSalesData={employeeSalesData}
                    isLoading={isEmployeeSalesLoading}
                />

                {/* Sales Timeline Chart */}
                <SalesTimelineChart
                    fromDate={fromDate}
                    toDate={toDate}
                    onFromDateChange={setFromDate}
                    onToDateChange={setToDate}
                    timelineData={timelineData}
                    isLoading={isTimelineLoading}
                    error={timelineError}
                />
            </div>

            {/* Employee Details Dialog */}
            <EmployeeDetailsDialog
                open={employeeDialogOpen}
                onClose={() => setEmployeeDialogOpen(false)}
                employeeData={employeeData}
            />

            {/* Item Details Dialog */}
            <ItemDetailsDialog
                open={itemDialogOpen}
                onClose={() => setItemDialogOpen(false)}
                itemData={itemData}
            />
        </div>
    );
};

export default Analysis;
