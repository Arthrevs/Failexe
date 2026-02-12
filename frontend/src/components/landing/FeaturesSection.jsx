import React, { useState } from 'react';
import { motion } from 'framer-motion';
import LiquidBackground from './LiquidBackground';

const FeatureItem = ({ icon, title, description, delay, isHovered, isBlurred, onHover, onLeave }) => (
    <motion.div
        className={`feature-item relative overflow-hidden transition-all duration-500 ease-out ${isHovered ? 'scale-105 z-10 shadow-[0_20px_40px_rgba(0,255,148,0.2)]' : ''} ${isBlurred ? 'blur-[2px] opacity-50 scale-95' : 'opacity-100'}`}
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay }}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        style={{
            background: isHovered ? 'rgba(255, 255, 255, 0.03)' : 'transparent',
            borderColor: isHovered ? 'var(--bullish)' : 'transparent'
        }}
    >
        {isHovered && (
            <motion.div
                className="absolute inset-0 z-0 opacity-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.4 }}
                transition={{ duration: 0.5 }}
            >
                <LiquidBackground color="#00FF94" />
            </motion.div>
        )}

        <div className="relative z-10">
            <div className="feature-icon transform transition-transform duration-500" style={{ transform: isHovered ? 'scale(1.1) rotate(5deg)' : 'none' }}>{icon}</div>
            <h3 className="feature-title text-xl font-bold mb-3">{title}</h3>
            <p className="feature-description text-gray-400 leading-relaxed">{description}</p>
        </div>
    </motion.div>
);

const FeaturesSection = () => {
    const [hoveredIndex, setHoveredIndex] = useState(null);

    const features = [
        {
            icon: "🎯",
            title: "Real-Time Sentiment",
            description: "Twitter, Reddit, and news sentiment analyzed in real-time to catch market moves before they happen"
        },
        {
            icon: "🎨",
            title: "Beautiful Interface",
            description: "Trading tools don't have to be ugly. Experience premium design that makes analysis enjoyable"
        },
        {
            icon: "📊",
            title: "Track Record",
            description: "See our prediction accuracy over time. Transparent performance metrics you can trust"
        },
        {
            icon: "🧠",
            title: "AI Powered",
            description: "We are driven by the power of AI to help you with your choices and help you with your need"
        }
    ];

    return (
        <section className="features-section py-20 relative" id="features">
            <motion.div
                className="section-header text-center mb-16"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
            >
                <motion.div
                    className="section-label text-[#00FF94] font-mono text-sm tracking-widest mb-4 inline-block cursor-pointer"
                    whileHover={{
                        scale: 1.1,
                        textShadow: "0 0 8px rgb(0, 255, 148)",
                        color: "#ffffff"
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    SECRET SAUCE
                </motion.div>
                <h2 className="section-title text-5xl font-bold mb-4">What Makes Us Different</h2>
            </motion.div>

            <div className="features-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 px-4 max-w-7xl mx-auto">
                {features.map((feature, index) => (
                    <FeatureItem
                        key={index}
                        {...feature}
                        delay={index * 0.1}
                        isHovered={hoveredIndex === index}
                        isBlurred={hoveredIndex !== null && hoveredIndex !== index}
                        onHover={() => setHoveredIndex(index)}
                        onLeave={() => setHoveredIndex(null)}
                    />
                ))}
            </div>
        </section>
    );
};

export default FeaturesSection;
