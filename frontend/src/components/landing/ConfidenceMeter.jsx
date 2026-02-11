import React, { useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import LiquidBackground from './LiquidBackground';

const ConfidenceMeter = () => {
    const cardRef = useRef(null);

    const handleMouseMove = (e) => {
        if (!cardRef.current) return;
        const rect = cardRef.current.getBoundingClientRect();

        // GSAP 3D Tilt
        const xPos = (e.clientX - rect.left) / rect.width;
        const yPos = (e.clientY - rect.top) / rect.height;
        const tiltX = (yPos - 0.5) * 10; // Rotate X axis (up/down)
        const tiltY = (xPos - 0.5) * -10; // Rotate Y axis (left/right)

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

    return (
        <motion.div
            ref={cardRef}
            className="confidence-meter relative overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="liquid-bg absolute inset-0 z-0">
                <LiquidBackground color="#00FF94" />
            </div>

            <div className="relative z-10">
                <div className="meter-label flex justify-between w-full mb-3 text-sm text-gray-400">
                    <span>Market Confidence</span>
                    <span className="font-semibold text-[#00FF94]">78% Bullish</span>
                </div>
                <div className="meter-bar h-2 bg-white/10 rounded-full overflow-hidden relative">
                    <div className="meter-fill h-full bg-linear-to-r from-pink-600 via-purple-500 to-[#00FF94] rounded-full w-0 animate-[fillMeter_3s_ease-out_forwards] relative">
                        <div className="absolute inset-0 bg-linear-to-r from-transparent via-white/30 to-transparent animate-[shimmer_2s_infinite]"></div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default ConfidenceMeter;
