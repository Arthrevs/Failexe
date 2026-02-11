<<<<<<< HEAD
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lenis from 'lenis';
import './landing/landing.css';

import {
    AuroraBackground,
    AnimatedArrow,
    ThreeJsBackground,
    Navigation,
    MarketTicker,
    HeroSection,
    AnalysisCard,
    FeaturesSection,
    DemoSection,
    ConfidenceMeter
} from './landing';

const LandingPage = ({ onNavigate }) => {
    const handleStartAnalysis = () => {
        if (onNavigate) {
            onNavigate('wizard', { type: 'analyze' });
        }
    };

    const handleDemoAnalyze = (ticker) => {
        if (onNavigate) {
            onNavigate('wizard', { type: 'analyze', ticker });
        }
    };

    useEffect(() => {
        // Initialize Lenis
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
        });

        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        requestAnimationFrame(raf);

        // Intersection Observer for fade-in animations
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible');
                    }
                });
            },
            { threshold: 0.1 }
        );

        const fadeElements = document.querySelectorAll('.fade-in-section');
        fadeElements.forEach((el) => observer.observe(el));

        return () => {
            lenis.destroy();
            observer.disconnect();
        };
    }, []);

    return (
        <div className="relative min-h-screen text-white font-sans overflow-x-hidden">
            {/* Background layers */}
            <AuroraBackground />
            <ThreeJsBackground />

            {/* Content - increased z-index */}
            <div className="relative z-10 container mx-auto px-4 sm:px-10">
                <Navigation />

                <div className="relative fade-in-section">

                    <HeroSection onStartAnalysis={handleStartAnalysis} />
                </div>

                {/* Confidence Meter */}
                <div className="fade-in-section mb-20">
                    <ConfidenceMeter />
                </div>

                {/* Analysis Cards Section */}
                <section className="analysis-section fade-in-section" id="products">
                    <motion.div
                        className="section-header"
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, margin: "-100px" }}
                        transition={{ duration: 0.8 }}
                    >
                        <div className="section-label">ANALYSIS MODES</div>
                        <h2 className="section-title">Three Ways to Win</h2>
                        <p className="section-description">
                            From instant verdicts to deep research, TrackBets adapts to your trading style
                        </p>
                    </motion.div>

                    <div className="analysis-grid pb-20">
                        <AnalysisCard
                            id="analyze-card"
                            variant="green"
                            icon="📈"
                            title="Analyze"
                            description="Get an instant Buy/Sell/Hold verdict powered by real-time data, sentiment analysis, and AI-driven insights. Make confident decisions in seconds."
                            onAction={() => onNavigate && onNavigate('wizard', { type: 'analyze' })}
                            actionLabel="Start Analysis"
                        />
                        <AnalysisCard
                            id="risk-card"
                            variant="red"
                            icon="⚠️"
                            title="Risk Check"
                            description="Detect potential crashes, negative sentiment spikes, and volatility warnings before they impact your portfolio. Stay protected, stay informed."
                            onAction={() => onNavigate && onNavigate('wizard', { type: 'risk' })}
                            actionLabel="Check Risk"
                        />
                        <AnalysisCard
                            id="deepdive-card"
                            variant="blue"
                            icon="🧠"
                            title="Deep Dive"
                            description="Read the full reasoning behind every verdict. Explore cited sources, AI thought process, and comprehensive market analysis. Knowledge is power."
                            onAction={() => onNavigate && onNavigate('wizard', { type: 'deepdive' })}
                            actionLabel="Deep Dive"
                        />
                    </div>
                </section>

                <div className="fade-in-section">
                    <FeaturesSection />
                </div>

            </div>
=======
import React from 'react';
import { TrendingUp, AlertTriangle, FileText, ChevronRight, Cpu, Globe, Brain, Zap, Target, Diamond } from 'lucide-react';

