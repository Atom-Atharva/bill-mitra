import axios from "axios";
import { API } from "./apis";

export interface OrderItemRequest {
    itemId: number;
    quantity: number;
}

export interface OrderRequest {
    taxFee: number;
    discount: number;
    totalAmount: number;
    paymentMethod: "CASH" | "UPI";
    items: OrderItemRequest[];
}

export interface OrderDto {
    orderId: number;
    paymentMethod: string;
    transactionStatus: string;
    razorPayOrderId?: string;
    razorPayPublicKey?: string;
    totalAmount: number;
}

export interface OrderResponse {
    order: OrderDto;
    message: string;
}

export const placeOrder = async (
    orderRequest: OrderRequest
): Promise<OrderResponse> => {
    try {
        const response = await axios.post<OrderResponse>(
            API.ORDER.placeOrder,
            orderRequest,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error placing order:", error);
        throw error;
    }
};
