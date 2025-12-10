import { CheckCircle2, Zap, TrendingUp, Users, Shield } from 'lucide-react'

const benefits = [
    {
        title: 'Save Time & Reduce Errors',
        description: 'Eliminate manual calculations and reduce billing errors by up to 95%. Generate accurate bills in under 30 seconds.',
    },
    {
        title: 'Better Team Collaboration',
        description: 'Empower your team with role-based access. Employees can bill while managers oversee operations and analytics.',
    },
    {
        title: 'Grow Without Limits',
        description: 'Start with one store and scale to multiple locations. Our platform grows with your business ambitions.',
    },
    {
        title: 'Make Smarter Decisions',
        description: 'Access real-time sales data and insights. Identify trends, manage inventory, and optimize your business strategy.',
    },
]

const stats = [
    { icon: Zap, value: '10x', label: 'Faster Billing', color: 'text-yellow-500' },
    { icon: TrendingUp, value: '30%', label: 'Revenue Growth', color: 'text-green-500', offset: 'mt-8' },
    { icon: Users, value: '100%', label: 'Team Visibility', color: 'text-blue-500' },
    { icon: Shield, value: '24/7', label: 'Data Security', color: 'text-purple-500', offset: 'mt-8' },
]

export function BenefitsSection() {
    return (
        <section id="benefits" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-gray-50 to-blue-50">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-2 gap-12 items-center">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'var(--font-header)' }}>
                            Why Choose BILLMITRA?
                        </h2>
                        <p className="text-xl text-gray-600 mb-8">
                            Built specifically for Indian retailers and wholesalers, with features that matter most to your business.
                        </p>

                        <div className="space-y-6">
                            {benefits.map((benefit, index) => (
                                <div key={index} className="flex items-start gap-4">
                                    <div className="bg-green-100 p-2 rounded-lg mt-1">
                                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                                        <p className="text-gray-600">{benefit.description}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-6">
                        {stats.map((stat, index) => {
                            const Icon = stat.icon
                            return (
                                <div key={index} className={`bg-white p-6 rounded-xl shadow-lg text-center ${stat.offset || ''}`}>
                                    <Icon className={`h-12 w-12 ${stat.color} mx-auto mb-4`} />
                                    <p className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</p>
                                    <p className="text-gray-600">{stat.label}</p>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        </section>
    )
}
