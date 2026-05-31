import React, { useState, useEffect } from 'react';
import { 
    ArrowRight, Check, AlertCircle, Loader2, 
    MapPin, Phone, Mail, Linkedin, Instagram, Play, Menu, X
} from 'lucide-react';

/* Hallmark · genre: editorial · macrostructure: Marquee Hero · theme: studied-DNA · enrichment: CAD-wireframe-SVG · nav: N9 · footer: Ft6 · Luxurious Technical Minimalism */

export default function App() {
    // Form state variables
    const [formValues, setFormValues] = useState({
        name: '',
        phone: '',
        email: '',
        service: 'Interior Design',
        message: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        phone: '',
        email: '',
        message: ''
    });

    const [touched, setTouched] = useState({
        name: false,
        phone: false,
        email: false,
        message: false
    });

    const [formStatus, setFormStatus] = useState('idle'); // idle | loading | success
    const [activeSection, setActiveSection] = useState('01');
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Scroll active tracking using IntersectionObserver
    useEffect(() => {
        const sections = ['hero', 'services', 'projects', 'materiality', 'about', 'contact'];
        const sectionMap = {
            'hero': '01',
            'services': '02',
            'projects': '03',
            'materiality': '04',
            'about': '05',
            'contact': '06'
        };

        const observerOptions = {
            root: null,
            rootMargin: '-30% 0px -50% 0px', // Trigger when section occupies center-view
            threshold: 0
        };

        const observerCallback = (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const sectionId = entry.target.id;
                    if (sectionMap[sectionId]) {
                        setActiveSection(sectionMap[sectionId]);
                    }
                }
            });
        };

        const observer = new IntersectionObserver(observerCallback, observerOptions);
        
        sections.forEach(secId => {
            const el = document.getElementById(secId);
            if (el) observer.observe(el);
        });

        return () => observer.disconnect();
    }, []);

    // Validate a single field
    const validateField = (name, value) => {
        let error = '';
        if (!value && name !== 'phone') {
            error = `${name.charAt(0).toUpperCase() + name.slice(1)} is required.`;
        } else if (name === 'email' && value) {
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(value)) {
                error = 'Please enter a valid email address.';
            }
        }
        return error;
    };

    // Handle change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormValues(prev => ({ ...prev, [name]: value }));
        
        // If field was already touched, validate on keystroke
        if (touched[name]) {
            const error = validateField(name, value);
            setErrors(prev => ({ ...prev, [name]: error }));
        }
    };

    // Handle blur
    const handleBlur = (e) => {
        const { name, value } = e.target;
        setTouched(prev => ({ ...prev, [name]: true }));
        const error = validateField(name, value);
        setErrors(prev => ({ ...prev, [name]: error }));
    };

    // Handle submit
    const handleSubmit = (e) => {
        e.preventDefault();
        
        // Mark all as touched
        const newTouched = { name: true, phone: true, email: true, message: true };
        setTouched(newTouched);

        // Validate all fields
        const newErrors = {
            name: validateField('name', formValues.name),
            phone: validateField('phone', formValues.phone),
            email: validateField('email', formValues.email),
            message: validateField('message', formValues.message)
        };

        setErrors(newErrors);

        const hasErrors = Object.values(newErrors).some(err => err !== '');
        if (hasErrors) return;

        setFormStatus('loading');

        setTimeout(() => {
            setFormStatus('success');
            setTimeout(() => {
                setFormValues({
                    name: '',
                    phone: '',
                    email: '',
                    service: 'Interior Design',
                    message: ''
                });
                setTouched({ name: false, phone: false, email: false, message: false });
                setFormStatus('idle');
            }, 3000);
        }, 1500);
    };

    // Smooth scroll navigation
    const scrollToSection = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const coreServices = [
        { num: '01', title: 'INTERIOR FIT-OUT', desc: 'Complete turn-key commercial and high-end residential interior contracting.' },
        { num: '02', title: 'RENOVATION & FINISHING', desc: 'Master craftsmanship in plastering, marble tiling, and luxury painting.' },
        { num: '03', title: 'GLASS & ALUMINIUM', desc: 'Custom architectural facades, glazing partitions, and slim-profile windows.' },
        { num: '04', title: 'FLOORING WORKS', desc: 'Precision parquet installations, microcement coatings, and heavy stone layouts.' },
        { num: '05', title: 'CUSTOM INTERIOR', desc: 'Tailored fitments, acoustic paneling, and architectural gypsum ceilings.' },
        { num: '06', title: 'TECHNICAL SERVICES', desc: 'High-efficiency HVAC installations, engineering designs, electrical & plumbing.' }
    ];

    const projectShowcase = [
        { 
            num: '01', 
            type: 'Residential', 
            title: 'The Palm Residence', 
            img: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 
            desc: 'A minimalist luxury villa fit-out embracing expansive sea views. The design vocabulary focuses on seamless transitions, utilizing expansive planar surfaces and muted natural tones.',
            caption: '[03 — The Palm residence stone fit-out]' 
        },
        { 
            num: '02', 
            type: 'Commercial', 
            title: 'Al Maha Executive Suites', 
            img: 'https://images.unsplash.com/photo-1497366216548-37526070297c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 
            desc: 'Commercial excellence in Downtown Dubai. A rigorous study in corporate luxury, employing rich walnut veneers, understated brass accents, and custom acoustical treatments.',
            caption: '[04 — Downtown Business Bay office execution]' 
        },
        { 
            num: '03', 
            type: 'Cultural', 
            title: 'Royal Majlis', 
            img: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80', 
            desc: 'Traditional elegance with a modern architectural twist. Reinterpreting heritage motifs through a contemporary lens, featuring bespoke geometric lattice work.',
            caption: '[05 — Jumeirah Royal Majlis gypsum fitment]' 
        }
    ];

    return (
        <div className="min-h-screen flex flex-col bg-[var(--color-paper)] text-[var(--color-ink)] selection:bg-[var(--color-accent)] selection:text-[var(--color-accent-ink)] rounded-none">
            
            {/* Header Navigation Archetype: N9 / Custom studied mix */}
            <header className="w-full fixed top-0 left-0 bg-[var(--color-paper)]/85 backdrop-blur-md z-50 border-b-[0.5px] border-[var(--color-rule)]">
                <div className="max-w-[var(--spacing-container-max)] mx-auto px-6 md:px-20 h-20 flex justify-between items-center">
                    <div className="flex flex-col cursor-pointer" onClick={() => scrollToSection('hero')}>
                        <span className="font-display text-xl tracking-[var(--tracking-label)] uppercase text-[var(--color-ink)] font-normal">
                            ZINAT AL RUH
                        </span>
                        <span className="font-label text-[0.55rem] tracking-[0.25em] uppercase text-[var(--color-accent)] font-semibold mt-1">
                            Technical Services LLC
                        </span>
                    </div>

                    {/* Desktop Menu Link Rows */}
                    <nav className="hidden md:flex items-center gap-[var(--spacing-lg)]">
                        <button onClick={() => scrollToSection('hero')} className="font-label text-xs uppercase tracking-widest text-[var(--color-neutral)] hover:text-[var(--color-accent)] transition-colors">Home</button>
                        <button onClick={() => scrollToSection('services')} className="font-label text-xs uppercase tracking-widest text-[var(--color-neutral)] hover:text-[var(--color-accent)] transition-colors">Services</button>
                        <button onClick={() => scrollToSection('projects')} className="font-label text-xs uppercase tracking-widest text-[var(--color-neutral)] hover:text-[var(--color-accent)] transition-colors">Projects</button>
                        <button onClick={() => scrollToSection('materiality')} className="font-label text-xs uppercase tracking-widest text-[var(--color-neutral)] hover:text-[var(--color-accent)] transition-colors">Materiality</button>
                        <button onClick={() => scrollToSection('about')} className="font-label text-xs uppercase tracking-widest text-[var(--color-neutral)] hover:text-[var(--color-accent)] transition-colors">Philosophy</button>
                        <button onClick={() => scrollToSection('contact')} className="font-label text-xs uppercase tracking-widest text-[var(--color-neutral)] hover:text-[var(--color-accent)] transition-colors">Contact</button>
                    </nav>

                    <div className="flex items-center gap-[var(--spacing-md)]">
                        <button 
                            onClick={() => scrollToSection('contact')}
                            className="hidden sm:block h-10 px-5 border-[0.5px] border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)] text-[var(--color-accent)] font-label text-[0.65rem] uppercase tracking-widest transition-all rounded-none"
                        >
                            Start a Project →
                        </button>
                        <button 
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="text-[var(--color-ink)] p-2 hover:text-[var(--color-accent)] transition-colors md:hidden"
                            aria-label="Toggle mobile menu"
                        >
                            <Menu size={20} />
                        </button>
                    </div>
                </div>
            </header>

            {/* Mobile Menu Drawer Overlay */}
            {isMobileMenuOpen && (
                <div className="fixed inset-0 bg-[var(--color-paper)] z-50 flex flex-col justify-center items-center gap-[var(--spacing-lg)] p-8">
                    <button 
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="absolute top-6 right-6 font-label text-xs uppercase tracking-widest text-[var(--color-neutral)] hover:text-[var(--color-accent)] transition-colors p-2"
                    >
                        Close [×]
                    </button>
                    <div className="flex flex-col items-center gap-[var(--spacing-md)] text-center">
                        <span className="font-label text-[0.6rem] tracking-[0.25em] text-[var(--color-accent)] uppercase mb-2">Navigation</span>
                        <button 
                            onClick={() => { scrollToSection('hero'); setIsMobileMenuOpen(false); }}
                            className="font-display text-3xl text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors py-2"
                        >
                            Home
                        </button>
                        <button 
                            onClick={() => { scrollToSection('services'); setIsMobileMenuOpen(false); }}
                            className="font-display text-3xl text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors py-2"
                        >
                            Services
                        </button>
                        <button 
                            onClick={() => { scrollToSection('projects'); setIsMobileMenuOpen(false); }}
                            className="font-display text-3xl text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors py-2"
                        >
                            Projects
                        </button>
                        <button 
                            onClick={() => { scrollToSection('materiality'); setIsMobileMenuOpen(false); }}
                            className="font-display text-3xl text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors py-2"
                        >
                            Materiality
                        </button>
                        <button 
                            onClick={() => { scrollToSection('about'); setIsMobileMenuOpen(false); }}
                            className="font-display text-3xl text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors py-2"
                        >
                            Philosophy
                        </button>
                        <button 
                            onClick={() => { scrollToSection('contact'); setIsMobileMenuOpen(false); }}
                            className="font-display text-3xl text-[var(--color-ink)] hover:text-[var(--color-accent)] transition-colors py-2"
                        >
                            Contact
                        </button>
                    </div>
                </div>
            )}

            <main className="flex-grow pt-20">
                
                {/* Hero Section: studied Marquee Hero + Right-Aligned Vertical Rail */}
                <section id="hero" className="relative min-h-screen lg:h-[90vh] flex items-center justify-center border-b-[0.5px] border-[var(--color-rule)] overflow-hidden select-none bg-[var(--color-paper-2)]">
                    {/* Architectural elegant background */}
                    <div className="absolute inset-0 z-0">
                        <img 
                            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80" 
                            alt="Luxury Architecture background" 
                            className="w-full h-full object-cover opacity-[0.07] mix-blend-multiply"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[var(--color-paper)]/30 to-[var(--color-paper)]"></div>
                        
                        {/* Elegant atmospheric blurred point */}
                        <div className="absolute top-1/4 right-1/4 w-[28rem] h-[28rem] rounded-full bg-[var(--color-accent)]/5 blur-[100px] -z-10"></div>
                        <div className="absolute bottom-1/4 left-1/4 w-[32rem] h-[32rem] rounded-full bg-[var(--color-accent)]/3 blur-[120px] -z-10"></div>
                    </div>

                    <div className="max-w-[var(--spacing-container-max)] w-full mx-auto px-6 md:px-20 relative z-10 grid lg:grid-cols-12 gap-[var(--spacing-xl)] items-center">
                        {/* Left Side: Massive High-Contrast Typography */}
                        <div className="lg:col-span-8 flex flex-col items-start pt-12 text-left">
                            <span className="font-label text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-accent)] mb-[var(--spacing-xs)] font-semibold">
                                We Transform Spaces
                            </span>
                            <h1 className="text-display mb-[var(--spacing-md)] text-[var(--color-ink)] leading-[1.05] tracking-[var(--tracking-display)] select-none">
                                Design. Build. <br />
                                Supervise. <span className="text-[var(--color-accent)] italic font-light">Deliver.</span>
                            </h1>
                            <p className="font-serif text-lg md:text-xl text-[var(--color-neutral)] leading-[var(--lh-snug)] max-w-[42ch] mb-[var(--spacing-xl)] font-light">
                                Premium Interior Fit-Out & Technical Services in Dubai, United Arab Emirates.
                            </p>

                            <div className="flex items-center gap-[var(--spacing-lg)]">
                                <button 
                                    onClick={() => scrollToSection('contact')}
                                    className="w-14 h-14 rounded-full border-[0.5px] border-[var(--color-accent)] hover:bg-[var(--color-accent)] hover:text-[var(--color-accent-ink)] text-[var(--color-accent)] flex items-center justify-center transition-all group"
                                    aria-label="Play showreel"
                                >
                                    <Play size={16} className="fill-current translate-x-[1px]" />
                                </button>
                                <span className="font-label text-xs uppercase tracking-widest text-[var(--color-neutral)] font-semibold">
                                    Play Showreel
                                </span>
                            </div>
                        </div>

                        {/* Right Side: Vertical Scroll Navigation Rail */}
                        <div className="lg:col-span-4 hidden lg:flex flex-col items-end relative h-[320px] justify-between pr-4">
                            <div className="progress-line right-7"></div>
                            
                            {[
                                { num: '01', label: 'HOME', secId: 'hero' },
                                { num: '02', label: 'SERVICES', secId: 'services' },
                                { num: '03', label: 'PROJECTS', secId: 'projects' },
                                { num: '04', label: 'MATERIALITY', secId: 'materiality' },
                                { num: '05', label: 'ABOUT', secId: 'about' },
                                { num: '06', label: 'CONTACT', secId: 'contact' }
                            ].map((node) => (
                                <div 
                                    key={node.num}
                                    onClick={() => scrollToSection(node.secId)}
                                    className={`progress-node ${activeSection === node.num ? 'active' : ''}`}
                                >
                                    <span className={`font-label text-[0.65rem] tracking-[0.2em] transition-colors ${activeSection === node.num ? 'text-[var(--color-accent)] font-bold' : 'text-[var(--color-muted)] hover:text-[var(--color-accent)]'}`}>
                                        {node.num} <span className="ml-2 font-body font-medium select-none">{node.label}</span>
                                    </span>
                                    <div className="node-dot"></div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Centered Scroll Indicator */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 cursor-pointer" onClick={() => scrollToSection('services')}>
                        <div className="w-5 h-8 border border-[var(--color-rule)] rounded-full flex justify-center p-[2px]">
                            <div className="w-1 h-2 bg-[var(--color-accent)] rounded-full animate-bounce"></div>
                        </div>
                        <span className="font-label text-[0.55rem] tracking-[0.3em] text-[var(--color-muted)] uppercase font-semibold">
                            Scroll
                        </span>
                    </div>
                </section>

                {/* Services Section: 6 Glowing Glass Cards + CAD Wireframe SVG */}
                <section id="services" className="max-w-[var(--spacing-container-max)] mx-auto px-6 md:px-20 py-[var(--spacing-2xl)] md:py-[var(--spacing-3xl)] border-b-[0.5px] border-[var(--color-rule)]">
                    <div className="grid lg:grid-cols-12 gap-[var(--spacing-xl)] items-start">
                        
                        {/* Left Side: Services Heading & Content */}
                        <div className="lg:col-span-8">
                            <div className="mb-[var(--spacing-xl)] text-left">
                                <span className="font-label text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-accent)] block mb-[var(--spacing-xs)] font-semibold">
                                    Our Services
                                </span>
                                <h2 className="text-display-s text-[var(--color-ink)] max-w-[20ch]">
                                    Crafting Spaces. Creating Experiences.
                                </h2>
                            </div>

                            {/* 6 Glowing Glass Cards */}
                            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-[var(--spacing-md)] mb-[var(--spacing-lg)]">
                                {coreServices.map((val, idx) => (
                                    <div key={idx} className="glass-panel p-6 flex flex-col items-start min-h-[190px] justify-between cursor-pointer rounded-none">
                                        <div className="w-full flex justify-between items-baseline border-b border-[var(--color-rule)] pb-3">
                                            <span className="font-display text-sm text-[var(--color-accent)] font-semibold">{val.num}</span>
                                            <span className="font-label text-[0.6rem] text-[var(--color-muted)] tracking-wider font-semibold">FIT-OUT</span>
                                        </div>
                                        <div className="mt-4 flex-grow text-left">
                                            <h4 className="font-label text-[0.75rem] font-bold uppercase tracking-widest text-[var(--color-ink)] mb-2 group-hover:text-[var(--color-accent)] transition-colors">{val.title}</h4>
                                            <p className="text-[0.75rem] text-[var(--color-neutral)] leading-snug">{val.desc}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="flex items-center gap-[var(--spacing-sm)] mt-[var(--spacing-md)] justify-start">
                                <span className="font-label text-[0.6rem] tracking-[0.25em] text-[var(--color-muted)] uppercase font-semibold">
                                    Scroll to explore
                                </span>
                                <ArrowRight size={14} className="text-[var(--color-accent)]" />
                            </div>
                        </div>

                        {/* Right Side: Intricate CAD Architectural Wireframe SVG */}
                        <div className="lg:col-span-4 hidden lg:flex justify-center items-center h-full pt-16">
                            <svg 
                                className="w-full h-auto max-w-[320px] opacity-[0.35] hover:opacity-75 transition-opacity duration-500" 
                                viewBox="0 0 400 450" 
                                fill="none" 
                                xmlns="http://www.w3.org/2000/svg"
                                aria-label="Interior space CAD wireframe drawing"
                            >
                                {/* Ground perspective plane */}
                                <line x1="20" y1="400" x2="380" y2="400" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <line x1="20" y1="400" x2="150" y2="100" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <line x1="380" y1="400" x2="250" y2="100" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <line x1="150" y1="100" x2="250" y2="100" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                
                                {/* Structural Pillars */}
                                <rect x="50" y="150" width="20" height="250" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <rect x="330" y="150" width="20" height="250" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <rect x="140" y="100" width="10" height="300" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <rect x="250" y="100" width="10" height="300" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                
                                {/* Ceiling grid lines */}
                                <line x1="50" y1="150" x2="350" y2="150" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <line x1="50" y1="170" x2="350" y2="170" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <line x1="80" y1="150" x2="160" y2="100" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <line x1="320" y1="150" x2="240" y2="100" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                
                                {/* Decorative floating elements - perspective grid */}
                                <circle cx="200" cy="180" r="30" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" strokeDasharray="2,2" />
                                <circle cx="200" cy="180" r="10" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <line x1="200" y1="100" x2="200" y2="170" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                
                                {/* Floating interior CAD grids */}
                                <path d="M 80,300 L 140,260 L 140,360 L 80,390 Z" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <path d="M 320,300 L 260,260 L 260,360 L 320,390 Z" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" />
                                <path d="M 160,280 L 240,280 L 240,350 L 160,350 Z" stroke="#775a19" strokeWidth="0.5" className="cad-stroke" strokeDasharray="3,3" />
                            </svg>
                        </div>
                    </div>
                </section>

                {/* Projects Section: studied Asymmetric Grid */}
                <section id="projects" className="max-w-[var(--spacing-container-max)] mx-auto px-6 md:px-20 py-[var(--spacing-2xl)] md:py-[var(--spacing-3xl)] border-b-[0.5px] border-[var(--color-rule)]">
                    <div className="mb-[var(--spacing-xl)] text-left">
                        <span className="font-label text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-accent)] block mb-[var(--spacing-xs)] font-semibold">
                            Our Portfolio
                        </span>
                        <h2 className="text-display-s text-[var(--color-ink)]">
                            Signature Projects
                        </h2>
                    </div>

                    <div className="grid md:grid-cols-12 gap-8 items-start">
                        {projectShowcase.map((proj, idx) => {
                            const isFirst = idx === 0;
                            const isSecond = idx === 1;
                            const gridClass = isFirst 
                                ? 'md:col-span-7 md:row-span-1' 
                                : isSecond 
                                    ? 'md:col-span-5 md:mt-16' 
                                    : 'md:col-span-6 md:mt-8';
                            return (
                                <div key={idx} className={`flex flex-col text-left ${gridClass}`}>
                                    <div className="hairline-img-container rounded-none">
                                        <img 
                                            src={proj.img} 
                                            alt={proj.title} 
                                            className="hairline-img h-[340px] md:h-[400px] w-full rounded-none"
                                            loading="lazy"
                                        />
                                        <figcaption className="image-caption">{proj.caption}</figcaption>
                                    </div>
                                    <div className="mt-4 flex justify-between items-start px-1">
                                        <div className="max-w-[85%]">
                                            <span className="font-label text-[0.65rem] uppercase tracking-widest text-[var(--color-accent)] block mb-1 font-semibold">
                                                {proj.type}
                                            </span>
                                            <h3 className="font-display text-xl text-[var(--color-ink)] mb-2">
                                                {proj.title}
                                            </h3>
                                            <p className="text-xs text-[var(--color-neutral)] leading-relaxed mt-1">{proj.desc}</p>
                                        </div>
                                        <span className="font-display text-lg text-[var(--color-accent)] opacity-60 tabular-nums">{proj.num}</span>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </section>

                {/* Materiality & Detail Section */}
                <section id="materiality" className="max-w-[var(--spacing-container-max)] mx-auto px-6 md:px-20 py-[var(--spacing-2xl)] md:py-[var(--spacing-3xl)] border-b-[0.5px] border-[var(--color-rule)]">
                    <div className="grid lg:grid-cols-12 gap-[var(--spacing-xl)] items-center">
                        <div className="lg:col-span-7 text-left">
                            <span className="font-label text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-accent)] block mb-[var(--spacing-xs)] font-semibold">
                                Materiality & Detail
                            </span>
                            <h2 className="text-display-s mb-[var(--spacing-md)] text-[var(--color-ink)] leading-tight">
                                Substance & Craftsmanship.
                            </h2>
                            <p className="text-base text-[var(--color-neutral)] leading-[var(--lh-relaxed)] mb-[var(--spacing-lg)] max-w-[52ch]">
                                Our commitment to craftsmanship is absolute. We curate the world's finest materials—rare veined marbles, sustainably sourced hardwoods, and hand-patinated metals—orchestrating them with technical precision to create spaces of enduring substance.
                            </p>
                            <ul className="space-y-[var(--spacing-lg)]">
                                <li className="flex gap-[var(--spacing-md)] border-b border-[var(--color-rule)] pb-4">
                                    <span className="font-display text-2xl text-[var(--color-accent)] font-semibold">01</span>
                                    <div>
                                        <h4 className="font-label text-xs uppercase tracking-widest text-[var(--color-ink)] mb-1 font-semibold">Artisan Millwork</h4>
                                        <p className="text-xs text-[var(--color-neutral)] leading-relaxed">Precision-engineered timber detailing, emphasizing natural grain and textural warmth.</p>
                                    </div>
                                </li>
                                <li className="flex gap-[var(--spacing-md)] border-b border-[var(--color-rule)] pb-4">
                                    <span className="font-display text-2xl text-[var(--color-accent)] font-semibold">02</span>
                                    <div>
                                        <h4 className="font-label text-xs uppercase tracking-widest text-[var(--color-ink)] mb-1 font-semibold">Stone Selection</h4>
                                        <p className="text-xs text-[var(--color-neutral)] leading-relaxed">Book-matched marble installations, executing complex architectural geometries.</p>
                                    </div>
                                </li>
                                <li className="flex gap-[var(--spacing-md)] pb-4">
                                    <span className="font-display text-2xl text-[var(--color-accent)] font-semibold">03</span>
                                    <div>
                                        <h4 className="font-label text-xs uppercase tracking-widest text-[var(--color-ink)] mb-1 font-semibold">Bespoke Metals</h4>
                                        <p className="text-xs text-[var(--color-neutral)] leading-relaxed">Custom brass and bronze fabrications with meticulously applied patinas.</p>
                                    </div>
                                </li>
                            </ul>
                        </div>
                        
                        <div className="lg:col-span-5 relative flex justify-center">
                            <div className="hairline-img-container max-w-[340px] rounded-none">
                                <img 
                                    src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                    alt="Luxury interior materials detail" 
                                    className="hairline-img h-[400px] w-full rounded-none"
                                    loading="lazy"
                                />
                                <figcaption className="image-caption">[06 — Material samples & high-contrast textures]</figcaption>
                            </div>
                            
                            {/* Decorative sample card */}
                            <div className="absolute -bottom-6 -left-6 bg-white p-5 border border-[var(--color-rule)] shadow-xl hidden sm:block w-56 text-left rounded-none">
                                <div className="h-24 bg-gradient-to-br from-amber-600/20 to-amber-900/10 mb-3 border border-gold/40"></div>
                                <div className="font-label text-[0.65rem] uppercase tracking-widest text-[var(--color-ink)] mb-1 font-semibold">Brushed Brass</div>
                                <div className="text-[9px] font-label text-[var(--color-muted)] uppercase tracking-wider font-semibold">Bespoke Hardware Finish</div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* About / Philosophy Section: studied Asymmetry layout */}
                <section id="about" className="max-w-[var(--spacing-container-max)] mx-auto px-6 md:px-20 py-[var(--spacing-2xl)] md:py-[var(--spacing-3xl)] border-b-[0.5px] border-[var(--color-rule)]">
                    <div className="grid lg:grid-cols-12 gap-[var(--spacing-xl)] items-center mb-[var(--spacing-2xl)]">
                        <div className="lg:col-span-7 text-left">
                            <span className="font-label text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-accent)] block mb-[var(--spacing-xs)] font-semibold">
                                The Studio
                            </span>
                            <h2 className="text-display-s mb-[var(--spacing-md)] text-[var(--color-ink)]">
                                Crafting Spaces That Inspire.
                            </h2>
                            <p className="text-base text-[var(--color-neutral)] leading-[var(--lh-relaxed)] max-w-[50ch] mb-[var(--spacing-md)]">
                                Zinat Al Ruh Technical Services LLC stands for meticulous, premium fit-out contracting in the heart of Dubai. We operate our technical workflows with absolute engineering precision and visual restraint.
                            </p>
                            <p className="text-base text-[var(--color-neutral)] leading-[var(--lh-relaxed)] max-w-[50ch]">
                                By avoiding generic visual elements and relying on durable, premium materials, we coordinate and supervise your interior layouts to deliver bespoke spaces of quiet luxury.
                            </p>
                        </div>
                        
                        <div className="lg:col-span-5 flex justify-center lg:justify-end">
                            <div className="hairline-img-container max-w-[380px] rounded-none">
                                <img 
                                    src="https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80" 
                                    alt="Luxury carpentry and materials" 
                                    className="hairline-img h-[340px] w-full rounded-none"
                                />
                                <figcaption className="image-caption">[02 — Architectural detail & marble surfaces]</figcaption>
                            </div>
                        </div>
                    </div>

                    {/* Asymmetric Core Values & Bespoke Quote */}
                    <div className="grid lg:grid-cols-12 gap-[var(--spacing-xl)] items-center">
                        <div className="lg:col-span-6 lg:order-2 text-left">
                            <div className="border-l border-[var(--color-accent)] pl-[var(--spacing-md)] py-4">
                                <span className="font-label text-[0.6rem] tracking-[0.25em] text-[var(--color-accent)] uppercase block mb-2 font-semibold">PRECISION & QUALITY</span>
                                <h3 className="font-serif italic text-2xl md:text-3xl text-[var(--color-ink)] leading-[var(--lh-snug)] font-light">
                                    "We believe that quality is not an accident. It is the result of continuous attention, refined materials, and expert hands."
                                </h3>
                                <span className="font-label text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-neutral)] mt-[var(--spacing-sm)] block font-semibold">
                                    — Zinat Al Ruh Atelier
                                </span>
                            </div>
                        </div>

                        <div className="lg:col-span-6 lg:order-1 text-left">
                            <span className="font-label text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-muted)] block mb-[var(--spacing-md)] font-semibold">
                                CORE OPERATIONAL VALUES
                            </span>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[var(--spacing-md)]">
                                {[
                                    { title: 'Quality', desc: 'Excellence in structural details' },
                                    { title: 'Integrity', desc: 'Absolute pricing transparency' },
                                    { title: 'Reliability', desc: 'Timelines consistently respected' },
                                    { title: 'Innovation', desc: 'Modern construction systems' }
                                ].map((val, idx) => (
                                    <div key={idx} className="border-t border-[var(--color-rule)] pt-4">
                                        <h4 className="font-label text-[0.75rem] font-bold uppercase tracking-widest text-[var(--color-ink)] mb-1">{val.title}</h4>
                                        <p className="text-xs text-[var(--color-neutral)] leading-[var(--lh-normal)]">{val.desc}</p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>

                {/* Contact Form Section: Glassmorphic block split */}
                <section id="contact" className="max-w-[var(--spacing-container-max)] mx-auto px-6 md:px-20 py-[var(--spacing-2xl)] md:py-[var(--spacing-3xl)]">
                    <div className="grid lg:grid-cols-12 gap-[var(--spacing-xl)] items-start">
                        
                        {/* Left Side: Contact Information */}
                        <div className="lg:col-span-5 text-left">
                            <span className="font-label text-xs uppercase tracking-[var(--tracking-label)] text-[var(--color-accent)] block mb-[var(--spacing-xs)] font-semibold">
                                Get in touch
                            </span>
                            <h2 className="text-display-s mb-[var(--spacing-md)] text-[var(--color-ink)]">
                                Ready to Begin?
                            </h2>
                            <p className="text-base text-[var(--color-neutral)] leading-[var(--lh-relaxed)] mb-[var(--spacing-lg)]">
                                Reach out today to review layout coordinates, architectural blueprints, or technical specifications. Our engineers will arrange a site audit and present a detailed estimate.
                            </p>

                            <div className="space-y-[var(--spacing-sm)] border-t border-[var(--color-rule)] pt-6">
                                <div className="flex gap-4">
                                    <MapPin size={16} className="text-[var(--color-accent)] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-label text-[0.65rem] uppercase tracking-[var(--tracking-label)] text-[var(--color-muted)] font-semibold">Location</h4>
                                        <p className="text-sm font-medium text-[var(--color-ink)]">9 Deira, Dubai, United Arab Emirates</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Phone size={16} className="text-[var(--color-accent)] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-label text-[0.65rem] uppercase tracking-[var(--tracking-label)] text-[var(--color-muted)] font-semibold">Direct Phone</h4>
                                        <p className="text-sm font-medium text-[var(--color-ink)]">+971 58 525 8199</p>
                                    </div>
                                </div>
                                <div className="flex gap-4">
                                    <Mail size={16} className="text-[var(--color-accent)] shrink-0 mt-1" />
                                    <div>
                                        <h4 className="font-label text-[0.65rem] uppercase tracking-[var(--tracking-label)] text-[var(--color-muted)] font-semibold">Email</h4>
                                        <p className="text-sm font-medium text-[var(--color-ink)]">sales@zinatalruh.com</p>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-4 border-t border-[var(--color-rule)] flex items-center gap-[var(--spacing-sm)]">
                                <span className="font-label text-[0.65rem] uppercase tracking-[var(--tracking-label)] text-[var(--color-muted)] font-semibold">Channels</span>
                                <div className="flex gap-2">
                                    <a href="https://www.linkedin.com/company/zinatalruh" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--color-rule)] text-[var(--color-neutral)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all rounded-none">
                                        <Linkedin size={14} />
                                    </a>
                                    <a href="https://www.instagram.com/zinat_alruh/" target="_blank" rel="noopener noreferrer" className="p-2 border border-[var(--color-rule)] text-[var(--color-neutral)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent)] transition-all rounded-none">
                                        <Instagram size={14} />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Right Side: Premium Glassmorphic 8-State Styled Contact Form */}
                        <div className="lg:col-span-7 bg-[var(--color-paper-2)] p-8 border border-[var(--color-rule)] rounded-none">
                            <h3 className="font-display text-2xl mb-[var(--spacing-md)] text-[var(--color-ink)] text-left font-normal">
                                Request a Quote
                            </h3>

                            <form onSubmit={handleSubmit} className="space-y-[var(--spacing-sm)]" noValidate>
                                <div className="grid md:grid-cols-2 gap-[var(--spacing-sm)]">
                                    <div className="text-left">
                                        <label className="block font-label text-[0.65rem] uppercase tracking-[var(--tracking-label)] text-[var(--color-neutral)] mb-1 font-semibold">
                                            Name <span className="text-[var(--color-accent)]">*</span>
                                        </label>
                                        <input 
                                            type="text" 
                                            name="name"
                                            value={formValues.name}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={formStatus === 'loading' || formStatus === 'success'}
                                            className={`w-full h-11 px-0 atelier-input rounded-none ${errors.name && touched.name ? 'border-red-500' : ''}`}
                                            placeholder="Maya Okonkwo"
                                            required
                                        />
                                        <div className="min-h-[1.25rem] mt-1">
                                            {errors.name && touched.name && (
                                                <span className="text-xs text-red-600 flex items-center gap-1">
                                                    <AlertCircle size={12} /> {errors.name}
                                                </span>
                                            )}
                                        </div>
                                    </div>

                                    <div className="text-left">
                                        <label className="block font-label text-[0.65rem] uppercase tracking-[var(--tracking-label)] text-[var(--color-neutral)] mb-1 font-semibold">
                                            Phone
                                        </label>
                                        <input 
                                            type="tel" 
                                            name="phone"
                                            value={formValues.phone}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            disabled={formStatus === 'loading' || formStatus === 'success'}
                                            className="w-full h-11 px-0 atelier-input rounded-none"
                                            placeholder="+971 50 123 4567"
                                        />
                                        <div className="min-h-[1.25rem] mt-1"></div>
                                    </div>
                                </div>

                                <div className="text-left">
                                    <label className="block font-label text-[0.65rem] uppercase tracking-[var(--tracking-label)] text-[var(--color-neutral)] mb-1 font-semibold">
                                        Email Address <span className="text-[var(--color-accent)]">*</span>
                                    </label>
                                    <input 
                                        type="email" 
                                        name="email"
                                        value={formValues.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={formStatus === 'loading' || formStatus === 'success'}
                                        className={`w-full h-11 px-0 atelier-input rounded-none ${errors.email && touched.email ? 'border-red-500' : ''}`}
                                        placeholder="maya@example.com"
                                        required
                                    />
                                    <div className="min-h-[1.25rem] mt-1">
                                        {errors.email && touched.email && (
                                            <span className="text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle size={12} /> {errors.email}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <div className="text-left">
                                    <label className="block font-label text-[0.65rem] uppercase tracking-[var(--tracking-label)] text-[var(--color-neutral)] mb-1 font-semibold">
                                        Service Required
                                    </label>
                                    <select 
                                        name="service"
                                        value={formValues.service}
                                        onChange={handleChange}
                                        disabled={formStatus === 'loading' || formStatus === 'success'}
                                        className="w-full h-11 px-0 atelier-input rounded-none cursor-pointer bg-white"
                                    >
                                        <option value="Interior Design">Interior Design & Fit-out</option>
                                        <option value="Tiling">Floor & Wall Tiling</option>
                                        <option value="Plaster Works">Plastering & Gypsum Works</option>
                                        <option value="Technical Services">Electrical / Plumbing / HVAC</option>
                                        <option value="Maintenance">Annual Maintenance Contract</option>
                                        <option value="Other">Other Specialized Service</option>
                                    </select>
                                    <div className="min-h-[1.25rem] mt-1"></div>
                                </div>

                                <div className="text-left">
                                    <label className="block font-label text-[0.65rem] uppercase tracking-[var(--tracking-label)] text-[var(--color-neutral)] mb-1 font-semibold">
                                        Project Description <span className="text-[var(--color-accent)]">*</span>
                                    </label>
                                    <textarea 
                                        name="message"
                                        value={formValues.message}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        disabled={formStatus === 'loading' || formStatus === 'success'}
                                        className={`w-full h-28 p-0 pt-2 atelier-input rounded-none resize-y ${errors.message && touched.message ? 'border-red-500' : ''}`}
                                        placeholder="Outline your sizing, spacing, and technical fit-out requirements..."
                                        required
                                    ></textarea>
                                    <div className="min-h-[1.25rem] mt-1">
                                        {errors.message && touched.message && (
                                            <span className="text-xs text-red-600 flex items-center gap-1">
                                                <AlertCircle size={12} /> {errors.message}
                                            </span>
                                        )}
                                    </div>
                                </div>

                                <button 
                                    type="submit"
                                    disabled={formStatus === 'loading' || formStatus === 'success'}
                                    className="w-full h-11 bg-[var(--color-ink)] text-white font-label text-xs uppercase tracking-[var(--tracking-label)] flex items-center justify-center gap-2 transition-all hover:bg-[var(--color-ink)]/90 disabled:opacity-50 disabled:cursor-not-allowed rounded-none font-semibold cursor-pointer"
                                >
                                    {formStatus === 'idle' && (
                                        <>
                                            Submit Request <ArrowRight size={14} />
                                        </>
                                    )}
                                    {formStatus === 'loading' && (
                                        <>
                                            <Loader2 size={14} className="animate-spin" /> Transmitting...
                                        </>
                                    )}
                                    {formStatus === 'success' && (
                                        <>
                                            <Check size={14} /> Transmitted Successfully
                                        </>
                                    )}
                                </button>
                            </form>
                        </div>

                    </div>
                </section>
            </main>

            {/* Footer Archetype: Ft6 (Letter Close) studied variant */}
            <footer className="w-full bg-[var(--color-paper)] border-t-[0.5px] border-[var(--color-rule)] py-[var(--spacing-xl)]">
                <div className="max-w-[var(--spacing-container-max)] mx-auto px-6 md:px-20">
                    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-[var(--spacing-lg)]">
                        <div className="flex flex-col text-left">
                            <span className="font-serif italic text-lg text-[var(--color-neutral)] mb-1">
                                Yours,
                            </span>
                            <span className="font-display text-xl tracking-[var(--tracking-label)] uppercase text-[var(--color-ink)]">
                                ZINAT AL RUH.
                            </span>
                            <span className="font-label text-[0.6rem] uppercase tracking-wider text-[var(--color-muted)] mt-2 font-semibold">
                                Dubai, United Arab Emirates · Licence 1032890
                            </span>
                        </div>

                        <div className="flex flex-wrap gap-[var(--spacing-md)] text-xs font-label uppercase tracking-widest text-[var(--color-muted)] font-semibold">
                            <button onClick={() => scrollToSection('hero')} className="hover:text-[var(--color-accent)] transition-colors">Home</button>
                            <button onClick={() => scrollToSection('services')} className="hover:text-[var(--color-accent)] transition-colors">Services</button>
                            <button onClick={() => scrollToSection('projects')} className="hover:text-[var(--color-accent)] transition-colors">Projects</button>
                            <button onClick={() => scrollToSection('materiality')} className="hover:text-[var(--color-accent)] transition-colors">Materiality</button>
                            <button onClick={() => scrollToSection('about')} className="hover:text-[var(--color-accent)] transition-colors">Philosophy</button>
                        </div>
                    </div>

                    <div className="mt-[var(--spacing-xl)] pt-[var(--spacing-md)] border-t-[0.5px] border-[var(--color-rule)] flex flex-col md:flex-row justify-between items-center text-[0.65rem] font-label text-[var(--color-muted)] gap-4">
                        <p>© {new Date().getFullYear()} ZINAT AL RUH TECHNICAL SERVICES LLC. HANDCRAFTED IN DUBAI.</p>
                        <p className="uppercase tracking-[var(--tracking-label)]">Architectural Precision.</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}