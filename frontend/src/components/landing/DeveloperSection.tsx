import { Github, Linkedin, Mail, Code2, Briefcase, CheckCircle2, Shield, TrendingUp } from 'lucide-react'

const techStack = {
    frontend: ['React', 'TypeScript', 'TanStack Router', 'Tailwind CSS', 'Redux Toolkit', 'Material-UI'],
    backend: ['Spring Boot', 'Spring Security', 'MySQL', 'JPA/Hibernate', 'JWT Auth', 'Razorpay API'],
}

const keyFeatures = [
    'Role-based authentication & authorization system',
    'Real-time inventory management with Redux state',
    'Integrated payment gateway (Razorpay)',
    'Responsive design for all device sizes',
    'Multi-store support with isolated data',
    'Analytics dashboard for business insights',
]

const additionalInfo = [
    {
        icon: Code2,
        title: 'Clean Code',
        description: 'Well-structured, maintainable code following industry best practices and design patterns',
        color: 'bg-blue-100',
        iconColor: 'text-blue-600',
    },
    {
        icon: Shield,
        title: 'Security First',
        description: 'Implemented JWT authentication, password hashing, and secure API endpoints',
        color: 'bg-purple-100',
        iconColor: 'text-purple-600',
    },
    {
        icon: TrendingUp,
        title: 'Scalable Architecture',
        description: 'Built to handle growth with efficient database queries and optimized state management',
        color: 'bg-green-100',
        iconColor: 'text-green-600',
    },
]

export function DeveloperSection() {
    return (
        <section className="py-20 px-4 sm:px-6 lg:px-8 bg-linear-to-br from-indigo-50 via-purple-50 to-blue-50" id="meetTheDeveloper">
            <div className="max-w-6xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'var(--font-header)' }}>
                        Meet the Developer
                    </h2>
                    <p className="text-xl text-gray-600">
                        Built with passion and expertise
                    </p>
                </div>

                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
                    <div className="grid md:grid-cols-2 gap-0">
                        {/* Developer Info */}
                        <div className="p-8 md:p-12 flex flex-col justify-center">
                            <div className="mb-6">
                                {/* Profile Picture */}
                                <div className="w-32 h-32 bg-linear-to-br from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-6 shadow-xl overflow-hidden">
                                    <img
                                        src='/images/Atharva.JPG'
                                        alt="Atharva Sugandhi"
                                        className="w-full h-full object-cover"
                                        onError={(e) => {
                                            // Fallback to initials if image fails to load
                                            const target = e.target as HTMLImageElement
                                            target.style.display = 'none'
                                            const parent = target.parentElement
                                            if (parent) {
                                                parent.innerHTML = '<span class="text-5xl font-bold text-white">AS</span>'
                                            }
                                        }}
                                    />
                                </div>
                                <h3 className="text-3xl font-bold text-gray-900 mb-2">Atharva Sugandhi</h3>
                                <p className="text-xl text-blue-600 font-semibold mb-4">Full Stack Developer</p>
                                <p className="text-gray-600 leading-relaxed mb-6">
                                    A passionate software engineer specializing in building scalable web applications.
                                    BILLMITRA is a culmination of real-world problem-solving, combining modern technologies
                                    with practical business needs to create an intuitive billing solution for Indian retailers.
                                </p>
                            </div>

                            {/* Social Links */}
                            <div className="flex gap-4 mb-8">
                                <a
                                    href="https://github.com/Atom-Atharva"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gray-900 text-white p-3 rounded-lg hover:bg-gray-800 transition shadow-md hover:shadow-lg"
                                >
                                    <Github className="h-6 w-6" />
                                </a>
                                <a
                                    href="https://www.linkedin.com/in/atharva-sugandhi-391a4b225/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition shadow-md hover:shadow-lg"
                                >
                                    <Linkedin className="h-6 w-6" />
                                </a>
                                <a
                                    href="mailto:atharva.sugandhi@gmail.com"
                                    className="bg-red-600 text-white p-3 rounded-lg hover:bg-red-700 transition shadow-md hover:shadow-lg"
                                >
                                    <Mail className="h-6 w-6" />
                                </a>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-4">
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-blue-600">3+</p>
                                    <p className="text-sm text-gray-600">Years Experience</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-purple-600">15+</p>
                                    <p className="text-sm text-gray-600">Projects Built</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-2xl font-bold text-green-600">100%</p>
                                    <p className="text-sm text-gray-600">Dedication</p>
                                </div>
                            </div>
                        </div>

                        {/* Technical Skills & Project Details */}
                        <div className="bg-linear-to-br from-blue-600 to-purple-600 p-8 md:p-12 text-white">
                            <h4 className="text-2xl font-bold mb-6">About This Project</h4>
                            <p className="text-blue-100 mb-8 leading-relaxed">
                                BILLMITRA is a comprehensive billing and inventory management system designed specifically
                                for Indian retail businesses. This project showcases full-stack development capabilities,
                                from database design to user experience optimization.
                            </p>

                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Code2 className="h-6 w-6" />
                                Tech Stack
                            </h4>
                            <div className="space-y-3 mb-8">
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <p className="font-semibold mb-2">Frontend</p>
                                    <div className="flex flex-wrap gap-2">
                                        {techStack.frontend.map((tech, idx) => (
                                            <span key={idx} className="bg-white/20 px-3 py-1 rounded text-sm">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                                <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                                    <p className="font-semibold mb-2">Backend & Database</p>
                                    <div className="flex flex-wrap gap-2">
                                        {techStack.backend.map((tech, idx) => (
                                            <span key={idx} className="bg-white/20 px-3 py-1 rounded text-sm">{tech}</span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                                <Briefcase className="h-6 w-6" />
                                Key Features Implemented
                            </h4>
                            <ul className="space-y-2 text-blue-100">
                                {keyFeatures.map((feature, idx) => (
                                    <li key={idx} className="flex items-start gap-2">
                                        <CheckCircle2 className="h-5 w-5 text-green-300 mt-0.5 shrink-0" />
                                        <span>{feature}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Additional Info Cards */}
                <div className="grid md:grid-cols-3 gap-6 mt-12">
                    {additionalInfo.map((info, idx) => {
                        const Icon = info.icon
                        return (
                            <div key={idx} className="bg-white rounded-xl p-6 shadow-lg text-center">
                                <div className={`${info.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4`}>
                                    <Icon className={`h-8 w-8 ${info.iconColor}`} />
                                </div>
                                <h4 className="text-lg font-bold text-gray-900 mb-2">{info.title}</h4>
                                <p className="text-gray-600 text-sm">{info.description}</p>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
