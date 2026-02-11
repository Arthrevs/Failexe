import React, { useEffect, useRef } from 'react';

const AuroraBackground = () => {
    const starsRef = useRef(null);

    useEffect(() => {
        // Generate stars
        if (starsRef.current) {
            starsRef.current.innerHTML = '';
            for (let i = 0; i < 100; i++) {
                const star = document.createElement('div');
                star.style.cssText = `
                    position: absolute;
                    width: 2px;
                    height: 2px;
                    background: white;
                    border-radius: 50%;
                    left: ${Math.random() * 100}%;
                    top: ${Math.random() * 100}%;
                    opacity: 0.8;
                    animation: twinkle ${2 + Math.random() * 2}s infinite;
                    animation-delay: ${Math.random() * 3}s;
                `;
                starsRef.current.appendChild(star);
            }
        }
    }, []);

    return (
        <>
            {/* Aurora Gradient from Reference */}
            <div
                className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    background: `linear-gradient(
                        180deg,
                        #000000 0%,
                        #1a0a2e 30%,
                        #a855f7 60%,
                        #ec4899 70%,
                        #000000 100%
                    )`
                }}
            >
                {/* Radial overlay from Reference */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(ellipse at center, transparent 0%, rgba(0, 0, 0, 0.7) 100%)'
                    }}
                />
            </div>

            {/* Stars */}
            <div
                ref={starsRef}
                className="fixed inset-0 z-1 pointer-events-none"
            />

            {/* Scanlines */}
            <div className="scanlines fixed inset-0 z-2 pointer-events-none" />
        </>
    );
};

export default AuroraBackground;
