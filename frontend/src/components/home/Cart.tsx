const Cart = () => {
    return (
        <div className="h-screen border-l border-gray-200 w-80 bg-white shadow-lg flex flex-col">
            <div className="p-6 border-b border-gray-200">
                <h2 className="text-2xl font-bold text-gray-800">Cart</h2>
                <p className="text-sm text-gray-600 mt-1">0 items</p>
            </div>
            <div className="flex-1 p-6 overflow-y-auto">
                <div className="flex flex-col items-center justify-center h-full text-gray-400">
                    <svg className="w-16 h-16 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                    <p className="text-center">Your cart is empty</p>
                </div>
            </div>
            <div className="p-6 border-t border-gray-200 bg-gray-50">
                <button className="w-full py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    Checkout
                </button>
            </div>
        </div>
    )
}

export default Cart