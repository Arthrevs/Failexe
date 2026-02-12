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

        </div>
    );
};

export default LandingPage;
