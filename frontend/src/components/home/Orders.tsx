import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchOrders, type OrderWithItems } from '@/apis/fetchOrders';
import CircularProgress from '@mui/material/CircularProgress';
import OrderStats from './orders/OrderStats';
import OrderCard from './orders/OrderCard';
import OrdersPagination from './orders/OrdersPagination';

const Orders: React.FC = () => {
    const [page, setPage] = useState(0);
    const [size] = useState(10);
    const [expandedOrderId, setExpandedOrderId] = useState<number | null>(null);

    const { data, isLoading, isError } = useQuery({
        queryKey: ['orders', page, size],
        queryFn: () => fetchOrders(page, size),
    });

    const handleExpandClick = (orderId: number) => {
        setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
    };

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
                    <p className="text-red-600 text-xl font-semibold">Failed to load orders</p>
                    <p className="text-gray-600 mt-2">Please try again later</p>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full w-full overflow-y-auto bg-gray-50">
            <div className="p-6">
                <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-800">Orders Management</h1>
                    <p className="text-gray-600 mt-2">View and manage all store orders</p>
                </div>

                {/* Stats Cards */}
                <OrderStats
                    totalOrders={data?.totalOrders || 0}
                    currentPage={data?.currentPage || 0}
                    totalPages={data?.totalPages || 0}
                />

                {/* Orders List */}
                <div className="bg-white rounded-xl shadow-lg border border-gray-200">
                    {data?.orders && data.orders.length > 0 ? (
                        <div className="divide-y divide-gray-200">
                            {data.orders.map((orderData: OrderWithItems) => (
                                <OrderCard
                                    key={orderData.order.orderId}
                                    orderData={orderData}
                                    isExpanded={expandedOrderId === orderData.order.orderId}
                                    onExpandClick={() => handleExpandClick(orderData.order.orderId)}
                                />
                            ))}
                        </div>
                    ) : (
                        <div className="p-12 text-center">
                            <p className="text-gray-500 text-lg">No orders found</p>
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <OrdersPagination
                    currentPage={page}
                    totalPages={data?.totalPages || 0}
                    onPageChange={setPage}
                />
            </div>
        </div>
    );
};

export default Orders;
