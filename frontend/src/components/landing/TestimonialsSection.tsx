const testimonials = [
    {
        name: 'Neeraj Kumawat',
        role: 'Electronics Store Owner',
        initial: 'N',
        color: 'bg-blue-600',
        gradientFrom: 'from-blue-50',
        gradientTo: 'to-white',
        borderColor: 'border-blue-100',
        quote: 'BILLMITRA has transformed how we handle billing. The employee management feature is a game-changer. We can now track who\'s generating sales and manage our team much more efficiently!',
    },
    {
        name: 'Chaitali Patidar',
        role: 'Fashion Boutique Manager',
        initial: 'C',
        color: 'bg-purple-600',
        gradientFrom: 'from-purple-50',
        gradientTo: 'to-white',
        borderColor: 'border-purple-100',
        quote: 'As a manager, the analytics dashboard is incredible. I can see exactly what\'s selling, track daily revenue, and make informed decisions. It\'s like having a business consultant 24/7!',
    },
    {
        name: 'Raghav Kanungoo',
        role: 'Grocery Wholesaler',
        initial: 'R',
        color: 'bg-green-600',
        gradientFrom: 'from-green-50',
        gradientTo: 'to-white',
        borderColor: 'border-green-100',
        quote: 'The multi-store feature is perfect for my business! I run 3 stores and can manage all of them from one place. Billing is super fast, and the interface is so easy even my staff learned it in minutes.',
    },
]

export function TestimonialsSection() {
    return (
        <section id="testimonials" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-header)' }}>
                        Trusted by Store Owners
                    </h2>
                    <p className="text-xl text-gray-600">
                        Here's what our early adopters have to say
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`bg-linear-to-br ${testimonial.gradientFrom} ${testimonial.gradientTo} p-8 rounded-xl shadow-lg border ${testimonial.borderColor}`}
                        >
                            <div className="flex items-center mb-6">
                                <div className={`w-12 h-12 ${testimonial.color} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
                                    {testimonial.initial}
                                </div>
                                <div className="ml-4">
                                    <p className="font-bold text-gray-900">{testimonial.name}</p>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </div>
                            <p className="text-gray-700 leading-relaxed italic">
                                "{testimonial.quote}"
                            </p>
                            <div className="mt-4 flex text-yellow-500">
                                ⭐⭐⭐⭐⭐
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
