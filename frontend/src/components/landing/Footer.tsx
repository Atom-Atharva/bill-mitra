const footerLinks = {
    product: [
        { label: 'Features', href: '#features' },
        { label: 'Benefits', href: '#benefits' },
        { label: 'Testimonials', href: '#testimonials' },
        { label: 'FAQ', href: '#faq' },
    ],
    company: [
        { label: 'About Us', href: '#meetTheDeveloper' },
        { label: 'Contact', href: '#meetTheDeveloper' },
        { label: 'Privacy Policy', href: '#meetTheDeveloper' },
        { label: 'Terms of Service', href: '#meetTheDeveloper' },
    ],
    support: [
        { label: 'Help Center', href: '#contact' },
        { label: 'Documentation', href: '#contact' },
        { label: 'Contact Support', href: '#contact' },
        { label: 'Report a Bug', href: '#contact' },
    ],
}

export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-7xl mx-auto">
                <div className="grid md:grid-cols-4 gap-8 mb-8">
                    <div>
                        <div className="flex items-center mb-4">
                            <img src="/favicon-32x32.png" alt="BILLMITRA Logo" className="h-8 w-8" />
                            <span className="ml-2 text-2xl font-bold text-white" style={{ fontFamily: 'var(--font-header)' }}>
                                BILLMITRA
                            </span>
                        </div>
                        <p className="text-gray-400">
                            Your trusted billing partner for retail and wholesale businesses.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Product</h3>
                        <ul className="space-y-2">
                            {footerLinks.product.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="hover:text-blue-400 transition">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Company</h3>
                        <ul className="space-y-2">
                            {footerLinks.company.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="hover:text-blue-400 transition">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-white font-bold mb-4">Support</h3>
                        <ul className="space-y-2">
                            {footerLinks.support.map((link, idx) => (
                                <li key={idx}>
                                    <a href={link.href} className="hover:text-blue-400 transition">
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="border-t border-gray-800 pt-8 text-center">
                    <p className="text-gray-400">
                        © 2025 ATHARVA SUGANDHI. All rights reserved. Made with ❤️ for Indian businesses.
                    </p>
                </div>
            </div>
        </footer>
    )
}
