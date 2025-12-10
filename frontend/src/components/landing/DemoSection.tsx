import { Link } from '@tanstack/react-router'
import { Menu, Store, ShoppingCart, Search, X } from 'lucide-react'
import { useState } from 'react'

const DEMO_TABS = {
    STORE: 'STORE',
    CART: 'CART',
} as const

type DemoTabTypes = keyof typeof DEMO_TABS

const products = [
    { name: 'Wireless Mouse', price: '₹450', color: 'bg-blue-100' },
    { name: 'USB Cable', price: '₹150', color: 'bg-green-100' },
    { name: 'Notebook Set', price: '₹280', color: 'bg-purple-100' },
    { name: 'Pen Drive 32GB', price: '₹520', color: 'bg-orange-100' },
    { name: 'Keyboard', price: '₹890', color: 'bg-pink-100' },
    { name: 'Headphones', price: '₹1,200', color: 'bg-indigo-100' },
]

const cartItems = [
    { name: 'Wireless Mouse', quantity: 1, price: '₹450', color: 'bg-blue-100' },
    { name: 'Notebook Set', quantity: 1, price: '₹280', color: 'bg-purple-100' },
]

export function DemoSection() {
    const [activeDemoTab, setActiveDemoTab] = useState<DemoTabTypes>(DEMO_TABS.STORE)

    return (
        <section id="demo" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-header)' }}>
                        See BILLMITRA in Action
                    </h2>
                    <p className="text-xl text-gray-600">
                        Experience the power and simplicity of our billing platform
                    </p>
                </div>

                {/* Interactive Demo with Sidebar, Store, and Cart */}
                <div className="bg-gray-50 rounded-2xl shadow-2xl overflow-hidden border-2 border-gray-200 max-w-7xl mx-auto">
                    {/* Mock Browser Bar */}
                    <div className="bg-gray-800 px-4 py-3 flex items-center gap-3">
                        <div className="flex gap-2">
                            <div className="w-3 h-3 rounded-full bg-red-500"></div>
                            <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                            <div className="w-3 h-3 rounded-full bg-green-500"></div>
                        </div>
                        <div className="flex-1 bg-gray-700 rounded px-4 py-1.5 text-sm text-gray-300">
                            billmitra.app/home
                        </div>
                    </div>

                    {/* Main Demo Content: Sidebar | Store | Cart */}
                    <div className="flex h-[600px]">
                        {/* Sidebar */}
                        <div className="w-20 bg-linear-to-b from-gray-100 to-white border-r border-gray-300 flex flex-col justify-between shrink-0">
                            <div>
                                <div className="flex items-center justify-center p-4 border-b border-gray-300 bg-blue-50">
                                    <Menu className="h-6 w-6 text-gray-700" />
                                </div>
                                <div className="flex flex-col mt-4 px-2 gap-2">
                                    <div
                                        className={`flex items-center justify-center cursor-pointer p-3 rounded-lg transition-all ${activeDemoTab === DEMO_TABS.STORE ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                                        onClick={() => setActiveDemoTab(DEMO_TABS.STORE)}
                                    >
                                        <Store className={`h-6 w-6 ${activeDemoTab === DEMO_TABS.STORE ? 'text-blue-600' : 'text-gray-600'}`} />
                                    </div>
                                    <div
                                        className={`flex items-center justify-center cursor-pointer p-3 rounded-lg transition-all ${activeDemoTab === DEMO_TABS.CART ? 'bg-blue-100' : 'hover:bg-gray-200'}`}
                                        onClick={() => setActiveDemoTab(DEMO_TABS.CART)}
                                    >
                                        <ShoppingCart className={`h-6 w-6 ${activeDemoTab === DEMO_TABS.CART ? 'text-blue-600' : 'text-gray-600'}`} />
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Store Section */}
                        <div className="flex-1 bg-white overflow-y-auto border-r border-gray-200">
                            <div className="p-6">
                                <div className="flex justify-between items-center mb-6">
                                    <h3 className="text-2xl font-bold text-gray-900">Store</h3>
                                    <div className="flex gap-2">
                                        <div className="px-3 py-1 bg-blue-100 text-blue-600 rounded-lg text-sm font-medium">Store</div>
                                        <div className="px-3 py-1 bg-gray-200 text-gray-600 rounded-lg text-sm">Cart (2)</div>
                                    </div>
                                </div>

                                {/* Search and Filter */}
                                <div className="mb-6 flex gap-4">
                                    <div className="flex-1 border-2 border-gray-300 rounded-lg px-4 py-3 flex items-center gap-3">
                                        <Search className="h-5 w-5 text-gray-400" />
                                        <span className="text-gray-400">Search products...</span>
                                    </div>
                                    <select className="border-2 border-gray-300 rounded-lg px-4 py-3 text-gray-600 font-medium">
                                        <option>All Categories</option>
                                    </select>
                                </div>

                                {/* Categories */}
                                <div className="mb-6">
                                    <h4 className="text-lg font-bold text-gray-900 mb-4">Categories</h4>
                                    <div className="flex gap-3 overflow-x-auto pb-2">
                                        <div className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium whitespace-nowrap">All Items</div>
                                        <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">Electronics</div>
                                        <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">Groceries</div>
                                        <div className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm font-medium whitespace-nowrap">Fashion</div>
                                    </div>
                                </div>

                                {/* Product Grid */}
                                <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                                    {products.map((product, idx) => (
                                        <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition cursor-pointer">
                                            <div className={`${product.color} h-28 rounded-lg mb-3`}></div>
                                            <p className="font-semibold text-gray-900 mb-1 text-sm">{product.name}</p>
                                            <p className="text-blue-600 font-bold">{product.price}</p>
                                            <button className="w-full mt-2 bg-blue-600 text-white py-2 rounded-lg text-xs font-medium hover:bg-blue-700 transition">
                                                Add to Cart
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Cart Section - Right Side */}
                        <div className="w-80 bg-gray-50 overflow-y-auto shrink-0">
                            <div className="p-6">
                                <h3 className="text-xl font-bold text-gray-900 mb-6">Shopping Cart</h3>

                                {/* Cart Items */}
                                <div className="space-y-3 mb-6">
                                    {cartItems.map((item, idx) => (
                                        <div key={idx} className="bg-white border border-gray-200 rounded-lg p-3">
                                            <div className="flex items-center gap-3 mb-2">
                                                <div className={`${item.color} w-16 h-16 rounded-lg shrink-0`}></div>
                                                <div className="flex-1 min-w-0">
                                                    <h4 className="font-semibold text-gray-900 text-sm truncate">{item.name}</h4>
                                                    <p className="text-gray-600 text-xs">Qty: {item.quantity}</p>
                                                    <p className="text-blue-600 font-bold text-sm">{item.price}</p>
                                                </div>
                                                <button className="text-red-500 hover:text-red-700">
                                                    <X className="h-4 w-4" />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Cart Summary */}
                                <div className="border-t-2 border-gray-300 pt-4">
                                    <div className="bg-white rounded-lg p-4 space-y-2 mb-4">
                                        <div className="flex justify-between text-gray-700 text-sm">
                                            <span>Subtotal</span>
                                            <span className="font-semibold">₹730</span>
                                        </div>
                                        <div className="flex justify-between text-gray-700 text-sm">
                                            <span>Tax (18%)</span>
                                            <span className="font-semibold">₹131</span>
                                        </div>
                                        <div className="border-t pt-2 flex justify-between text-lg font-bold text-gray-900">
                                            <span>Total</span>
                                            <span className="text-blue-600">₹861</span>
                                        </div>
                                    </div>

                                    <div className="space-y-2">
                                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-sm">
                                            Checkout
                                        </button>
                                        <button className="w-full border-2 border-gray-300 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-100 transition text-sm">
                                            Clear Cart
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 text-center">
                    <Link
                        to="/auth/register"
                        className="inline-block bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg"
                    >
                        Try It Free Now →
                    </Link>
                </div>
            </div>
        </section>
    )
}
