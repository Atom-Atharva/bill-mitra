import { Link } from '@tanstack/react-router'
import { Menu, X } from 'lucide-react'
import { useState } from 'react'

export function NavigationBar() {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    return (
        <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-sm shadow-sm z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    <div className="flex items-center">
                        <img src="/favicon-32x32.png" alt="BILLMITRA Logo" className="h-8 w-8" />
                        <span className="ml-2 text-2xl font-bold text-gray-900" style={{ fontFamily: 'var(--font-header)' }}>
                            BILLMITRA
                        </span>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center space-x-8">
                        <a href="#features" className="text-gray-700 hover:text-blue-600 transition">Features</a>
                        <a href="#benefits" className="text-gray-700 hover:text-blue-600 transition">Benefits</a>
                        <a href="#demo" className="text-gray-700 hover:text-blue-600 transition">Demo</a>
                        <a href="#testimonials" className="text-gray-700 hover:text-blue-600 transition">Testimonials</a>
                        <a href="#faq" className="text-gray-700 hover:text-blue-600 transition">FAQ</a>
                        <Link
                            to="/auth/login"
                            className="text-gray-700 hover:text-blue-600 transition font-medium"
                        >
                            Login
                        </Link>
                        <Link
                            to="/auth/register"
                            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                        >
                            Get Started
                        </Link>
                    </div>

                    {/* Mobile menu button */}
                    <button
                        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        className="md:hidden p-2"
                    >
                        {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                    </button>
                </div>

                {/* Mobile Navigation */}
                {mobileMenuOpen && (
                    <div className="md:hidden py-4 space-y-3">
                        <a href="#features" className="block text-gray-700 hover:text-blue-600 transition">Features</a>
                        <a href="#benefits" className="block text-gray-700 hover:text-blue-600 transition">Benefits</a>
                        <a href="#demo" className="block text-gray-700 hover:text-blue-600 transition">Demo</a>
                        <a href="#testimonials" className="block text-gray-700 hover:text-blue-600 transition">Testimonials</a>
                        <a href="#faq" className="block text-gray-700 hover:text-blue-600 transition">FAQ</a>
                        <Link to="/auth/login" className="block text-gray-700 hover:text-blue-600 transition font-medium">
                            Login
                        </Link>
                        <Link
                            to="/auth/register"
                            className="block bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium text-center"
                        >
                            Get Started
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    )
}
