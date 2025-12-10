import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import type { RootState } from "@/store/store";
import { removeFromCart, updateQuantity, clearCart } from "@/store/cartSlice";
import CartItem from "./cart/CartItem";
import CartSummary from "./cart/CartSummary";
import { generateReceipt } from "./cart/generateReceipt";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";
import WarningAmberIcon from "@mui/icons-material/WarningAmber";

const Cart = () => {
    const dispatch = useDispatch();
    const cartItems = useSelector((state: RootState) => state.cart.items);

    const [paymentMethod, setPaymentMethod] = useState<"CASH" | "UPI" | null>(null);
    const [showDiscardDialog, setShowDiscardDialog] = useState(false);

    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const itemCount = cartItems.reduce((sum, item) => sum + item.quantity, 0);

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
        // TODO: Implement payment API call
        setPaymentMethod(method);
        console.log("Payment with method:", method);
    };

    const handlePrintReceipt = () => {
        generateReceipt(cartItems, subtotal, itemCount, paymentMethod);
    };

    const handleDiscardAll = () => {
        dispatch(clearCart());
        setPaymentMethod(null);
        setShowDiscardDialog(false);
    };

    return (
        <div className="h-screen border-l border-gray-200 w-1/4 bg-linear-to-b from-gray-50 to-white shadow-xl flex flex-col">
            <div className="p-6 border-b-2 border-gray-200 bg-white">
                <div className="flex items-center justify-between">
                    <div>
                        <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">Cart</h2>
                        <p className="text-sm text-gray-600 mt-1 font-medium">{itemCount} {itemCount === 1 ? 'item' : 'items'}</p>
                    </div>
                    {cartItems.length > 0 && (
                        <button
                            onClick={() => setShowDiscardDialog(true)}
                            className="text-xs text-gray-400 hover:text-red-600 transition-colors underline"
                            title="Discard all items"
                        >
                            Clear
                        </button>
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-gray-400 p-6">
                        <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                        <p className="text-center">Your cart is empty</p>
                    </div>
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
                    onPrintReceipt={handlePrintReceipt}
                />
            )}

            <Dialog open={showDiscardDialog} onClose={() => setShowDiscardDialog(false)}>
                <DialogTitle className="flex items-center gap-2">
                    <WarningAmberIcon className="text-orange-500" />
                    Discard All Items?
                </DialogTitle>
                <DialogContent>
                    Are you sure you want to remove all items from the cart? This action cannot be undone.
                </DialogContent>
                <DialogActions className='m-2'>
                    <Button onClick={() => setShowDiscardDialog(false)} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleDiscardAll} color="error" variant="contained">
                        Discard All
                    </Button>
                </DialogActions>
            </Dialog>
        </div>
    )
}

export default Cart