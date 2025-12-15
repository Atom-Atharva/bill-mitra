import axios from "axios";
import { API } from "./apis";

export interface OrderItem {
    itemId: number;
    itemName: string;
    itemQuantity: number;
    itemPrice: number;
    itemImgUrl: string;
}

export interface Order {
    orderId: number;
    paymentMethod: string;
    transactionStatus: string;
    totalAmount: number;
    taxFee: number;
    discount: number;
    createdBy: {
        id: number;
        username: string;
        role: string;
    };
    updatedAt: string;
}

export interface OrderWithItems {
    order: Order;
    items: OrderItem[];
}

interface OrdersResponse {
    message: string;
    orders: OrderWithItems[];
    currentPage: number;
    totalPages: number;
    totalOrders: number;
}

export const fetchOrders = async (
    page: number,
    size: number
): Promise<OrdersResponse> => {
    const response = await axios.get<OrdersResponse>(
        `${API.ORDER.allOrders}?page=${page}&size=${size}`,
        { withCredentials: true }
    );
    return response.data;
};
