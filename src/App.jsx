import React, { useState, useEffect } from "react";
import {
    Menu, X, Phone, ShieldCheck, Users, BookOpen, Heart,
    MapPin, CheckCircle2, ChevronRight, Star, Calendar,
    Instagram, Facebook, Twitter, Mail, ArrowRight,
    Shield, Sparkles, Camera, Award, Clock
} from "lucide-react";

// --- Components ---

const Header = () => {
    const [activeSection, setActiveSection] = useState("home");
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);

            // Active section detection
            const sections = ["why-choose", "programs", "about", "gallery", "testimonials", "events", "admissions"];
            const current = sections.find(id => {
                const element = document.getElementById(id);
                if (element) {
                    const rect = element.getBoundingClientRect();
                    return rect.top <= 150 && rect.bottom >= 150;
                }
                return false;
            });
            if (current) setActiveSection(current);
            else if (window.scrollY < 100) setActiveSection("home");
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "#" },
        { name: "Why Us", href: "#why-choose" },
        { name: "Programs", href: "#programs" },
        { name: "About Us", href: "#about" },
        { name: "Gallery", href: "#gallery" },
        { name: "Parents", href: "#testimonials" },
        { name: "Events", href: "#events" },
        { name: "Contact", href: "#admissions" },
    ];

    const handleNavClick = (e, href) => {
        if (href.startsWith("#")) {
            e.preventDefault();
            const id = href === "#" ? "home" : href.substring(1);
            const element = id === "home" ? document.body : document.getElementById(id);
            if (element) {
                element.scrollIntoView({ behavior: "smooth" });
                setIsMobileMenuOpen(false);
            }
        }
    };

    return (
        <header
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled ? "bg-white shadow-md py-3" : "bg-transparent py-5"
                }`}
        >
            <div className="container-custom flex items-center justify-between">
                {/* Logo */}
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-primary-yellow rounded-full flex items-center justify-center shadow-lg">
                        <span className="text-primary-blue font-bold text-xl md:text-2xl">SN</span>
                    </div>
                    <div className="flex flex-col">
                        <span className={`font-bold leading-none text-sm md:text-base ${isScrolled ? "text-primary-blue" : "text-primary-blue"}`}>
                            SHREENIKETAN
                        </span>
                        <span className="text-[10px] md:text-xs text-text-secondary uppercase tracking-widest font-semibold">
                            Child Care & Education
                        </span>
                    </div>
                </div>

                {/* Desktop Nav */}
                <nav className="hidden lg:flex items-center gap-6">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleNavClick(e, link.href)}
                            className={`text-sm font-semibold transition-colors relative group ${(activeSection === link.href.substring(1) || (link.href === "#" && activeSection === "home"))
                                ? "text-brand-orange"
                                : "text-primary-blue hover:text-brand-orange"
                                }`}
                        >
                            {link.name}
                            <span className={`absolute -bottom-1 left-0 w-0 h-0.5 bg-brand-orange transition-all duration-300 group-hover:w-full ${(activeSection === link.href.substring(1) || (link.href === "#" && activeSection === "home")) ? "w-full" : ""
                                }`}></span>
                        </a>
                    ))}
                </nav>

                {/* CTA Button */}
                <div className="hidden lg:block">
                    <a href="#admissions" className="btn-primary text-sm px-6 py-2.5">
                        Admissions Open
                    </a>
                </div>

                {/* Mobile Menu Toggle */}
                <button
                    className="lg:hidden text-primary-blue p-1"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                >
                    {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* Mobile Drawer */}
            <div
                className={`fixed inset-0 bg-white z-50 transition-all duration-500 lg:hidden ${isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
                    }`}
            >
                <div className="container-custom h-full flex flex-col pt-8 pb-12">
                    <div className="flex items-center justify-between mb-12">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center shadow-md">
                                <span className="text-primary-blue font-bold text-lg">SN</span>
                            </div>
                            <span className="font-bold text-primary-blue text-sm">SHREENIKETAN</span>
                        </div>
                        <button
                            className="text-primary-blue p-2 bg-brand-grey rounded-full"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <nav className="flex flex-col gap-4 overflow-y-auto pr-4 custom-scrollbar">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleNavClick(e, link.href)}
                                className={`text-2xl font-black py-2 flex items-center justify-between group ${(activeSection === link.href.substring(1) || (link.href === "#" && activeSection === "home"))
                                    ? "text-brand-orange"
                                    : "text-primary-blue"
                                    }`}
                            >
                                {link.name}
                                <ChevronRight size={20} className={`transition-transform ${isMobileMenuOpen ? "translate-x-0" : "-translate-x-4"}`} />
                            </a>
                        ))}
                    </nav>

                    <div className="mt-auto pt-8 border-t border-slate-100 flex flex-col gap-6">
                        <a
                            href="#admissions"
                            className="btn-primary w-full text-center py-4 text-lg shadow-xl"
                            onClick={() => setIsMobileMenuOpen(false)}
                        >
                            Admissions Open 2025–26
                        </a>
                        <div className="flex items-center justify-between px-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-brand-sky rounded-full flex items-center justify-center">
                                    <Phone size={18} className="text-primary-blue" />
                                </div>
                                <span className="font-bold text-primary-blue">7822994864</span>
                            </div>
                            <div className="flex gap-4">
                                <Instagram size={20} className="text-text-secondary" />
                                <Facebook size={20} className="text-text-secondary" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </header>
    );
};

const Hero = () => {
    return (
        <section id="home" className="relative min-h-screen flex items-center pt-20 md:pt-0 overflow-hidden">
            {/* Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#e8f4f8] via-white to-[#e8f4f8] -z-10"></div>

            {/* Decorative Patterns */}
            <div className="absolute top-20 left-10 w-32 h-32 bg-primary-yellow/10 rounded-full blur-3xl animate-pulse"></div>
            <div className="absolute bottom-20 right-10 w-64 h-64 bg-primary-blue/5 rounded-full blur-2xl animate-pulse delay-700"></div>

            <div className="container-custom grid lg:grid-cols-2 gap-12 items-center">
                {/* Left Content */}
                <div className="space-y-6 sm:space-y-8 text-center lg:text-left px-3 sm:px-2 pt-8 lg:pt-0 w-full max-w-full">
                    <div className="inline-flex items-center gap-2 bg-white px-3 sm:px-4 py-2 rounded-full shadow-sm border border-slate-100 cursor-default">
                        <Sparkles size={14} className="text-primary-yellow sm:w-4 sm:h-4" />
                        <span className="text-[9px] sm:text-xs font-black text-primary-blue uppercase tracking-widest leading-none">Admissions 2025-26</span>
                    </div>

                    <h1 className="text-[1.75rem] sm:text-4xl md:text-5xl lg:text-6xl font-black text-primary-blue leading-[1.2] sm:leading-[1.15] md:leading-[1.1] break-words max-w-full">
                        SHREENIKETAN <br />
                        <span className="text-brand-orange break-words">Child Care & Education</span>
                    </h1>

                    <p className="text-sm sm:text-base md:text-lg lg:text-xl text-text-secondary max-w-xl mx-auto lg:mx-0 leading-relaxed font-medium px-2 sm:px-0">
                        Where Little Minds Blossom | Ages 2–6 <br className="hidden sm:block" />
                        <span className="text-primary-blue font-bold">NEP 2020 Compliant Campus</span>
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center lg:justify-start pt-2 px-2 sm:px-0">
                        <a href="#admissions" className="btn-primary flex items-center justify-center gap-2 group text-xs sm:text-sm md:text-base py-3.5 sm:py-4 md:py-3 shadow-lg whitespace-nowrap">
                            Admissions Open 2025–26
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform sm:w-18 sm:h-18" />
                        </a>
                        <a href="#contact" className="btn-outline border-primary-blue/20 text-primary-blue flex items-center justify-center gap-2 text-xs sm:text-sm md:text-base py-3.5 sm:py-4 md:py-3 whitespace-nowrap">
                            <MapPin size={16} className="sm:w-18 sm:h-18" /> Schedule a Visit
                        </a>
                    </div>

                    <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
                        {["24×7 CCTV", "Max 25 Students/Class", "Play-Way Learning"].map((tag) => (
                            <span key={tag} className="bg-brand-sky text-primary-blue text-xs md:text-sm px-4 py-1.5 rounded-full font-bold border border-primary-blue/10">
                                • {tag}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Right Image Placeholder */}
                <div className="relative group">
                    <div className="relative z-10 rounded-3xl overflow-hidden border-8 border-white shadow-premium aspect-[4/3] bg-brand-sky flex items-center justify-center group-hover:scale-[1.02] transition-transform duration-500">
                        <div className="text-center p-8">
                            <div className="w-24 h-24 bg-white/50 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                                <Camera size={40} className="text-primary-blue/30" />
                            </div>
                            <h3 className="text-2xl font-bold text-primary-blue/40 uppercase tracking-widest">Happy Children Image Placeholder</h3>
                            <p className="text-sm text-primary-blue/30 mt-2 font-medium">Vibrant & Joyful Classroom Environment</p>
                        </div>
                        {/* Decorative Elements */}
                        <div className="absolute top-4 right-4 bg-primary-yellow p-3 rounded-2xl shadow-lg -rotate-12 group-hover:rotate-0 transition-transform">
                            <Heart className="text-primary-blue" fill="currentColor" />
                        </div>
                        <div className="absolute -bottom-4 -left-4 bg-brand-green p-3 rounded-2xl shadow-lg rotate-6 group-hover:rotate-0 transition-transform">
                            <Star className="text-white" fill="currentColor" />
                        </div>
                    </div>
                    {/* Background Shape */}
                    <div className="absolute -inset-4 bg-brand-orange/10 -z-10 rounded-[3rem] blur-xl opacity-60 group-hover:opacity-100 transition-opacity"></div>
                </div>
            </div>
        </section>
    );
};

const TrustBar = () => {
    const items = [
        { icon: <ShieldCheck size={24} />, text: "NEP 2020 Aligned Curriculum" },
        { icon: <MapPin size={24} />, text: "Safe & Hygienic Campus" },
        { icon: <Users size={24} />, text: "Experienced Educators" },
        { icon: <Clock size={24} />, text: "Hello Parent App Updates" },
    ];

    return (
        <div className="bg-primary-blue py-6 relative overflow-hidden">
            <div className="container-custom">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 justify-items-center">
                    {items.map((item, idx) => (
                        <div key={idx} className="flex flex-col sm:flex-row items-center gap-2 sm:gap-3 text-white text-center sm:text-left group">
                            <div className="p-2.5 bg-white/10 rounded-xl group-hover:bg-primary-yellow group-hover:text-primary-blue transition-all duration-300">
                                {item.icon}
                            </div>
                            <span className="font-bold text-[10px] sm:text-xs md:text-sm uppercase tracking-widest leading-none sm:leading-tight">{item.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            {/* Texture Overlay */}
            <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '24px 24px' }}></div>
        </div>
    );
};

const WhyChooseUs = () => {
    const cards = [
        {
            title: "24×7 CCTV Surveillance",
            desc: "Complete visual monitoring across campus ensuring your child's safety at all times.",
            icon: <ShieldCheck className="text-primary-blue" />,
            color: "border-primary-yellow"
        },
        {
            title: "Max 25 Students per Class",
            desc: "Small batch sizes to ensure personalized attention and better learning outcomes.",
            icon: <Users className="text-brand-orange" />,
            color: "border-brand-green"
        },
        {
            title: "NEP 2020 Compliant",
            desc: "Integrated curriculum focusing on foundational literacy and numeracy as per new guidelines.",
            icon: <BookOpen className="text-brand-green" />,
            color: "border-brand-orange"
        },
        {
            title: "Experienced Teachers",
            desc: "Compassionate educators trained in early childhood care and modern pedagogy.",
            icon: <Heart className="text-primary-yellow" />,
            color: "border-brand-sky"
        },
        {
            title: "Holistic Development",
            desc: "Balanced focus on cognitive, social, emotional, and physical skill building.",
            icon: <Star className="text-brand-sky" />,
            color: "border-primary-blue"
        },
        {
            title: "Child-Safe Infrastructure",
            desc: "Ergonomic furniture, non-toxic materials, and safe play areas designed for children.",
            icon: <MapPin className="text-primary-blue" />,
            color: "border-primary-yellow"
        }
    ];

    return (
        <section id="why-choose" className="section-padding bg-brand-grey/30">
            <div className="container-custom">
                <div className="text-center mb-16 space-y-4">
                    <h4 className="text-brand-orange font-bold uppercase tracking-widest text-sm">Our Philosophy</h4>
                    <h2 className="text-3xl md:text-5xl font-black text-primary-blue">Why Choose SHREENIKETAN?</h2>
                    <div className="w-24 h-1.5 bg-primary-yellow mx-auto rounded-full"></div>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {cards.map((card, idx) => (
                        <div key={idx} className={`card-premium p-6 sm:p-8 border-t-4 ${card.color} hover:-translate-y-2 transition-transform duration-300 group`}>
                            <div className="w-12 h-12 sm:w-14 sm:h-14 bg-slate-50 rounded-2xl flex items-center justify-center mb-5 sm:mb-6 shadow-inner group-hover:scale-110 transition-transform">
                                {card.icon}
                            </div>
                            <h3 className="text-lg sm:text-xl font-black text-primary-blue mb-2.5 sm:mb-3">{card.title}</h3>
                            <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">{card.desc}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Programs = () => {
    const programs = [
        {
            title: "Playgroup",
            age: "2–3 Years",
            desc: "A fun-filled introduction to social interaction and sensory exploration.",
            chips: ["Sensory Play", "Motor Skills", "Socializing"],
            color: "from-brand-sky to-white"
        },
        {
            title: "Nursery",
            age: "3–4 Years",
            desc: "Developing curiosity through structured play and early language skills.",
            chips: ["Creative Arts", "Phonics", "Pre-Math"],
            color: "from-brand-green/10 to-white"
        },
        {
            title: "Junior KG",
            age: "4–5 Years",
            desc: "Transitioning to foundational literacy and thematic learning concepts.",
            chips: ["Writing", "Numeracy", "Nature Study"],
            color: "from-brand-orange/10 to-white"
        },
        {
            title: "Senior KG",
            age: "5–6 Years",
            desc: "Preparing for formal primary school with confidence and academic readiness.",
            chips: ["Advanced Phonics", "Problem Solving", "Hindi/Local Lang"],
            color: "from-primary-yellow/10 to-white"
        },
    ];

    return (
        <section id="programs" className="section-padding">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4 max-w-2xl">
                        <h4 className="text-brand-green font-bold uppercase tracking-widest text-sm">Academic Journey</h4>
                        <h2 className="text-3xl md:text-5xl font-black text-primary-blue leading-tight">Our Learning Programs</h2>
                        <p className="text-text-secondary md:text-lg font-medium">Tailored educational pathways designed for every stage of early childhood development.</p>
                    </div>
                    <a href="#" className="hidden md:flex items-center gap-2 text-primary-blue font-bold group">
                        View All Programs <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </a>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
                    {programs.map((prog, idx) => (
                        <div key={idx} className={`card-premium bg-gradient-to-br ${prog.color} p-6 sm:p-8 flex flex-col hover:shadow-xl transition-shadow group`}>
                            <span className="inline-block bg-white text-primary-blue text-[10px] font-black px-4 py-1.5 rounded-full border border-slate-200 w-fit mb-6 shadow-sm uppercase tracking-widest">
                                {prog.age}
                            </span>
                            <h3 className="text-2xl font-black text-primary-blue mb-3 group-hover:text-brand-orange transition-colors">{prog.title}</h3>
                            <p className="text-sm sm:text-base text-text-secondary mb-6 sm:mb-8 leading-snug font-medium line-clamp-3">{prog.desc}</p>

                            <div className="flex flex-wrap gap-2 mb-6 sm:mb-8">
                                {prog.chips.map(chip => (
                                    <span key={chip} className="text-[9px] sm:text-[10px] uppercase tracking-wider font-bold text-primary-blue/60 bg-white/70 px-2.5 py-1 rounded-lg border border-primary-blue/5">
                                        {chip}
                                    </span>
                                ))}
                            </div>

                            <div className="mt-auto">
                                <button className="flex items-center gap-2 text-brand-orange font-black uppercase text-[10px] tracking-[0.2em] transition-all hover:gap-3 group/btn">
                                    Explore Program <ChevronRight size={14} className="group-hover/btn:translate-x-1 transition-transform" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AboutSection = () => {
    return (
        <section id="about" className="section-padding bg-brand-sky/20">
            <div className="container-custom grid lg:grid-cols-2 gap-16 items-center">
                {/* Left: Content */}
                <div className="space-y-10 order-2 lg:order-1">
                    <div className="space-y-4">
                        <h4 className="text-primary-blue font-bold uppercase tracking-widest text-sm">Our Philosophy</h4>
                        <h2 className="text-3xl md:text-5xl font-black text-primary-blue">Nurturing Excellence with CLEVER Steps</h2>
                        <p className="text-lg text-text-secondary leading-relaxed italic">
                            "We don't just teach; we ignite the spark of lifelong learning."
                        </p>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-6">
                        {[
                            "Care, Love & Entertainment",
                            "Visionary Education",
                            "Play-way Teaching Method",
                            "Confidence & Independence",
                            "Strong Values & Manners",
                            "Safe & Reassuring Spaces"
                        ].map((point, idx) => (
                            <div key={idx} className="flex items-start gap-3">
                                <CheckCircle2 size={24} className="text-brand-green mt-1 flex-shrink-0" />
                                <span className="font-bold text-primary-blue">{point}</span>
                            </div>
                        ))}
                    </div>

                    <a href="#" className="btn-outline inline-flex items-center gap-2 shadow-sm">
                        Read More About Us <ArrowRight size={20} />
                    </a>
                </div>

                {/* Right: Image Grid Layout */}
                <div className="order-1 lg:order-2 grid grid-cols-2 gap-4">
                    <div className="space-y-4 pt-12">
                        <div className="rounded-3xl overflow-hidden shadow-premium aspect-[4/5] bg-brand-orange/10 flex items-center justify-center p-4">
                            <div className="text-center text-brand-orange opacity-40">
                                <Camera size={32} className="mx-auto mb-2" />
                                <span className="text-xs font-black uppercase tracking-tighter">Classroom Fun</span>
                            </div>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-premium aspect-square bg-brand-green/10 flex items-center justify-center p-4">
                            <div className="text-center text-brand-green opacity-40">
                                <Star size={32} className="mx-auto mb-2" />
                                <span className="text-xs font-black uppercase tracking-tighter">Art & Craft</span>
                            </div>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="rounded-3xl overflow-hidden shadow-premium aspect-square bg-primary-yellow/10 flex items-center justify-center p-4">
                            <div className="text-center text-primary-yellow opacity-40">
                                <Heart size={32} className="mx-auto mb-2" />
                                <span className="text-xs font-black uppercase tracking-tighter">Playtime</span>
                            </div>
                        </div>
                        <div className="rounded-3xl overflow-hidden shadow-premium aspect-[4/5] bg-primary-blue/10 flex items-center justify-center p-4">
                            <div className="text-center text-primary-blue opacity-40">
                                <Users size={32} className="mx-auto mb-2" />
                                <span className="text-xs font-black uppercase tracking-tighter">Outdoor Activity</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

const SafetySection = () => {
    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="container-custom">
                <div className="bg-primary-blue rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-12 lg:p-16 text-white grid lg:grid-cols-2 gap-10 items-center relative z-10">
                    <div className="space-y-6 sm:space-y-8">
                        <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-2 rounded-full border border-white/20">
                            <Shield size={16} className="text-primary-yellow sm:w-18 sm:h-18" />
                            <span className="text-[10px] sm:text-sm font-bold uppercase tracking-widest leading-none">Safety First Always</span>
                        </div>
                        <h2 className="text-2xl sm:text-4xl md:text-5xl font-black leading-tight sm:leading-snug">Our Parent Promise: Your Child is Safe With Us.</h2>
                        <p className="text-brand-sky text-base sm:text-lg opacity-90 leading-relaxed font-medium">
                            We understand that safety is your #1 priority. At SHREENIKETAN, we've implemented multi-layered security and hygiene protocols to ensure a worry-free environment.
                        </p>

                        <ul className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                            {[
                                "24x7 CCTV & Alert Monitoring",
                                "Secure Identity-Based Pickup",
                                "Verified & Trained Staff",
                                "High-Level Campus Hygiene",
                                "First-Aid & Emergency Ready",
                                "Fire Safety & Drill Protocols"
                            ].map(item => (
                                <li key={item} className="flex items-center gap-3 group">
                                    <CheckCircle2 size={20} className="text-primary-yellow flex-shrink-0 group-hover:scale-110 transition-transform" />
                                    <span className="font-bold text-sm sm:text-base">{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Styled Pledge Card */}
                    <div className="bg-white p-8 md:p-10 rounded-[2rem] text-primary-blue shadow-premium border-l-8 border-primary-yellow relative overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-10">
                            <Award size={120} />
                        </div>
                        <h3 className="text-2xl font-black mb-4 flex items-center gap-3">
                            <Star fill="#fdb913" className="text-primary-yellow" /> The Parent Pledge
                        </h3>
                        <p className="text-xl italic font-serif leading-relaxed mb-6 text-text-secondary">
                            "We pledge to provide an environment that is as loving as a home and as disciplined as a temple of learning, where every child's physical and emotional well-being is our sacred duty."
                        </p>
                        <div className="flex items-center gap-4">
                            <div className="w-16 h-1 bg-primary-blue/20"></div>
                            <span className="font-bold uppercase tracking-widest text-xs">Director, SHREENIKETAN</span>
                        </div>
                    </div>
                </div>
            </div>
            {/* Background Decor */}
            <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-brand-sky/30 rounded-full blur-[100px] -z-0"></div>
        </section>
    );
};

const DrAdvice = () => {
    const tips = [
        {
            title: "Sleep & Brain Growth",
            text: "Children aged 2-6 need 10-13 hours of sleep for optimal memory and cognitive development.",
            icon: <Clock className="text-primary-blue" size={20} />
        },
        {
            title: "Healthy Screen Habits",
            text: "Limit recreational screen time to under 1 hour daily to encourage physical play and social skills.",
            icon: <Shield className="text-brand-orange" size={20} />
        },
        {
            title: "Balanced Nutrition",
            text: "Focus on whole grains, colorful veggies, and calcium-rich foods for strong bones and immunity.",
            icon: <Heart className="text-brand-green" size={20} />
        }
    ];

    return (
        <section className="section-padding bg-white relative overflow-hidden">
            <div className="container-custom">
                <div className="flex flex-col lg:flex-row gap-12 items-start">
                    {/* Main Content Area */}
                    <div className="lg:w-2/3 space-y-10 order-2 lg:order-1">
                        <div className="space-y-4">
                            <h4 className="text-brand-green font-black uppercase tracking-widest text-xs sm:text-sm">Health & Wellness</h4>
                            <h2 className="text-3xl md:text-5xl font-black text-primary-blue leading-tight">Expert Guidance for Your Child's Growth</h2>
                            <p className="text-base sm:text-lg text-text-secondary leading-relaxed font-medium">
                                We partner with leading child specialists to ensure your child's physical and emotional well-being is nurtured alongside their academic journey.
                            </p>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-6">
                            <div className="card-premium p-6 sm:p-8 bg-brand-sky/10 border-none hover:bg-brand-sky/20 transition-colors">
                                <h3 className="text-lg sm:text-xl font-black text-primary-blue mb-3">Emotional Resilience</h3>
                                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">Validating a child's feelings helps them build strong emotional intelligence and confidence to face new challenges.</p>
                            </div>
                            <div className="card-premium p-6 sm:p-8 bg-primary-yellow/10 border-none hover:bg-primary-yellow/20 transition-colors">
                                <h3 className="text-lg sm:text-xl font-black text-primary-blue mb-3">Motor Skills</h3>
                                <p className="text-sm sm:text-base text-text-secondary leading-relaxed font-medium">Daily activities like drawing, puzzles, and outdoor play are essential for fine and gross motor co-ordination.</p>
                            </div>
                        </div>
                    </div>

                    {/* Right Sidebar: Dr. Tips Snippets */}
                    <aside className="lg:w-1/3 w-full order-1 lg:order-2">
                        <div className="bg-brand-grey/50 rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-8 border-2 border-dashed border-primary-blue/10">
                            <div className="flex items-center gap-3 mb-8">
                                <div className="p-3 bg-white rounded-2xl shadow-sm text-primary-blue">
                                    <ShieldCheck size={24} />
                                </div>
                                <h3 className="text-xl sm:text-2xl font-black text-primary-blue tracking-tight">Dr. Tips Corner</h3>
                            </div>

                            <div className="space-y-8">
                                {tips.map((tip, idx) => (
                                    <div key={idx} className="group relative">
                                        <div className="flex gap-4">
                                            <div className="mt-1 flex-shrink-0 p-2 bg-white rounded-lg shadow-sm group-hover:bg-primary-yellow/20 transition-colors">
                                                {tip.icon}
                                            </div>
                                            <div>
                                                <h4 className="text-sm sm:text-base font-black text-primary-blue mb-1 group-hover:text-brand-orange transition-colors">{tip.title}</h4>
                                                <p className="text-xs sm:text-sm text-text-secondary font-semibold leading-relaxed">{tip.text}</p>
                                            </div>
                                        </div>
                                        {idx !== tips.length - 1 && (
                                            <div className="h-px bg-primary-blue/5 w-full mt-8"></div>
                                        )}
                                    </div>
                                ))}
                            </div>

                            <button className="w-full mt-10 py-4 bg-primary-blue text-white rounded-xl sm:rounded-2xl font-black text-xs sm:text-sm uppercase tracking-widest hover:bg-brand-orange transition-all shadow-lg active:scale-95">
                                Ask Our Expert
                            </button>
                        </div>
                    </aside>
                </div>
            </div>
        </section>
    );
};

const GallerySection = () => {
    // Labels for placeholders
    const items = [
        { label: "Morning Assembly", size: "md:col-span-2 md:row-span-2" },
        { label: "Science Lab", size: "" },
        { label: "Art Studio", size: "" },
        { label: "Play Area", size: "md:col-span-1 md:row-span-2" },
        { label: "Library Corner", size: "" },
        { label: "Yoga Session", size: "" },
        { label: "Lunch Time", size: "" },
        { label: "Graduation Day", size: "md:col-span-2" },
    ];

    return (
        <section id="gallery" className="section-padding">
            <div className="container-custom">
                <div className="text-center mb-16 space-y-4">
                    <h4 className="text-brand-orange font-bold uppercase tracking-widest text-sm">Visual Glimpse</h4>
                    <h2 className="text-3xl md:text-5xl font-black text-primary-blue">Life at SHREENIKETAN</h2>
                    <div className="w-24 h-1.5 bg-brand-green mx-auto rounded-full"></div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 auto-rows-[160px] sm:auto-rows-[200px]">
                    {items.map((item, idx) => (
                        <div key={idx} className={`relative group overflow-hidden rounded-xl sm:rounded-2xl bg-brand-grey border border-slate-100 ${item.size}`}>
                            <div className="absolute inset-0 flex items-center justify-center bg-brand-sky/20 transition-all duration-500 group-hover:bg-primary-blue/80 px-2">
                                <span className="opacity-40 group-hover:opacity-100 group-hover:scale-110 transition-all duration-500 font-black text-primary-blue group-hover:text-white uppercase tracking-widest text-[9px] sm:text-xs md:text-sm p-2 text-center">
                                    {item.label}
                                </span>
                            </div>
                            <div className="absolute bottom-2 right-2 sm:bottom-4 sm:right-4 bg-white/20 p-1.5 sm:p-2 rounded-lg backdrop-blur-md opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera size={14} className="text-white sm:w-18 sm:h-18" />
                            </div>
                        </div>
                    ))}
                </div>

                <div className="mt-12 text-center">
                    <button className="btn-outline border-slate-200">View Full Gallery →</button>
                </div>
            </div>
        </section>
    );
}

const Testimonials = () => {
    const reviews = [
        {
            name: "Mrs. Aditi Naik",
            role: "Nursery Parent",
            content: "The transformation in my daughter's confidence is amazing. The teachers are so warm and the 'Hello Parent' app keeps me updated through the day!",
            rating: 5
        },
        {
            name: "Mr. Rohan Fernandes",
            role: "Jr. KG Parent",
            content: "Best decision for our son! The school feels very premium yet very approachable. Security is Top-notch which gives us complete peace of mind.",
            rating: 5
        },
        {
            name: "Mrs. Sneha Desai",
            role: "Playgroup Parent",
            content: "Excellent infrastructure and safety. My little one actually looks forward to school every morning. The teachers really care about each child.",
            rating: 5
        }
    ];

    return (
        <section id="testimonials" className="section-padding bg-brand-sky/20">
            <div className="container-custom">
                <div className="text-center mb-16 space-y-4">
                    <h2 className="text-3xl md:text-5xl font-black text-primary-blue">What Our Parents Say</h2>
                    <p className="text-text-secondary md:text-lg font-medium">Real stories from our school family</p>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                    {reviews.map((rev, idx) => (
                        <div key={idx} className="card-premium p-8 sm:p-10 flex flex-col relative overflow-hidden group">
                            <div className="absolute top-6 right-8 text-brand-orange opacity-10 group-hover:opacity-20 transition-opacity">
                                <span className="text-6xl font-black italic">"</span>
                            </div>
                            <div className="flex gap-1 mb-5 sm:mb-6">
                                {[...Array(rev.rating)].map((_, i) => (
                                    <Star key={i} size={16} fill="#fdb913" className="text-primary-yellow" />
                                ))}
                            </div>
                            <p className="text-text-dark text-base sm:text-lg leading-relaxed mb-6 sm:mb-8 italic font-medium">"{rev.content}"</p>
                            <div className="mt-auto flex items-center gap-4 border-t border-slate-50 pt-6">
                                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-primary-blue text-white rounded-full flex items-center justify-center font-black text-sm uppercase shadow-inner">
                                    {rev.name.charAt(0)}
                                </div>
                                <div>
                                    <h4 className="font-black text-primary-blue text-sm sm:text-base">{rev.name}</h4>
                                    <span className="text-[10px] sm:text-xs font-black text-brand-orange uppercase tracking-widest">{rev.role}</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const Events = () => {
    const activities = [
        {
            date: "25 Feb",
            title: "Annual Sports Fiesta",
            desc: "A day of fun, games, and physical activity for all age groups.",
            tag: "Outdoor"
        },
        {
            date: "12 Mar",
            title: "Mothers' Forum Workshop",
            desc: "An interactive parenting workshop focused on nutrition and growth.",
            tag: "Parenting"
        },
        {
            date: "20 Mar",
            title: "Holi Celebration Week",
            desc: "Celebrating with eco-friendly colors and traditional sweets.",
            tag: "Festive"
        },
    ];

    return (
        <section id="events" className="section-padding">
            <div className="container-custom">
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                    <div className="space-y-4">
                        <h4 className="text-brand-orange font-bold uppercase tracking-widest text-sm">Happenings</h4>
                        <h2 className="text-3xl md:text-5xl font-black text-primary-blue leading-tight">Events & Activities</h2>
                    </div>
                    <button className="flex items-center gap-2 text-primary-blue font-bold group">
                        View All Activities <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                </div>

                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {activities.map((item, idx) => (
                        <div key={idx} className="group cursor-pointer">
                            <div className="aspect-[16/10] bg-brand-sky rounded-2xl mb-5 relative overflow-hidden flex items-center justify-center border border-slate-100 group-hover:scale-[1.02] transition-transform duration-300 shadow-sm">
                                <div className="text-primary-blue/30 flex flex-col items-center gap-2">
                                    <Camera size={32} />
                                    <span className="font-black uppercase tracking-tighter text-[10px]">Event Image</span>
                                </div>
                                <div className="absolute top-3 left-3 bg-white px-3 py-1.5 rounded-xl shadow-lg border border-slate-50 text-center">
                                    <span className="block text-lg font-black text-primary-blue leading-none">{item.date.split(' ')[0]}</span>
                                    <span className="block text-[8px] sm:text-[10px] font-black text-brand-orange uppercase tracking-widest">{item.date.split(' ')[1]}</span>
                                </div>
                            </div>
                            <div className="space-y-2 px-1">
                                <span className="text-[10px] font-black text-brand-green uppercase tracking-[0.2em] bg-brand-green/10 px-3 py-1.5 rounded-lg inline-block">
                                    {item.tag}
                                </span>
                                <h3 className="text-lg sm:text-xl font-black text-primary-blue leading-snug group-hover:text-brand-orange transition-colors">{item.title}</h3>
                                <p className="text-sm sm:text-base text-text-secondary font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const AdmissionCTA = () => {
    return (
        <section id="admissions" className="section-padding bg-primary-blue relative overflow-hidden">
            <div className="container-custom grid lg:grid-cols-2 gap-16 relative z-10">
                {/* Left Side */}
                <div className="text-white space-y-8 sm:space-y-10">
                    <div className="space-y-4">
                        <h2 className="text-3xl sm:text-5xl md:text-6xl font-black leading-tight sm:leading-snug">Admissions Open <br /><span className="text-primary-yellow">for 2025–26</span></h2>
                        <div className="w-20 sm:w-24 h-1.5 bg-primary-yellow rounded-full"></div>
                    </div>

                    <p className="text-brand-sky text-xl leading-relaxed font-medium">
                        Join Goa's premier pre-primary school where we nurture every child's unique potential using NEP 2020 guidelines. Limited seats available for Playgroup to Sr. KG.
                    </p>

                    <div className="grid sm:grid-cols-2 lg:flex lg:flex-col gap-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20">
                                <Award className="text-primary-yellow" />
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-black">Limited Seats Available</h4>
                                <p className="text-sm sm:text-base text-brand-sky opacity-80 font-medium">Small class sizes for personalized care.</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="bg-white/10 p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-white/20">
                                <Users className="text-brand-green" />
                            </div>
                            <div>
                                <h4 className="text-lg sm:text-xl font-black">Age Group: 2–6 Years</h4>
                                <p className="text-sm sm:text-base text-brand-sky opacity-80 font-medium">Holistic early development programs.</p>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white/5 rounded-[2rem] border border-white/10">
                        <p className="font-bold flex items-center gap-3">
                            <Phone className="text-primary-yellow" /> Call for quick enquiry: 7822994864
                        </p>
                    </div>
                </div>

                {/* Right Side: Enquiry Form */}
                <div className="bg-white rounded-[1.5rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-12 shadow-2xl relative overflow-hidden group">
                    <div className="absolute -top-10 -right-10 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
                        <Mail size={160} />
                    </div>
                    <div className="relative mb-8">
                        <h3 className="text-xl sm:text-2xl font-black text-primary-blue">Schedule a Visit</h3>
                        <p className="text-xs sm:text-sm text-text-secondary font-medium mt-1">Fill out the form to book an appointment.</p>
                    </div>
                    <form className="space-y-4 sm:space-y-5" onSubmit={(e) => e.preventDefault()}>
                        <div className="grid sm:grid-cols-2 gap-4 sm:gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] sm:text-xs font-black uppercase text-text-secondary tracking-widest ml-1">Parent Name</label>
                                <input type="text" placeholder="Your Full Name" className="w-full bg-brand-grey/50 border-none rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 focus:ring-2 focus:ring-primary-yellow outline-none transition-all font-semibold text-sm sm:text-base" />
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] sm:text-xs font-black uppercase text-text-secondary tracking-widest ml-1">Phone Number</label>
                                <input type="tel" placeholder="+91" className="w-full bg-brand-grey/50 border-none rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 focus:ring-2 focus:ring-primary-yellow outline-none transition-all font-semibold text-sm sm:text-base" />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] sm:text-xs font-black uppercase text-text-secondary tracking-widest ml-1">Email Address</label>
                            <input type="email" placeholder="example@email.com" className="w-full bg-brand-grey/50 border-none rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 focus:ring-2 focus:ring-primary-yellow outline-none transition-all font-semibold text-sm sm:text-base" />
                        </div>
                        <div className="grid grid-cols-2 gap-4 sm:gap-5">
                            <div className="space-y-1.5">
                                <label className="text-[10px] sm:text-xs font-black uppercase text-text-secondary tracking-widest ml-1">Child's Age</label>
                                <select className="w-full bg-brand-grey/50 border-none rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 focus:ring-2 focus:ring-primary-yellow outline-none transition-all font-semibold text-sm sm:text-base appearance-none">
                                    <option>2–3 Years</option>
                                    <option>3–4 Years</option>
                                    <option>4–5 Years</option>
                                    <option>5–6 Years</option>
                                </select>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] sm:text-xs font-black uppercase text-text-secondary tracking-widest ml-1">Program</label>
                                <select className="w-full bg-brand-grey/50 border-none rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 focus:ring-2 focus:ring-primary-yellow outline-none transition-all font-semibold text-sm sm:text-base appearance-none">
                                    <option>Playgroup</option>
                                    <option>Nursery</option>
                                    <option>Junior KG</option>
                                    <option>Senior KG</option>
                                </select>
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-[10px] sm:text-xs font-black uppercase text-text-secondary tracking-widest ml-1">Message (Optional)</label>
                            <textarea placeholder="Tell us more..." rows="2" className="w-full bg-brand-grey/50 border-none rounded-xl sm:rounded-2xl px-5 py-3.5 sm:px-6 sm:py-4 focus:ring-2 focus:ring-primary-yellow outline-none transition-all font-semibold text-sm sm:text-base resize-none"></textarea>
                        </div>
                        <button className="btn-primary w-full py-4 sm:py-5 text-sm sm:text-lg flex items-center justify-center gap-3 shadow-xl">
                            Submit Enquiry <ArrowRight size={20} />
                        </button>
                        <p className="text-center text-[10px] sm:text-xs font-black text-text-secondary opacity-40 uppercase tracking-widest">Confidential & Secure</p>
                    </form>
                </div>
            </div>
            {/* Background Texture */}
            <div className="absolute inset-0 pointer-events-none opacity-5 flex items-center justify-center">
                <div className="w-[150%] h-[150%] border-[40px] border-white rounded-full"></div>
            </div>
        </section>
    );
}

const Footer = () => {
    return (
        <footer id="footer" className="section-padding bg-brand-grey/40 pb-10">
            <div className="container-custom">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
                    {/* Brand Info */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-primary-yellow rounded-full flex items-center justify-center font-bold text-primary-blue text-lg">
                                SN
                            </div>
                            <span className="font-bold text-primary-blue leading-tight uppercase tracking-tighter">
                                SHREENIKETAN <br /> Education
                            </span>
                        </div>
                        <p className="text-text-secondary font-medium leading-relaxed">
                            A premium pre-primary education center in Goa, dedicated to the holistic growth and safety of every child.
                        </p>
                        <div className="flex gap-4">
                            {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                                <a key={idx} href="#" className="w-10 h-10 bg-white shadow-sm rounded-full flex items-center justify-center transition-all hover:bg-primary-blue hover:text-white group">
                                    <Icon size={20} className="text-primary-blue group-hover:text-white" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-lg font-black text-primary-blue mb-6 border-b-2 border-primary-yellow w-fit pb-1">Quick Links</h4>
                        <ul className="space-y-4 font-bold text-text-secondary">
                            {[
                                { name: "Why Us", href: "#why-choose" },
                                { name: "Programs", href: "#programs" },
                                { name: "About Us", href: "#about" },
                                { name: "Gallery", href: "#gallery" },
                                { name: "Parents", href: "#testimonials" },
                                { name: "Events", href: "#events" },
                                { name: "Contact", href: "#admissions" },
                            ].map(link => (
                                <li key={link.name}>
                                    <a href={link.href} className="hover:text-brand-orange transition-colors flex items-center gap-2">
                                        <ChevronRight size={14} /> {link.name}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-black text-primary-blue mb-6 border-b-2 border-primary-yellow w-fit pb-1">Get in Touch</h4>
                        <div className="space-y-5 font-bold text-text-secondary">
                            <div className="flex gap-4">
                                <MapPin className="text-brand-orange flex-shrink-0" />
                                <span>Goa, India (Check specific location)</span>
                            </div>
                            <div className="flex gap-4">
                                <Phone className="text-brand-green flex-shrink-0" />
                                <span>+91 7822994864</span>
                            </div>
                            <div className="flex gap-4">
                                <Mail className="text-primary-blue flex-shrink-0" />
                                <span>contact@shreeniketan.com</span>
                            </div>
                        </div>
                    </div>

                    {/* Certifications / Logos */}
                    <div className="space-y-6">
                        <h4 className="text-lg font-black text-primary-blue mb-6 border-b-2 border-primary-yellow w-fit pb-1">Recognition</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center shadow-sm p-4 border border-slate-100 flex-col gap-2">
                                <ShieldCheck className="text-brand-green" />
                                <span className="text-[10px] text-center font-black uppercase text-text-secondary">NEP 2020 Aligned</span>
                            </div>
                            <div className="aspect-square bg-white rounded-2xl flex items-center justify-center shadow-sm p-4 border border-slate-100 flex-col gap-2">
                                <Award className="text-primary-yellow" />
                                <span className="text-[10px] text-center font-black uppercase text-text-secondary">Safe Campus</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-10 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4 text-sm font-bold text-text-secondary">
                    <p>Copyright © 2025 SHREENIKETAN Child Care. All rights reserved.</p>
                    <div className="flex gap-6 uppercase tracking-widest text-[10px]">
                        <a href="#" className="hover:text-primary-blue">Privacy Policy</a>
                        <a href="#" className="hover:text-primary-blue">Terms & Conditions</a>
                    </div>
                </div>
            </div>
        </footer>
    );
}

const FloatingWhatsApp = () => {
    return (
        <a
            href="https://wa.me/917822994864?text=Hello%20SHREENIKETAN,%20I%20would%20like%20to%20enquire%20about%20admissions%20for%20my%20child."
            target="_blank"
            rel="noopener noreferrer"
            className="fixed bottom-8 right-8 z-50 bg-[#25D366] text-white p-4 rounded-full shadow-premium hover:scale-110 transition-transform flex items-center justify-center group"
        >
            <Phone fill="currentColor" size={28} />
            <span className="max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-xs transition-all duration-500 font-bold ml-0 group-hover:ml-3">
                WhatsApp Us
            </span>
        </a>
    );
}

const BackToTop = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 500);
        };
        window.addEventListener("scroll", toggleVisibility);
        return () => window.removeEventListener("scroll", toggleVisibility);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    if (!isVisible) return null;

    return (
        <button
            onClick={scrollToTop}
            className="fixed bottom-24 right-6 z-40 bg-primary-blue text-white p-3.5 rounded-full shadow-premium hover:bg-brand-orange transition-all duration-300 animate-in slide-in-from-bottom-5 sm:bottom-28 sm:right-8 sm:p-4"
        >
            <ChevronRight size={20} className="-rotate-90 sm:w-6 sm:h-6" />
        </button>
    );
};

// --- Admissions Modal ---

const AdmissionsModal = ({ isOpen, onClose }) => {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 sm:p-4 bg-primary-blue/60 backdrop-blur-sm animate-in fade-in duration-300">
            <div className="relative bg-white rounded-[1.5rem] sm:rounded-[2.5rem] w-full max-w-2xl max-h-[95vh] overflow-y-auto shadow-2xl animate-in zoom-in-95 duration-300">
                {/* Close Button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 sm:top-6 sm:right-6 text-primary-dark/40 hover:text-brand-orange transition-colors z-[110] bg-white/80 p-1 rounded-full backdrop-blur-sm"
                >
                    <X size={28} className="sm:w-8 sm:h-8" />
                </button>

                <div className="grid md:grid-cols-5 h-full">
                    {/* Left Accent */}
                    <div className="hidden md:flex md:col-span-2 bg-primary-blue p-8 flex-col justify-between text-white relative">
                        <div className="space-y-4">
                            <div className="w-12 h-12 bg-primary-yellow rounded-full flex items-center justify-center font-bold text-primary-blue text-xl shadow-lg">SN</div>
                            <h3 className="text-3xl font-black leading-tight">Admissions <br /><span className="text-primary-yellow">Open</span></h3>
                        </div>
                        <div className="space-y-2 opacity-80 text-sm font-bold uppercase tracking-widest bg-white/10 p-4 rounded-xl border border-white/10">
                            <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary-yellow" /> Ages 2–6 Years</p>
                            <p className="flex items-center gap-2"><CheckCircle2 size={14} className="text-primary-yellow" /> NEP 2020 Aligned</p>
                        </div>
                    </div>

                    {/* Right Form */}
                    <div className="md:col-span-3 p-8 md:p-10">
                        <div className="mb-8">
                            <h4 className="text-2xl font-black text-primary-blue flex items-center gap-2">
                                <Mail className="text-brand-orange" /> Enquire Now
                            </h4>
                            <p className="text-sm text-text-secondary font-medium mt-1">Limited seats for the 2025-26 session.</p>
                        </div>

                        <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); onClose(); }}>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest ml-1">Parent Name</label>
                                <input required type="text" placeholder="Full Name" className="w-full bg-brand-grey/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary-yellow outline-none transition-all font-semibold text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest ml-1">Phone Number</label>
                                <input required type="tel" placeholder="+91" className="w-full bg-brand-grey/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary-yellow outline-none transition-all font-semibold text-sm" />
                            </div>
                            <div className="space-y-1">
                                <label className="text-[10px] font-black uppercase text-text-secondary tracking-widest ml-1">Class Interested In</label>
                                <select className="w-full bg-brand-grey/50 border-none rounded-2xl px-5 py-4 focus:ring-2 focus:ring-primary-yellow outline-none transition-all font-semibold text-sm appearance-none">
                                    <option>Playgroup (2-3Y)</option>
                                    <option>Nursery (3-4Y)</option>
                                    <option>Junior KG (4-5Y)</option>
                                    <option>Senior KG (5-6Y)</option>
                                </select>
                            </div>
                            <button className="btn-primary w-full py-5 mt-4 text-base shadow-xl group flex items-center justify-center gap-3">
                                Submit Enquiry <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                            </button>
                            <p className="text-[10px] text-center text-text-secondary font-bold uppercase opacity-40">Ready to help 24/7</p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

// --- Main App ---

export default function App() {
    const [showModal, setShowModal] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowModal(true);
        }, 2500);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="relative selection:bg-primary-yellow selection:text-primary-blue">
            <Header />
            <main>
                <Hero />
                <TrustBar />
                <WhyChooseUs />
                <Programs />
                <AboutSection />
                <SafetySection />
                <DrAdvice />
                <GallerySection />
                <Testimonials />
                <Events />
                <AdmissionCTA />
            </main>
            <Footer />
            <FloatingWhatsApp />
            <BackToTop />
            <AdmissionsModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
    );
}
