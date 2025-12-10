import type { OrderResponse } from "@/apis/placeOrder";
import { verifySignature, type PaymentRequest } from "@/apis/verifySignature";

interface UseRazorpayPaymentProps {
    onSuccess: () => void;
    onFailure: () => void;
}

export const useRazorpayPayment = ({
    onSuccess,
    onFailure,
}: UseRazorpayPaymentProps) => {
    const handleRazorpayPayment = (orderData: OrderResponse) => {
        const options = {
            key: orderData.order.razorPayPublicKey,
            amount: orderData.order.totalAmount * 100, // Convert to paise
            currency: "INR",
            name: "BillMitra",
            description: `Order #${orderData.order.orderId}`,
            order_id: orderData.order.razorPayOrderId,
            handler: async (response: any) => {
                // Payment successful - verify signature
                const paymentRequest: PaymentRequest = {
                    razorPayPaymentId: response.razorpay_payment_id,
                    transactionId: orderData.order.razorPayOrderId!,
                    razorPaySignature: response.razorpay_signature,
                };

                try {
                    await verifySignature(paymentRequest);
                    // Signature verified successfully
                    onSuccess();
                } catch (error) {
                    console.error("Signature verification failed:", error);
                    onFailure();
                }
            },
            modal: {
                ondismiss: () => {
                    // User closed the payment modal
                    onFailure();
                },
            },
            theme: {
                color: "#9333ea", // Purple theme
            },
        };

        const razorpay = new window.Razorpay(options);
        razorpay.open();
    };

    return { handleRazorpayPayment };
};
