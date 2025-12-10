import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

const faqs = [
    {
        question: 'What types of businesses can use BILLMITRA?',
        answer: 'BILLMITRA is perfect for all types of retail and wholesale businesses including grocery stores, electronics shops, fashion boutiques, hardware stores, and more. If you need to generate bills and manage inventory, BILLMITRA is built for you.',
    },
    {
        question: 'Can I manage multiple stores with one account?',
        answer: 'Yes! BILLMITRA supports multi-store management from a single account. You can register and manage multiple store locations, each with its own inventory, employees, and sales tracking.',
    },
    {
        question: 'How does employee management work?',
        answer: 'You can create employee accounts with different permission levels. Regular employees can generate bills and manage inventory, while managers get additional access to sales analytics, reports, and the ability to manage other employees. This ensures proper accountability and security.',
    },
    {
        question: 'Is my business data secure?',
        answer: 'Absolutely! We use bank-grade encryption to protect your data. All information is stored securely and is only accessible to you and authorized members of your team. We maintain 99.9% uptime and regular backups.',
    },
    {
        question: 'What payment methods are supported for billing?',
        answer: 'BILLMITRA supports both cash and digital payments. We integrate with Razorpay for seamless online payment collection, including UPI, cards, and net banking. You can mark transactions as cash or digital.',
    },
    {
        question: 'Do I need any special hardware or equipment?',
        answer: 'No special hardware needed! BILLMITRA is a web-based application that works on any device with an internet connection - computers, tablets, or smartphones. Just open your browser and start billing.',
    },
]

export function FAQSection() {
    const [openFaq, setOpenFaq] = useState<number | null>(null)

    const toggleFaq = (index: number) => {
        setOpenFaq(openFaq === index ? null : index)
    }

    return (
        <section id="faq" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
            <div className="max-w-4xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-header)' }}>
                        Frequently Asked Questions
                    </h2>
                    <p className="text-xl text-gray-600">
                        Everything you need to know about BILLMITRA
                    </p>
                </div>

                <div className="space-y-4">
                    {faqs.map((faq, index) => (
                        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
                            <button
                                onClick={() => toggleFaq(index)}
                                className="w-full flex items-center justify-between p-6 bg-white hover:bg-gray-50 transition"
                            >
                                <span className="text-lg font-semibold text-gray-900 text-left">
                                    {faq.question}
                                </span>
                                <ChevronDown className={`h-5 w-5 text-gray-600 transition-transform ${openFaq === index ? 'rotate-180' : ''}`} />
                            </button>
                            {openFaq === index && (
                                <div className="p-6 bg-gray-50 border-t">
                                    <p className="text-gray-700">{faq.answer}</p>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
