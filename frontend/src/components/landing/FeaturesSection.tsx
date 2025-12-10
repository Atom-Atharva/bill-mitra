import { Receipt, Users, ShoppingCart, BarChart3, Store, Shield } from 'lucide-react'

const features = [
    {
        icon: Receipt,
        title: 'Quick Billing',
        description: 'Generate professional bills in seconds with our intuitive interface. Support for multiple payment methods including cash and digital payments.',
        colorFrom: 'from-blue-50',
        colorTo: 'to-white',
        borderColor: 'border-blue-100',
        bgColor: 'bg-blue-600',
    },
    {
        icon: Users,
        title: 'Employee Management',
        description: 'Create employee and manager accounts with different permission levels. Track performance and manage roles effortlessly.',
        colorFrom: 'from-purple-50',
        colorTo: 'to-white',
        borderColor: 'border-purple-100',
        bgColor: 'bg-purple-600',
    },
    {
        icon: ShoppingCart,
        title: 'Inventory Control',
        description: 'Manage your products and categories with ease. Real-time inventory tracking keeps you always in control of your stock.',
        colorFrom: 'from-green-50',
        colorTo: 'to-white',
        borderColor: 'border-green-100',
        bgColor: 'bg-green-600',
    },
    {
        icon: BarChart3,
        title: 'Sales Analytics',
        description: 'Powerful analytics dashboard for managers to track sales, audit expenses, and make data-driven decisions for growth.',
        colorFrom: 'from-orange-50',
        colorTo: 'to-white',
        borderColor: 'border-orange-100',
        bgColor: 'bg-orange-600',
    },
    {
        icon: Store,
        title: 'Multi-Store Support',
        description: 'Register and manage multiple stores from a single account. Perfect for businesses with multiple locations.',
        colorFrom: 'from-pink-50',
        colorTo: 'to-white',
        borderColor: 'border-pink-100',
        bgColor: 'bg-pink-600',
    },
    {
        icon: Shield,
        title: 'Secure & Reliable',
        description: 'Bank-grade security with encrypted data storage. Your business data is always safe and accessible only to you.',
        colorFrom: 'from-indigo-50',
        colorTo: 'to-white',
        borderColor: 'border-indigo-100',
        bgColor: 'bg-indigo-600',
    },
]

export function FeaturesSection() {
    return (
        <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-header)' }}>
                        Everything You Need to Run Your Store
                    </h2>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                        Powerful features designed to streamline your billing process and boost productivity
                    </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div
                                key={index}
                                className={`bg-linear-to-br ${feature.colorFrom} ${feature.colorTo} p-8 rounded-xl shadow-lg hover:shadow-2xl transition border ${feature.borderColor}`}
                            >
                                <div className={`${feature.bgColor} w-14 h-14 rounded-lg flex items-center justify-center mb-6`}>
                                    <Icon className="h-7 w-7 text-white" />
                                </div>
                                <h3 className="text-2xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                                <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
