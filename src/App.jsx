import React, { useState, useEffect } from 'react';
import { 
    Menu, X, Phone, Mail, MapPin, CheckCircle, Hammer, Wrench, 
    Fan, ShieldCheck, Clock, HeartHandshake, Lightbulb, Award, 
    Zap, Droplets, Brush, LayoutGrid, Facebook, Instagram
} from 'lucide-react';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
    const baseStyles = "px-8 py-3 rounded-full font-medium transition-all duration-300 transform hover:-translate-y-1 hover:shadow-lg";
    const variants = {
        primary: "bg-blue-900 text-white hover:bg-blue-800 border-2 border-transparent",
        secondary: "bg-transparent border-2 border-blue-900 text-blue-900 hover:bg-blue-900 hover:text-white",
        gold: "bg-gradient-to-r from-amber-400 to-amber-600 text-white border-none shadow-md"
    };
    return (
        <button className={`${baseStyles} ${variants[variant]} ${className}`} {...props}>
            {children}
        </button>
    );
};

const SectionTitle = ({ subtitle, title, centered = true }) => (
    <div className={`mb-12 ${centered ? 'text-center' : ''}`}>
        <span className="text-amber-600 font-bold uppercase tracking-wider text-sm mb-2 block">{subtitle}</span>
        <h2 className="text-4xl font-bold text-slate-900 relative inline-block pb-4">
            {title}
            <span className={`absolute bottom-0 ${centered ? 'left-1/2 -translate-x-1/2' : 'left-0'} w-24 h-1 bg-amber-500 rounded-full`}></span>
        </h2>
    </div>
);