const LandingPage = ({ onNavigate }) => {
    // Analysis Mode Cards
    const analysisOptions = [
        {
            id: 'buy',
            type: 'buy',
            icon: TrendingUp,
            title: 'Analyze',
            subtitle: 'Get an instant Buy/Sell/Hold verdict.',
            gradient: 'from-green-500/20 via-green-500/10 to-transparent',
            iconBg: 'bg-linear-to-br from-green-500/30 to-green-600/20',
            iconColor: 'text-green-400',
            glowColor: 'group-hover:shadow-[0_0_30px_rgba(90,197,59,0.3)]',
            borderGlow: 'group-hover:border-green-500/40'
        },
        {
            id: 'sell',
            type: 'sell',
            icon: AlertTriangle,
            title: 'Risk Check',
            subtitle: 'Detect potential crashes & negative sentiment.',
            gradient: 'from-red-500/20 via-red-500/10 to-transparent',
            iconBg: 'bg-linear-to-br from-red-500/30 to-red-600/20',
            iconColor: 'text-red-400',
            glowColor: 'group-hover:shadow-[0_0_30px_rgba(255,82,82,0.3)]',
            borderGlow: 'group-hover:border-red-500/40'
        },
        {
            id: 'track',
            type: 'track',
            icon: FileText,
            title: 'Deep Dive',
            subtitle: "Read the full reasoning behind the AI's decision.",
            gradient: 'from-blue-500/20 via-blue-500/10 to-transparent',
            iconBg: 'bg-linear-to-br from-blue-500/30 to-blue-600/20',
            iconColor: 'text-blue-400',
            glowColor: 'group-hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]',
            borderGlow: 'group-hover:border-blue-500/40'
        }
    ];

    // Footer Stats
    const features = [
        { icon: Cpu, value: '100%', label: 'AI Driven', color: 'text-yellow-400' },
        { icon: Globe, value: 'NSE & BSE', label: 'Supported', color: 'text-blue-400' },
        { icon: Brain, value: 'GEMINI', label: '1.5 Pro Powered', color: 'text-purple-400' }
    ];

    // How It Works Steps
    const howItWorks = [
        {
            icon: Globe,
            title: 'Ingest',
            description: 'Scrapes live prices, news, and Reddit discussions.',
            color: 'text-cyan-400',
            bgColor: 'from-cyan-500/20 to-cyan-600/10',
            glowColor: 'shadow-[0_0_40px_rgba(34,211,238,0.15)]'
        },
        {
            icon: Zap,
            title: 'Process',
            description: 'AI analyzes thousands of data points for hidden signals.',
            color: 'text-purple-400',
            bgColor: 'from-purple-500/20 to-purple-600/10',
            glowColor: 'shadow-[0_0_40px_rgba(168,85,247,0.15)]'
        },
        {
            icon: Target,
            title: 'Verdict',
            description: 'Delivers a clear, actionable confidence score.',
            color: 'text-emerald-400',
            bgColor: 'from-emerald-500/20 to-emerald-600/10',
            glowColor: 'shadow-[0_0_40px_rgba(52,211,153,0.15)]'
        }
    ];

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 py-12 relative z-10 fade-in">
            {/* Background accent */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-linear-to-br from-purple-500/5 via-blue-500/5 to-green-500/5 rounded-full blur-3xl" />
            </div>

            {/* Hero Section */}
            <div className="text-center mb-12 relative">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-6">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    <span className="text-xs text-gray-400 font-medium">Live Market Data</span>
                </div>

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
                    <span className="text-white">Your Personal Hedge Fund Analyst.</span>
                    <br />
                    <span className="text-gradient">For Free.</span>
                </h1>

                <p className="text-gray-400 text-lg max-w-2xl mx-auto font-normal leading-relaxed">
                    We combine real-time price action, global news, and social sentiment
                    <br className="hidden md:block" />
                    <span className="text-gray-500">into a single, AI-powered buy/sell verdict.</span>
                </p>
            </div>

            {/* Analysis Modes Label */}
            <div className="mb-6">
                <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Analysis Modes</span>
            </div>

            {/* Analysis Mode Cards */}
            <div className="flex flex-wrap justify-center gap-4 max-w-3xl w-full mb-16">
                {analysisOptions.map((option) => {
                    const Icon = option.icon;
                    return (
                        <button
                            key={option.id}
                            onClick={() => onNavigate('wizard', { type: option.type })}
                            className={`group relative flex items-center gap-4 px-6 py-4 rounded-2xl 
                                bg-linear-to-r ${option.gradient} 
                                border border-white/10 ${option.borderGlow}
                                ${option.glowColor}
                                transition-all duration-300 
                                hover:scale-[1.03] hover:-translate-y-1
                                active:scale-[0.98]
                                min-w-[260px]`}
                        >
                            <div className={`w-11 h-11 rounded-xl ${option.iconBg} flex items-center justify-center ${option.iconColor} transition-transform group-hover:scale-110`}>
                                <Icon size={20} strokeWidth={2.5} />
                            </div>
                            <div className="text-left flex-1">
                                <div className="text-base font-semibold text-white">{option.title}</div>
                                <div className="text-sm text-gray-500">{option.subtitle}</div>
                            </div>
                            <ChevronRight size={18} className="text-gray-600 group-hover:translate-x-1 group-hover:text-white transition-all" />
                        </button>
                    );
                })}
            </div>

            {/* How It Works Section */}
            <div className="w-full max-w-4xl mb-16">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold text-white mb-2">How It Works</h2>
                    <p className="text-gray-500 text-sm">Three steps to smarter decisions</p>
                </div>

                <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-6">
                    {howItWorks.map((step, index) => {
                        const Icon = step.icon;
                        return (
                            <React.Fragment key={step.title}>
                                <div className={`group relative flex flex-col items-center text-center p-6 rounded-2xl 
                                    bg-linear-to-br ${step.bgColor} 
                                    border border-white/10 
                                    ${step.glowColor}
                                    transition-all duration-300
                                    hover:scale-[1.02] hover:-translate-y-1
                                    w-full md:w-1/3 max-w-[280px]`}
                                >
                                    {/* Step Number */}
                                    <div className="absolute -top-3 -left-3 w-7 h-7 rounded-full bg-gray-900 border border-white/20 flex items-center justify-center">
                                        <span className="text-xs font-bold text-gray-400">{index + 1}</span>
                                    </div>

                                    <div className={`w-14 h-14 rounded-xl bg-white/5 flex items-center justify-center ${step.color} mb-4 transition-transform group-hover:scale-110`}>
                                        <Icon size={28} strokeWidth={1.5} />
                                    </div>
                                    <h3 className="text-lg font-bold text-white mb-2">{step.title}</h3>
                                    <p className="text-sm text-gray-500 leading-relaxed">{step.description}</p>
                                </div>

                                {/* Arrow between steps (hidden on mobile, hidden after last) */}
                                {index < howItWorks.length - 1 && (
                                    <div className="hidden md:flex items-center justify-center text-gray-600">
                                        <ChevronRight size={24} />
                                    </div>
                                )}
                            </React.Fragment>
                        );
                    })}
                </div>
            </div>

            {/* Feature Highlights / Footer Stats */}
            <div className="flex flex-wrap justify-center gap-12 text-center">
                {features.map((feature, i) => {
                    const Icon = feature.icon;
                    return (
                        <div key={i} className="flex flex-col items-center group">
                            <div className={`mb-3 p-3 rounded-xl bg-white/5 ${feature.color} transition-transform group-hover:scale-110`}>
                                <Icon size={20} />
                            </div>
                            <div className="text-2xl font-bold text-white mb-1">{feature.value}</div>
                            <div className="text-xs text-gray-500 uppercase tracking-wider">{feature.label}</div>
                        </div>
                    );
                })}
            </div>

            {/* Bottom accent line */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-white/10 to-transparent" />
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
        </div>
    );
};

export default LandingPage;
<<<<<<< HEAD
=======

>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
