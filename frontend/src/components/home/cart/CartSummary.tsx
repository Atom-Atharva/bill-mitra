import CircularProgress from "@mui/material/CircularProgress";
import { formatIndianPrice } from "@/utils/formatIndianPrice";

interface CartSummaryProps {
    subtotal: number;
    onPayment: (method: "CASH" | "UPI") => void;
    isProcessing?: boolean;
}

const CartSummary = ({ subtotal, onPayment, isProcessing = false }: CartSummaryProps) => {
    return (
        <div className="border-t-2 border-gray-300 bg-white shadow-inner">
            <div className="p-5 space-y-4">
                <div className="border-t-2 border-dashed border-gray-400 pt-4">
                    <div className="flex items-center justify-between mb-4 bg-gray-50 p-3 rounded-lg">
                        <span className="text-lg font-bold text-gray-700">Subtotal</span>
                        <span className="text-2xl font-bold text-blue-600">₹{formatIndianPrice(subtotal)}</span>
                    </div>
                </div>

                <div className="flex gap-3">
                    <button
                        onClick={() => onPayment("CASH")}
                        disabled={isProcessing}
                        className="flex-1 py-3 bg-linear-to-r from-green-500 to-green-600 text-white rounded-lg font-semibold hover:from-green-600 hover:to-green-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? <CircularProgress size={20} color="inherit" /> : "Cash"}
                    </button>
                    <button
                        onClick={() => onPayment("UPI")}
                        disabled={isProcessing}
                        className="flex-1 py-3 bg-linear-to-r from-blue-500 to-blue-600 text-white rounded-lg font-semibold hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                        {isProcessing ? <CircularProgress size={20} color="inherit" /> : "UPI"}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default CartSummary;
