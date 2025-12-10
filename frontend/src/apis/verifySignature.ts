import axios from "axios";
import { API } from "./apis";

export interface PaymentRequest {
    razorPayPaymentId: string;
    transactionId: string;
    razorPaySignature: string;
}

export interface MessageResponse {
    message: string;
}

export const verifySignature = async (
    paymentRequest: PaymentRequest
): Promise<MessageResponse> => {
    try {
        const response = await axios.post<MessageResponse>(
            API.ORDER.verifySignature,
            paymentRequest,
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error verifying signature:", error);
        throw error;
    }
};
