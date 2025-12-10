interface CartHeaderProps {
    itemCount: number;
    hasItems: boolean;
    onClear: () => void;
}

const CartHeader = ({ itemCount, hasItems, onClear }: CartHeaderProps) => {
    return (
        <div className="p-6 border-b-2 border-gray-200 bg-white">
            <div className="flex items-center justify-between">
                <div>
                    <h2 className="text-2xl font-bold bg-linear-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
                        Cart
                    </h2>
                    <p className="text-sm text-gray-600 mt-1 font-medium">
                        {itemCount} {itemCount === 1 ? 'item' : 'items'}
                    </p>
                </div>
                {hasItems && (
                    <button
                        onClick={onClear}
                        className="text-xs text-gray-400 hover:text-red-600 transition-colors underline"
                        title="Discard all items"
                    >
                        Clear
                    </button>
                )}
            </div>
        </div>
    );
};

export default CartHeader;
