import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import { formatIndianPrice } from "@/utils/formatIndianPrice";

interface CartItemProps {
    item: {
        id: number;
        name: string;
        price: number;
        quantity: number;
    };
    onRemove: (id: number) => void;
    onIncrease: (id: number) => void;
    onDecrease: (id: number) => void;
}

const CartItem = ({ item, onRemove, onIncrease, onDecrease }: CartItemProps) => {
    return (
        <div className="bg-white rounded-lg p-3 shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between w-full">
                <div className="flex-1">
                    <div className="flex items-start justify-between mb-3">
                        <div>
                            <h3 className="font-semibold text-gray-800">{item.name}</h3>
                            <p className="text-xs text-gray-500 mt-1">₹{formatIndianPrice(item.price)} each</p>
                        </div>
                        <button
                            onClick={() => onRemove(item.id)}
                            className="text-red-500 hover:text-red-700 hover:bg-red-50 rounded p-1 transition-all ml-2"
                            title="Remove item"
                        >
                            <DeleteIcon fontSize="small" />
                        </button>
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <button
                                onClick={() => onDecrease(item.id)}
                                className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 border border-gray-300 rounded-md transition-colors"
                                title="Decrease quantity"
                            >
                                <RemoveIcon fontSize="small" />
                            </button>
                            <span className="text-sm font-semibold text-gray-700 min-w-8 text-center bg-gray-50 px-2 py-1 rounded">
                                {item.quantity}
                            </span>
                            <button
                                onClick={() => onIncrease(item.id)}
                                className="w-7 h-7 flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white rounded-md shadow-sm transition-all"
                                title="Increase quantity"
                            >
                                <AddIcon fontSize="small" />
                            </button>
                        </div>
                        <div className="text-right">
                            <span className="text-lg font-bold text-gray-900">₹{formatIndianPrice(item.price * item.quantity)}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartItem;
