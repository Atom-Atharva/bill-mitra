import { Link } from '@tanstack/react-router'

export function CTASection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-r from-blue-600 to-purple-600 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl md:text-5xl font-bold mb-6" style={{ fontFamily: 'var(--font-header)' }}>
                    Ready to Transform Your Billing?
                </h2>
                <p className="text-xl mb-8 text-blue-100">
                    Join hundreds of store owners who've already made the switch to smarter billing
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Link
                        to="/auth/register"
                        className="bg-white text-blue-600 px-8 py-4 rounded-lg hover:bg-gray-100 transition font-semibold text-lg shadow-xl inline-block"
                    >
                        Register Your Store Now
                    </Link>
                    <Link
                        to="/auth/login"
                        className="border-2 border-white text-white px-8 py-4 rounded-lg hover:bg-white/10 transition font-semibold text-lg inline-block"
                    >
                        Sign In
                    </Link>
                </div>
                <p className="mt-6 text-blue-100">
                    No credit card required • Free forever • Setup in 5 minutes
                </p>
            </div>
        </section>
    )
}
