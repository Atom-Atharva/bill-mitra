import React from 'react';
import { formatIndianPrice } from '@/utils/formatIndianPrice';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import IconButton from '@mui/material/IconButton';
import Collapse from '@mui/material/Collapse';
import type { OrderWithItems } from '@/apis/fetchOrders';
import OrderItemsDetail from './OrderItemsDetail';

interface OrderCardProps {
    orderData: OrderWithItems;
    isExpanded: boolean;
    onExpandClick: () => void;
}

const OrderCard: React.FC<OrderCardProps> = ({ orderData, isExpanded, onExpandClick }) => {
    return (
        <div className="hover:bg-gray-50 transition-colors">
            {/* Order Header */}
            <div className="p-6 cursor-pointer" onClick={onExpandClick}>
                <div className="flex items-center justify-between">
                    <div className="flex-1">
                        <div className="flex items-center gap-4 mb-3">
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-semibold text-gray-500">Order #</span>
                                <span className="text-xl font-bold text-gray-800">{orderData.order.orderId}</span>
                            </div>
                            <span className={`px-3 py-1 rounded-full text-xs font-semibold ${orderData.order.transactionStatus === 'SUCCESS'
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                {orderData.order.transactionStatus}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-blue-100 text-blue-700">
                                {orderData.order.paymentMethod}
                            </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                            <div>
                                <p className="text-gray-500 mb-1">Total Amount</p>
                                <p className="font-semibold text-gray-800">{formatIndianPrice(orderData.order.totalAmount)}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Created By</p>
                                <p className="font-semibold text-gray-800">{orderData.order.createdBy.username}</p>
                                <p className="text-xs text-gray-500">{orderData.order.createdBy.role}</p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Date</p>
                                <p className="font-semibold text-gray-800">
                                    {new Date(orderData.order.updatedAt).toLocaleDateString('en-IN', {
                                        day: 'numeric',
                                        month: 'short',
                                        year: 'numeric'
                                    })}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {new Date(orderData.order.updatedAt).toLocaleTimeString('en-IN', {
                                        hour: '2-digit',
                                        minute: '2-digit'
                                    })}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500 mb-1">Items</p>
                                <p className="font-semibold text-gray-800">{orderData.items.length} item(s)</p>
                            </div>
                        </div>
                    </div>

                    <IconButton>
                        {isExpanded ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                </div>
            </div>

            {/* Order Items */}
            <Collapse in={isExpanded} timeout="auto" unmountOnExit>
                <OrderItemsDetail orderData={orderData} />
            </Collapse>
        </div>
    );
};

export default OrderCard;
