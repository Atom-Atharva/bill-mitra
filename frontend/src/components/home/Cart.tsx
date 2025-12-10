import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";
import CartItem from "./cart/CartItem";
import CartSummary from "./cart/CartSummary";
import CartHeader from "./cart/CartHeader";
import EmptyCart from "./cart/EmptyCart";
import DiscardDialog from "./cart/DiscardDialog";
import PaymentStatusDialog from "./cart/PaymentStatusDialog";
import { generateReceipt } from "./cart/generateReceipt";
import { type OrderRequest } from "@/apis/placeOrder";
import { useOrderPlacement } from "./cart/hooks/useOrderPlacement";
import { useRazorpayPayment } from "./cart/hooks/useRazorpayPayment";

// Extend Window interface to include Razorpay
declare global {
    interface Window {
        Razorpay: any;
    }
}

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [transactionStatus, setTransactionStatus] = useState<"PENDING" | "SUCCESS" | "CANCEL" | null>(null);
    const [paymentMethod, setPaymentMethod] = useState<"CASH" | "UPI" | null>(null);
    const [showDiscardDialog, setShowDiscardDialog] = useState(false);
    const [showPaymentDialog, setShowPaymentDialog] = useState(false);
    const [currentOrderId, setCurrentOrderId] = useState<number | null>(null);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

    // Razorpay payment hook
    const { handleRazorpayPayment } = useRazorpayPayment({
        onSuccess: () => {
            setTransactionStatus("SUCCESS");
            setShowPaymentDialog(true);
        },
        onFailure: () => {
            setTransactionStatus("CANCEL");
            setShowPaymentDialog(true);
        },
    });

    // Order placement hook
    const { placeNewOrder, isProcessing } = useOrderPlacement({
        onSuccess: (data) => {
            setCurrentOrderId(data.order.orderId);
            setTransactionStatus(data.order.transactionStatus as "PENDING" | "SUCCESS" | "CANCEL");

            if (data.order.transactionStatus === "SUCCESS") {
                // Payment successful (CASH payment)
                setShowPaymentDialog(true);
            } else if (data.order.transactionStatus === "PENDING" && data.order.razorPayOrderId) {
                // UPI payment - open Razorpay
                handleRazorpayPayment(data);
            }
        },
        onError: () => {
            setTransactionStatus("CANCEL");
            setShowPaymentDialog(true);
        },
    });

    const handleRemoveItem = (id: number) => {
        dispatch(removeFromCart(id));
    };

    const handleIncreaseQuantity = (id: number) => {
        const item = cartItems.find(i => i.id === id);
        if (item) {
            dispatch(updateQuantity({ id, quantity: item.quantity + 1 }));
        }
    };

    const handleDecreaseQuantity = (id: number) => {
        const item = cartItems.find(i => i.id === id);
        if (item && item.quantity > 1) {
            dispatch(updateQuantity({ id, quantity: item.quantity - 1 }));
        }
    };

    const handlePayment = (method: "CASH" | "UPI") => {
        setPaymentMethod(method);

        // Prepare order request
        const orderRequest: OrderRequest = {
            taxFee: 0,
            discount: 0,
            totalAmount: subtotal,
            paymentMethod: method,
            items: cartItems.map(item => ({
                itemId: item.id,
                quantity: item.quantity,
            })),
        };

        // Place order
        placeNewOrder(orderRequest);
    };

    const handlePrintReceipt = () => {
        if (transactionStatus !== "SUCCESS") {
            return; // Don't allow printing if transaction not successful
        }
        generateReceipt(cartItems, subtotal, itemCount, paymentMethod);
    };

    const handleDiscardAll = () => {
        dispatch(clearCart());
        setPaymentMethod(null);
        setTransactionStatus(null);
        setCurrentOrderId(null);
        setShowDiscardDialog(false);
    };

    const handleClosePaymentDialog = () => {
        setShowPaymentDialog(false);
        if (transactionStatus === "SUCCESS") {
            // Clear cart after successful payment
            dispatch(clearCart());
            setPaymentMethod(null);
            setTransactionStatus(null);
            setCurrentOrderId(null);
        }
    };

    return (
        <div className="h-screen border-l border-gray-200 w-1/4 bg-linear-to-b from-gray-50 to-white shadow-xl flex flex-col">
            <CartHeader
                itemCount={itemCount}
                hasItems={cartItems.length > 0}
                onClear={() => setShowDiscardDialog(true)}
            />

            <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                    <EmptyCart />
                ) : (
                    <div className="p-4 space-y-3">
                        {cartItems.map((item) => (
                            <CartItem
                                key={item.id}
                                item={item}
                                onRemove={handleRemoveItem}
                                onIncrease={handleIncreaseQuantity}
                                onDecrease={handleDecreaseQuantity}
                            />
                        ))}
                    </div>
                )}
            </div>

            {cartItems.length > 0 && (
                <CartSummary
                    subtotal={subtotal}
                    onPayment={handlePayment}
                    isProcessing={isProcessing}
                />
            )}

            <DiscardDialog
                open={showDiscardDialog}
                onClose={() => setShowDiscardDialog(false)}
                onConfirm={handleDiscardAll}
            />

            <PaymentStatusDialog
                open={showPaymentDialog}
                onClose={handleClosePaymentDialog}
                isProcessing={isProcessing}
                transactionStatus={transactionStatus}
                orderId={currentOrderId}
                paymentMethod={paymentMethod}
                onPrintReceipt={handlePrintReceipt}
            />
        </div>
    )
}

export default Cart