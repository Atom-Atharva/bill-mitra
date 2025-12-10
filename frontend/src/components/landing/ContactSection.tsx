import { Receipt, Users, Shield } from 'lucide-react'

const contactMethods = [
    {
        icon: Receipt,
        title: 'Email Us',
        info: 'atharva.sugandhi@gmail.com',
        color: 'bg-blue-100',
        iconColor: 'text-blue-600',
    },
    {
        icon: Users,
        title: 'Live Chat',
        info: 'Available 9 AM - 6 PM',
        color: 'bg-purple-100',
        iconColor: 'text-purple-600',
    },
    {
        icon: Shield,
        title: 'Help Center - LinkedIn',
        info: 'atharva-sugandhi-391a4b225',
        color: 'bg-green-100',
        iconColor: 'text-green-600',
    },
]

export function ContactSection() {
    return (
        <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-purple-50 to-blue-50">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-header)' }}>
                        We'd Love to Hear From You
                    </h2>
                    <p className="text-xl text-gray-600">
                        Have questions or feedback? Get in touch with us
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl p-8 md:p-12">
                    <form className="space-y-6">
                        <div className="grid md:grid-cols-2 gap-6">
                            <div>
                                <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Your Name *
                                </label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="John Doe"
                                />
                            </div>
                            <div>
                                <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                                    Email Address *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                    placeholder="john@example.com"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="business" className="block text-sm font-semibold text-gray-700 mb-2">
                                Business Name (Optional)
                            </label>
                            <input
                                type="text"
                                id="business"
                                name="business"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                                placeholder="Your Store Name"
                            />
                        </div>

                        <div>
                            <label htmlFor="subject" className="block text-sm font-semibold text-gray-700 mb-2">
                                Subject *
                            </label>
                            <select
                                id="subject"
                                name="subject"
                                required
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                            >
                                <option value="">Select a subject</option>
                                <option value="demo">Request a Demo</option>
                                <option value="support">Technical Support</option>
                                <option value="feedback">Product Feedback</option>
                                <option value="pricing">Pricing Inquiry</option>
                                <option value="partnership">Partnership Opportunity</option>
                                <option value="other">Other</option>
                            </select>
                        </div>

                        <div>
                            <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                                Message *
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                rows={6}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition resize-none"
                                placeholder="Tell us how we can help you..."
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
                        >
                            Send Message
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-gray-200">
                        <div className="grid md:grid-cols-3 gap-6 text-center">
                            {contactMethods.map((method, idx) => {
                                const Icon = method.icon
                                return (
                                    <div key={idx}>
                                        <div className={`${method.color} w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3`}>
                                            <Icon className={`h-6 w-6 ${method.iconColor}`} />
                                        </div>
                                        <h4 className="font-semibold text-gray-900 mb-1">{method.title}</h4>
                                        <p className="text-gray-600 text-sm">{method.info}</p>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
