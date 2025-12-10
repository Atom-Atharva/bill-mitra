const steps = [
    {
        number: 1,
        title: 'Register Your Store',
        description: 'Sign up and add your store details. It takes less than 2 minutes to get started.',
        color: 'text-blue-600',
    },
    {
        number: 2,
        title: 'Add Products & Team',
        description: 'Set up your inventory categories and add employees with appropriate permissions.',
        color: 'text-purple-600',
    },
    {
        number: 3,
        title: 'Start Billing',
        description: 'You\'re all set! Generate your first bill and experience seamless billing.',
        color: 'text-pink-600',
    },
]

export function HowItWorksSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-blue-600 to-purple-600 text-white">
            <div className="max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold mb-4" style={{ fontFamily: 'var(--font-header)' }}>
                        Get Started in 3 Simple Steps
                    </h2>
                    <p className="text-xl text-blue-100">
                        From signup to your first bill in under 5 minutes
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {steps.map((step) => (
                        <div key={step.number} className="text-center">
                            <div className={`bg-white ${step.color} w-16 h-16 rounded-full flex items-center justify-center text-2xl font-bold mx-auto mb-6 shadow-xl`}>
                                {step.number}
                            </div>
                            <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                            <p className="text-blue-100">{step.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