export default function App() {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeService, setActiveService] = useState('all');
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const services = [
        { id: 'construction', title: 'Floor & Wall Tiling', icon: <LayoutGrid />, desc: 'Premium ceramic, porcelain, and marble installation for elegant spaces.' },
        { id: 'construction', title: 'Plaster Works', icon: <Hammer />, desc: 'Flawless wall finishes and restorative plastering for smooth surfaces.' },
        { id: 'construction', title: 'Wallpaper Fixing', icon: <Brush />, desc: 'Expert installation of decorative wallpapers to enhance interior aesthetics.' },
        { id: 'construction', title: 'False Ceiling', icon: <LayoutGrid />, desc: 'Modern gypsum and suspended ceiling designs with integrated lighting.' },
        { id: 'technical', title: 'Electrical Fittings', icon: <Zap />, desc: 'Complete electrical wiring, fixture installation, and safety checks.' },
        { id: 'technical', title: 'Plumbing & Sanitary', icon: <Droplets />, desc: 'Professional installation of sanitary ware, piping, and drainage systems.' },
        { id: 'specialized', title: 'Air Conditioning', icon: <Fan />, desc: 'Installation, maintenance, and repair of HVAC systems for optimal cooling.' },
        { id: 'specialized', title: 'Ventilation Systems', icon: <Fan />, desc: 'Advanced air filtration and ventilation solutions for healthy environments.' },
    ];

    const filterServices = activeService === 'all' 
        ? services 
        : services.filter(s => s.id === activeService);

    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
            setIsMenuOpen(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-red-50 text-slate-800 font-sans">
            {/* Global Styles & Fonts */}
            <style>{`
                @import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@300;400;500;600;700&family=Playfair+Display:wght@600;700&display=swap');
                body { font-family: 'Montserrat', sans-serif; }
                h1, h2, h3, h4 { font-family: 'Playfair Display', serif; }
                .text-gold { background: linear-gradient(135deg, #BF953F, #B38728, #AA771C); -webkit-background-clip: text; -webkit-text-fill-color: transparent; }
                @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: translateY(0); } }
                .fade-in { animation: fadeIn 1s ease-in; }
            `}</style>

            {/* Navbar */}
            <nav className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow-lg py-2' : 'bg-transparent py-6'}`}>
                <div className="container mx-auto px-6 flex justify-between items-center">
                    <div className="flex items-center gap-3 cursor-pointer" onClick={() => scrollToSection('hero')}>
                        {/* Logo Image - Local File */}
                        <img 
                            src="Zinat Al RuhFinal Logo Updated Version-02.jpg" 
                            alt="Zinat Al Ruh" 
                            className="h-16 w-auto object-contain"
                            onError={(e) => {
                                // Fallback if image fails to load
                                e.target.style.display = 'none';
                                if(e.target.nextSibling) {
                                    e.target.nextSibling.classList.remove('hidden');
                                    e.target.nextSibling.style.display = 'flex';
                                }
                            }}
                        />
                        {/* Text Fallback (Hidden if image loads successfully) */}
                        <div className="flex flex-col hidden">
                            <h1 className={`text-xl font-bold tracking-widest ${scrolled ? 'text-blue-900' : 'text-blue-900 md:text-white'}`}>
                                ZINAT <span className="text-amber-500">AL RUH</span>
                            </h1>
                            <span className={`text-[0.5rem] tracking-[0.2em] uppercase ${scrolled ? 'text-slate-600' : 'text-slate-200 md:text-slate-200'}`}>Technical Services LLC</span>
                        </div>
                    </div>

                    {/* Desktop Menu */}
                    <div className="hidden md:flex items-center space-x-8">
                        {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                            <button 
                                key={item} 
                                onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                                className={`font-medium text-sm uppercase tracking-wide hover:text-amber-500 transition-colors ${scrolled ? 'text-slate-700' : 'text-white'}`}
                            >
                                {item}
                            </button>
                        ))}
                        <Button variant="gold" onClick={() => scrollToSection('contact')}>Get Quote</Button>
                    </div>

                    {/* Mobile Toggle */}
                    <div className="md:hidden text-amber-500 cursor-pointer" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                        {isMenuOpen ? <X /> : <Menu />}
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className="md:hidden absolute top-full left-0 w-full bg-white shadow-xl py-6 px-6 flex flex-col gap-4">
                        {['Home', 'About', 'Services', 'Projects', 'Contact'].map((item) => (
                            <button 
                                key={item} 
                                onClick={() => scrollToSection(item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase())}
                                className="text-left text-slate-800 font-medium hover:text-amber-600"
                            >
                                {item}
                            </button>
                        ))}
                        <Button variant="gold" onClick={() => scrollToSection('contact')}>Get Quote</Button>
                    </div>
                )}
            </nav>

            {/* Hero Section */}
            <section id="hero" className="relative h-screen flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-slate-900">
                    <img 
                        src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80" 
                        alt="Luxury Interior" 
                        className="w-full h-full object-cover opacity-50"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-slate-900/70 via-slate-900/50 to-slate-900/80"></div>
                </div>

                <div className="container mx-auto px-6 relative z-10 text-center text-white mt-16">
                    <div className="inline-block border border-amber-500/50 bg-slate-900/30 backdrop-blur-sm px-6 py-2 rounded-full mb-6 fade-in">
                        <span className="text-amber-400 uppercase tracking-wider text-xs font-bold">Established in Dubai</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight fade-in">
                        Complete Interior <br/> 
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">Solutions</span>
                    </h1>
                    <p className="text-xl md:text-2xl text-slate-200 mb-10 max-w-3xl mx-auto font-light fade-in">
                        Premier interior and construction services for homes, offices, and commercial spaces in Dubai. 
                        Craftsmanship, Quality, and Innovation.
                    </p>
                    <div className="flex flex-col md:flex-row gap-4 justify-center fade-in">
                        <Button variant="gold" onClick={() => scrollToSection('services')}>Explore Services</Button>
                        <button onClick={() => scrollToSection('about')} className="px-8 py-3 rounded-full font-medium transition-all duration-300 border-2 border-white text-white hover:bg-white hover:text-slate-900">
                            Who We Are
                        </button>
                    </div>
                </div>
            </section>

            {/* About Section - Mission & Vision */}
            <section id="about" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        <div className="relative">
                            <div className="absolute -top-4 -left-4 w-24 h-24 bg-amber-100 rounded-full -z-10"></div>
                            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-blue-50 rounded-full -z-10"></div>
                            <img 
                                src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                alt="Modern interior design showcase by Zinat Al Ruh" 
                                className="rounded-2xl shadow-2xl w-full object-cover h-[500px]"
                            />
                            <div className="absolute bottom-8 right-8 bg-white p-6 rounded-xl shadow-lg max-w-xs hidden md:block">
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="p-2 bg-amber-500 rounded-full text-white">
                                        <ShieldCheck size={20} />
                                    </div>
                                    <span className="font-bold text-slate-900">ISO Standards</span>
                                </div>
                                <p className="text-sm text-slate-600">Strict adherence to international safety protocols and regulations.</p>
                            </div>
                        </div>

                        <div>
                            <SectionTitle subtitle="About Zinat Al Ruh" title="Crafting Spaces That Inspire" centered={false} />
                            <p className="text-slate-600 mb-6 leading-relaxed text-lg">
                                Zinat Al Ruh is a premier interior and technical services company based in Dubai. 
                                We provide complete interior and construction solutions tailored to meet the unique needs of 
                                homes, offices, and commercial establishments.
                            </p>
                            <p className="text-slate-600 mb-8 leading-relaxed">
                                Our commitment to craftsmanship, quality, and innovation drives us to deliver spaces that 
                                enhance everyday life.
                            </p>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-blue-900">
                                    <h3 className="text-xl font-bold text-blue-900 mb-3">Our Mission</h3>
                                    <p className="text-slate-600 text-sm">To deliver exceptional interior solutions combining quality craftsmanship, creative innovation, and genuine commitment to excellence.</p>
                                </div>
                                <div className="bg-slate-50 p-6 rounded-xl border-l-4 border-amber-500">
                                    <h3 className="text-xl font-bold text-amber-600 mb-3">Our Vision</h3>
                                    <p className="text-slate-600 text-sm">To be the leading provider of comprehensive interior solutions recognized for reliability and unwavering dedication.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Core Values */}
            <section className="py-16 bg-slate-900 text-white">
                <div className="container mx-auto px-6">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        {[
                            { icon: <Award />, title: 'Quality', desc: 'Excellence in every detail' },
                            { icon: <HeartHandshake />, title: 'Integrity', desc: 'Honesty & transparency' },
                            { icon: <Clock />, title: 'Reliability', desc: 'Deadlines consistently met' },
                            { icon: <Lightbulb />, title: 'Innovation', desc: 'New technologies & methods' },
                        ].map((value, idx) => (
                            <div key={idx} className="p-6 border border-slate-700 rounded-xl hover:bg-slate-800 transition-colors">
                                <div className="text-amber-500 flex justify-center mb-4 scale-125">{value.icon}</div>
                                <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                                <p className="text-slate-400 text-sm">{value.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Services Section */}
            <section id="services" className="py-24 bg-slate-50">
                <div className="container mx-auto px-6">
                    <SectionTitle subtitle="Our Expertise" title="Comprehensive Services" />

                    {/* Tabs */}
                    <div className="flex flex-wrap justify-center gap-4 mb-12">
                        {[
                            { id: 'all', label: 'All Services' },
                            { id: 'construction', label: 'Construction' },
                            { id: 'technical', label: 'Technical' },
                            { id: 'specialized', label: 'Specialized' }
                        ].map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveService(tab.id)}
                                className={`px-6 py-2 rounded-full font-medium transition-all ${
                                    activeService === tab.id 
                                    ? 'bg-blue-900 text-white shadow-lg' 
                                    : 'bg-white text-slate-600 hover:bg-blue-50'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Service Grid */}
                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {filterServices.map((service, index) => (
                            <div key={index} className="bg-white p-8 rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 group border border-slate-100">
                                <div className="w-14 h-14 bg-blue-50 rounded-xl flex items-center justify-center text-blue-900 mb-6 group-hover:bg-blue-900 group-hover:text-white transition-colors">
                                    {service.icon}
                                </div>
                                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-amber-600 transition-colors">{service.title}</h3>
                                <p className="text-slate-500 text-sm leading-relaxed">
                                    {service.desc}
                                </p>
                            </div>
                        ))}
                    </div>
                    
                    {/* Other Services List */}
                    <div className="mt-16 bg-white p-8 rounded-2xl shadow-lg border border-slate-100">
                        <h3 className="text-2xl font-bold text-center mb-8">Additional Specialized Services</h3>
                        <div className="grid md:grid-cols-3 gap-4 text-center">
                            {['Building Cleaning', 'Water Well Drilling', 'Light Partitions', 'Maintenance Contracts', 'Gypsum Works', 'Floor Polishing'].map((item, i) => (
                                <div key={i} className="flex items-center justify-center gap-2 text-slate-700 py-2 bg-slate-50 rounded-lg">
                                    <CheckCircle size={16} className="text-amber-500" />
                                    <span className="font-medium">{item}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </section>

            {/* Projects / Portfolio */}
            <section id="projects" className="py-20 bg-white">
                <div className="container mx-auto px-6">
                    <SectionTitle subtitle="Our Work" title="Recent Projects" />
                    
                    <div className="grid md:grid-cols-2 gap-8">
                        <div className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Bathroom Proposal" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-amber-400 text-sm font-bold uppercase mb-2">Residential</span>
                                <h3 className="text-2xl font-bold text-white">Luxury Bathroom Design</h3>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1565538810643-b5bdb714032a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Kiosk Design" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-amber-400 text-sm font-bold uppercase mb-2">Commercial</span>
                                <h3 className="text-2xl font-bold text-white">Flower Shop Kiosk</h3>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Living Area" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-amber-400 text-sm font-bold uppercase mb-2">Interior Fit-out</span>
                                <h3 className="text-2xl font-bold text-white">Modern Living Space</h3>
                            </div>
                        </div>
                        <div className="group relative overflow-hidden rounded-2xl h-80 cursor-pointer">
                            <img src="https://images.unsplash.com/photo-1504328345606-18aff75f8732?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" alt="Technical Works" className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-8">
                                <span className="text-amber-400 text-sm font-bold uppercase mb-2">Technical Services</span>
                                <h3 className="text-2xl font-bold text-white">Office HVAC Installation</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Contact Section */}
            <section id="contact" className="py-24 bg-slate-900 text-white relative">
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-900 via-amber-500 to-blue-900"></div>
                <div className="container mx-auto px-6">
                    <div className="grid lg:grid-cols-2 gap-16">
                        <div>
                            <span className="text-amber-500 font-bold uppercase tracking-wider text-sm mb-2 block">Get In Touch</span>
                            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Space?</h2>
                            <p className="text-slate-400 mb-10 text-lg">
                                Contact us today for a quote! Our team is ready to provide quality craftsmanship and exceptional service for your next project.
                            </p>
                            
                            <div className="space-y-6">
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-800 p-3 rounded-lg text-amber-400">
                                        <MapPin />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Location</h4>
                                        <p className="text-slate-300">9 Deira, Dubai, UAE</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-800 p-3 rounded-lg text-amber-400">
                                        <Phone />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Phone</h4>
                                        <p className="text-slate-300">+971 58 525 8199</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="bg-blue-800 p-3 rounded-lg text-amber-400">
                                        <Mail />
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-lg">Email</h4>
                                        <p className="text-slate-300">sales@zinatalruh.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-8 border-t border-slate-800">
                                <h4 className="font-bold text-lg mb-4">Follow Us</h4>
                                <div className="flex gap-4">
                                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="bg-blue-800 p-3 rounded-lg text-amber-400 hover:bg-amber-500 hover:text-white transition-colors">
                                        <Facebook />
                                    </a>
                                    <a href="https://www.instagram.com/zinat_alruh/" target="_blank" rel="noopener noreferrer" className="bg-blue-800 p-3 rounded-lg text-amber-400 hover:bg-amber-500 hover:text-white transition-colors">
                                        <Instagram />
                                    </a>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-8 rounded-2xl shadow-2xl text-slate-900">
                            <h3 className="text-2xl font-bold mb-6 text-blue-900">Request a Quote</h3>
                            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                                <div className="grid md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Name</label>
                                        <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" placeholder="Your Name" />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-700 mb-1">Phone</label>
                                        <input type="tel" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" placeholder="+971..." />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                                    <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none" placeholder="your@email.com" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Service Interested</label>
                                    <select className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none">
                                        <option>Interior Design</option>
                                        <option>Construction / Tiling</option>
                                        <option>HVAC / AC Services</option>
                                        <option>Electrical / Plumbing</option>
                                        <option>Building Cleaning</option>
                                        <option>Other</option>
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
                                    <textarea className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:border-amber-500 focus:ring-1 focus:ring-amber-500 outline-none h-32" placeholder="Tell us about your project requirements..."></textarea>
                                </div>
                                <Button variant="primary" className="w-full">Send Message</Button>
                            </form>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-slate-950 text-slate-400 py-12 border-t border-slate-800">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-6">
                        <div className="flex items-center gap-4">
                            <img 
                                src="Zinat Al RuhFinal Logo Updated Version-02.jpg" 
                                alt="Zinat Al Ruh" 
                                className="h-14 w-auto opacity-80"
                                onError={(e) => {
                                    // Fallback if image fails to load
                                    e.target.style.display = 'none';
                                    if(e.target.nextSibling) {
                                        e.target.nextSibling.classList.remove('hidden');
                                        e.target.nextSibling.style.display = 'block';
                                    }
                                }}
                            />
                            {/* Fallback Text for Footer */}
                            <div className="hidden">
                                <h2 className="text-2xl font-bold text-white mb-1">ZINAT AL RUH</h2>
                                <p className="text-sm">Technical Services LLC</p>
                            </div>
                        </div>
                        <div className="flex gap-8 text-sm">
                            <a href="#" className="hover:text-amber-500 transition-colors">Home</a>
                            <a href="#" className="hover:text-amber-500 transition-colors">Services</a>
                            <a href="#" className="hover:text-amber-500 transition-colors">Projects</a>
                            <a href="#" className="hover:text-amber-500 transition-colors">Contact</a>
                        </div>
                        <p className="text-sm">© {new Date().getFullYear()} Zinat Al Ruh. All rights reserved.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}