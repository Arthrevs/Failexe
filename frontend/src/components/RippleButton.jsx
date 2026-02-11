import React, { useState, useRef } from 'react';

const RippleButton = ({ children, onClick, className = '' }) => {
    const [ripples, setRipples] = useState([]);
    const buttonRef = useRef(null);

    const handleMouseEnter = (e) => {
        if (!buttonRef.current) return;

        const button = buttonRef.current;
        const rect = button.getBoundingClientRect();

        // Create ripple at center of button
        const x = rect.width / 2;
        const y = rect.height / 2;

        const newRipple = {
            id: Date.now(),
            x,
            y,
        };

        setRipples(prev => [...prev, newRipple]);

        // Remove ripple after animation
        setTimeout(() => {
            setRipples(prev => prev.filter(r => r.id !== newRipple.id));
        }, 1000);
    };

    return (
        <button
            ref={buttonRef}
            onClick={onClick}
            onMouseEnter={handleMouseEnter}
            className={`relative overflow-hidden ${className}`}
            style={{ isolation: 'isolate' }}
        >
            {/* Ripple effects - just the rings, no droplet */}
            {ripples.map(ripple => (
                <span
                    key={ripple.id}
                    className="absolute pointer-events-none"
                    style={{
                        left: ripple.x,
                        top: ripple.y,
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    {/* Ripple circle 1 */}
                    <span
                        className="absolute w-4 h-4 rounded-full border-2 border-[#00FF94]"
                        style={{
                            animation: 'rippleExpand 1.2s ease-out forwards',
                            opacity: 0,
                            boxShadow: '0 0 15px #00FF94',
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                    {/* Ripple circle 2 */}
                    <span
                        className="absolute w-4 h-4 rounded-full border border-[#00FF94]/60"
                        style={{
                            animation: 'rippleExpand 1.2s ease-out 0.25s forwards',
                            opacity: 0,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                    {/* Ripple circle 3 */}
                    <span
                        className="absolute w-4 h-4 rounded-full border border-[#00FF94]/30"
                        style={{
                            animation: 'rippleExpand 1.2s ease-out 0.5s forwards',
                            opacity: 0,
                            left: '50%',
                            top: '50%',
                            transform: 'translate(-50%, -50%)',
                        }}
                    />
                </span>
            ))}

            {/* Button content */}
            <span className="relative z-10">{children}</span>

            {/* CSS Animations */}
            <style>{`
        @keyframes rippleExpand {
          0% {
            transform: translate(-50%, -50%) scale(0);
            opacity: 0.8;
          }
          100% {
            transform: translate(-50%, -50%) scale(10);
            opacity: 0;
          }
        }
      `}</style>
        </button>
    );
};

export default RippleButton;
