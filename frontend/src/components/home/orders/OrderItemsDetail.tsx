import React from 'react';
import { formatIndianPrice } from '@/utils/formatIndianPrice';
import type { OrderWithItems } from '@/apis/fetchOrders';

interface OrderItemsDetailProps {
    orderData: OrderWithItems;
}

const OrderItemsDetail: React.FC<OrderItemsDetailProps> = ({ orderData }) => {
    return (
        <div className="px-6 pb-6 bg-gray-50">
            <div className="bg-white rounded-lg p-4 border border-gray-200">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Items</h3>
                <div className="space-y-3">
                    {orderData.items.map((item, index) => (
                        <div key={index} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg">
                            <img
                                src={item.itemImgUrl}
                                alt={item.itemName}
                                className="w-16 h-16 object-cover rounded-lg"
                            />
                            <div className="flex-1">
                                <p className="font-semibold text-gray-800">{item.itemName}</p>
                                <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                                    <span>Qty: {item.itemQuantity}</span>
                                    <span>Price: {formatIndianPrice(item.itemPrice)}</span>
                                    <span className="font-semibold text-gray-800">
                                        Total: {formatIndianPrice(item.itemPrice * item.itemQuantity)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                    <div className="space-y-2 text-sm">
                        {orderData.order.taxFee > 0 && (
                            <div className="flex justify-between">
                                <span className="text-gray-600">Tax Fee:</span>
                                <span className="font-semibold">{formatIndianPrice(orderData.order.taxFee)}</span>
                            </div>
                        )}
                        {orderData.order.discount > 0 && (
                            <div className="flex justify-between text-green-600">
                                <span>Discount:</span>
                                <span className="font-semibold">-{formatIndianPrice(orderData.order.discount)}</span>
                            </div>
                        )}
                        <div className="flex justify-between text-lg font-bold border-t pt-2">
                            <span>Total Amount:</span>
                            <span>{formatIndianPrice(orderData.order.totalAmount)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderItemsDetail;
