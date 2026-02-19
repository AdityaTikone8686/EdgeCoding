import { Code2, Twitter, Github, Linkedin, Youtube, Mail, ArrowRight } from 'lucide-react';

const footerLinks = {
    Platform: ['Courses', 'DSA Problems', 'Playground', 'Leaderboard', 'Roadmaps'],
    Company: ['About Us', 'Blog', 'Careers', 'Press Kit', 'Contact'],
    Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy', 'Licenses'],
    Support: ['Help Center', 'Community', 'Discord', 'Report a Bug'],
};

const socials = [
    { icon: Twitter, label: 'Twitter', href: '#' },
    { icon: Github, label: 'GitHub', href: '#' },
    { icon: Linkedin, label: 'LinkedIn', href: '#' },
    { icon: Youtube, label: 'YouTube', href: '#' },
];

export default function Footer() {
    return (
        <footer className="border-t border-white/10 bg-gray-950 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute bottom-0 left-1/3 w-96 h-60 bg-brand-900/20 rounded-full blur-3xl pointer-events-none" />

            {/* Newsletter Banner */}
            <div className="border-b border-white/10">
                <div className="max-w-7xl mx-auto px-4 py-10">
                    <div className="glass rounded-2xl px-8 py-8 border border-brand-500/20 flex flex-col md:flex-row items-center gap-6 justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-white mb-1">Stay ahead of the curve</h3>
                            <p className="text-gray-400 text-sm">Weekly coding tips, challenge drops, and DSA insights.</p>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <div className="relative flex-1 md:w-64">
                                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                                <input
                                    type="email"
                                    placeholder="your@email.com"
                                    className="w-full bg-white/5 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-all"
                                />
                            </div>
                            <button className="flex items-center gap-1.5 px-5 py-3 rounded-xl font-semibold text-white bg-gradient-to-r from-brand-600 to-purple-600 text-sm hover:shadow-lg hover:shadow-brand-600/30 transition-all whitespace-nowrap">
                                Subscribe <ArrowRight className="w-3.5 h-3.5" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Main footer */}
            <div className="max-w-7xl mx-auto px-4 py-16">
                <div className="grid grid-cols-2 md:grid-cols-6 gap-8 mb-12">
                    {/* Brand */}
                    <div className="col-span-2">
                        <a href="#home" className="flex items-center gap-2 mb-4 group w-fit">
                            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-purple-600 flex items-center justify-center shadow-lg">
                                <Code2 className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold gradient-text">CodeQuest</span>
                        </a>
                        <p className="text-gray-400 text-sm leading-relaxed mb-6 max-w-xs">
                            The platform where beginners become coders, and coders become interview-ready. Your DSA journey starts here.
                        </p>
                        {/* Socials */}
                        <div className="flex gap-2">
                            {socials.map(({ icon: Icon, label, href }) => (
                                <a
                                    key={label}
                                    href={href}
                                    aria-label={label}
                                    className="w-9 h-9 rounded-lg glass border border-white/10 flex items-center justify-center text-gray-500 hover:text-white hover:border-brand-500/50 transition-all"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Links */}
                    {Object.entries(footerLinks).map(([section, links]) => (
                        <div key={section}>
                            <h4 className="text-xs font-bold text-white uppercase tracking-widest mb-4">{section}</h4>
                            <ul className="space-y-2.5">
                                {links.map(link => (
                                    <li key={link}>
                                        <a
                                            href="#"
                                            className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
                                        >
                                            {link}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </div>

                {/* Bottom bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <p className="text-sm text-gray-600">
                        © 2026 CodeQuest. Built with ❤️ for every aspiring coder.
                    </p>
                    <div className="flex items-center gap-6 text-xs text-gray-600">
                        <span className="flex items-center gap-1.5">
                            <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                            All systems operational
                        </span>
                        <span>🇮🇳 Made in India</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
