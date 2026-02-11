import React, { useState } from 'react';
import Text3DRotate from './Text3DRotate';
import MarketTicker from './MarketTicker';

const HeroSection = ({ onStartAnalysis }) => {
    const [isHovered, setIsHovered] = useState(false);

    return (
        <section className="hero">
            <div
                className="hero-badge-container"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <div className="hero-badge">
                    <span className="live-indicator"></span>
                    Live Market Data
                </div>

                {/* Projector Beam Effect */}
                {isHovered && (
                    <>
                        <div className="projector-beam"></div>
                        <div className="projector-ticker-wrapper">
                            <MarketTicker />
                        </div>
                    </>
                )}
            </div>

            <h1 className="hero-title" style={{ marginBottom: '1rem' }}>
                <Text3DRotate>Your</Text3DRotate>{' '}
                <Text3DRotate>Personal</Text3DRotate>{' '}
                <Text3DRotate>Hedge</Text3DRotate><br />
                <Text3DRotate>Fund</Text3DRotate>{' '}
                <Text3DRotate>Analyst.</Text3DRotate>
            </h1>

            <p className="hero-subtitle">
                We combine real-time price action, global news, and social sentiment into a single, AI-powered buy/sell verdict. Your edge in the market starts here.
            </p>

            <div className="cta-group">

            </div>

        </section>
    );
};

export default HeroSection;

