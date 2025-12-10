import { Link } from '@tanstack/react-router'
import { Store, TrendingUp, Receipt, Users } from 'lucide-react'

export function HeroSection() {
    return (
        <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-50 via-white to-purple-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-header)' }}>
                            Simplify Your Billing,
                            <span className="text-blue-600"> Amplify Your Business</span>
                        </h1>
                        <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                            The complete billing solution for retailers and wholesalers. Manage multiple stores,
                            employees, inventory, and generate professional bills in seconds.
                        </p>
                        <div className="flex flex-col sm:flex-row gap-4">
                            <Link
                                to="/auth/register"
                                className="bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-center text-lg shadow-lg hover:shadow-xl"
                            >
                                Register Your Store
                            </Link>
                            <a
                                href="#features"
                                className="border-2 border-blue-600 text-blue-600 px-8 py-4 rounded-lg hover:bg-blue-50 transition font-semibold text-center text-lg"
                            >
                                Learn More
                            </a>
                        </div>
                        <div className="mt-8 flex items-center gap-8">
                            <div>
                                <p className="text-3xl font-bold text-gray-900">500+</p>
                                <p className="text-gray-600">Active Stores</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">10K+</p>
                                <p className="text-gray-600">Bills Generated</p>
                            </div>
                            <div>
                                <p className="text-3xl font-bold text-gray-900">99.9%</p>
                                <p className="text-gray-600">Uptime</p>
                            </div>
                        </div>
                    </div>
                    <div className="relative">
                        <div className="bg-linear-to-br from-blue-600 to-purple-600 rounded-2xl p-8 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                            <div className="bg-white rounded-lg p-6 transform -rotate-3">
                                <div className="space-y-4">
                                    <div className="flex items-center justify-between border-b pb-4">
                                        <span className="text-gray-600">Store Dashboard</span>
                                        <Store className="h-6 w-6 text-blue-600" />
                                    </div>
                                    <div className="space-y-3">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-green-100 p-2 rounded">
                                                <TrendingUp className="h-5 w-5 text-green-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Today's Sales</p>
                                                <p className="text-xl font-bold">₹45,280</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-blue-100 p-2 rounded">
                                                <Receipt className="h-5 w-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Bills Generated</p>
                                                <p className="text-xl font-bold">127</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="bg-purple-100 p-2 rounded">
                                                <Users className="h-5 w-5 text-purple-600" />
                                            </div>
                                            <div>
                                                <p className="text-sm text-gray-600">Active Employees</p>
                                                <p className="text-xl font-bold">8</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
