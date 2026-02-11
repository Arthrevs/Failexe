import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import LiquidBackground from './LiquidBackground';

const AnalysisCard = ({ id, variant, icon, title, description, onAction, actionLabel }) => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        cardRef.current.style.setProperty('--mouse-x', `${x}%`);
        cardRef.current.style.setProperty('--mouse-y', `${y}%`);

        // GSAP 3D Tilt
        const xPos = (e.clientX - rect.left) / rect.width;
        const yPos = (e.clientY - rect.top) / rect.height;
        const tiltX = (yPos - 0.5) * 10; // Rotate X axis (up/down)
        const tiltY = (xPos - 0.5) * -10; // Rotate Y axis (left/right) - inverted for natural feel

        gsap.to(cardRef.current, {
            rotationX: tiltX,
            rotationY: tiltY,
            transformPerspective: 1000,
            duration: 0.4,
            ease: "power2.out"
        });
    };

    const handleMouseLeave = () => {
        if (!cardRef.current) return;
        gsap.to(cardRef.current, {
            rotationX: 0,
            rotationY: 0,
            duration: 0.7,
            ease: "elastic.out(1, 0.5)"
        });
    };

    let color, arrowContent;

    switch (variant) {
        case 'green':
            color = '#00FF94';
            arrowContent = (
                <svg className="stock-arrow" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="greenGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#00FF94', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#00CC75', stopOpacity: 0.8 }} />
                        </linearGradient>
                    </defs>
                    <path d="M 20 130 L 20 50 L 50 50 L 50 80 L 80 50 L 110 80 L 110 50 L 140 50 L 140 20 L 110 20 L 80 50 L 50 20 L 20 50 Z"
                        fill="url(#greenGradient)" stroke="#00FF94" strokeWidth="2" />
                    <polygon points="130,25 140,20 140,30" fill="#00FF94" />
                </svg>
            );
            break;
        case 'red':
            color = '#FF0080';
            arrowContent = (
                <svg className="stock-arrow" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="redGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#FF0080', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#CC0066', stopOpacity: 0.8 }} />
                        </linearGradient>
                    </defs>
                    <path d="M 20 20 L 20 100 L 50 100 L 50 70 L 80 100 L 110 70 L 110 100 L 140 100 L 140 130 L 110 130 L 80 100 L 50 130 L 20 100 Z"
                        fill="url(#redGradient)" stroke="#FF0080" strokeWidth="2" />
                    <polygon points="130,125 140,130 140,120" fill="#FF0080" />
                </svg>
            );
            break;
        case 'blue':
            color = '#A0A0FF';
            arrowContent = (
                <svg className="stock-arrow" viewBox="0 0 150 150" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="blueGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" style={{ stopColor: '#A0A0FF', stopOpacity: 1 }} />
                            <stop offset="100%" style={{ stopColor: '#8080CC', stopOpacity: 0.8 }} />
                        </linearGradient>
                    </defs>
                    <path d="M 20 75 L 60 75 L 60 45 L 90 75 L 60 105 L 60 75 L 130 75"
                        fill="url(#blueGradient)" stroke="#A0A0FF" strokeWidth="2" />
                    <polygon points="125,70 130,75 125,80" fill="#A0A0FF" />
                </svg>
            );
            break;
        default:
            color = '#ffffff';
    }

    // Animation Config
    const arrowVariants = {
        hidden: { x: -150, opacity: 0, rotation: variant === 'green' ? -45 : variant === 'red' ? -135 : 0 },
        visible: {
            x: 40,
            opacity: 0.7,
            rotation: 0,
            transition: { duration: 2.5, ease: "easeOut" }
        }
    };

    return (
        <motion.div
            className={`analysis-card ${variant} reveal`}
            id={id}
            ref={cardRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
        >
            <div className="liquid-bg">
                <LiquidBackground color={color} />
            </div>

            <motion.div
                className="arrow-container"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={arrowVariants}
            >
                {arrowContent}
            </motion.div>

            <div className="card-content">
                <div className="card-icon">{icon}</div>
                <h3 className="card-title">{title}</h3>
                <p className="card-description">{description}</p>
                <div className="card-preview">
                    <div className="mini-chart">
                        {[...Array(8)].map((_, i) => (
                            <div key={i} className="chart-bar"></div>
                        ))}
                    </div>
                </div>

                <button
                    className={`card-btn ${variant}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        if (onAction) onAction();
                    }}
                >
                    <span className="btn-text">{actionLabel || "Explore"}</span>
                    <span className="btn-fill"></span>
                </button>
            </div>
        </motion.div>
    );
};

export default AnalysisCard;
