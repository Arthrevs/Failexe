import React, { useRef } from 'react';

const AnimatedArrow = ({ color, direction, triggerId }) => {
    const arrowRef = useRef(null);

    // Determine initial rotation based on direction
    const initialRotation = direction === 'up' ? -45 : direction === 'down' ? -135 : 0;
    const colorHex = color === 'green' ? '#00FF94' : color === 'red' ? '#FF0080' : '#A0A0FF';
    const gradientId = `${color}Gradient-${triggerId}`;



    return (
        <div
            ref={arrowRef}
            className="absolute left-[40px] top-1/2 -translate-y-1/2 w-[150px] h-[150px] z-1 opacity-70"
            style={{
                filter: `drop-shadow(0 0 20px ${colorHex}80)`
            }}
        >
            <svg viewBox="0 0 150 150" className="w-full h-full">
                <defs>
                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor={colorHex} stopOpacity="1" />
                        <stop offset="100%" stopColor={colorHex} stopOpacity="0.8" />
                    </linearGradient>
                </defs>
                {direction === 'up' && (
                    // Upward zigzag arrow
                    <path
                        d="M 20 130 L 40 130 L 40 90 L 70 120 L 100 90 L 100 60 L 130 60 L 130 30 L 75 30 L 75 60 L 100 60 L 70 90 L 40 60 L 40 30 L 20 30 Z"
                        fill={`url(#${gradientId})`}
                        stroke={colorHex}
                        strokeWidth="2"
                    />
                )}
                {direction === 'down' && (
                    // Downward zigzag arrow
                    <path
                        d="M 20 20 L 40 20 L 40 60 L 70 30 L 100 60 L 100 90 L 130 90 L 130 120 L 75 120 L 75 90 L 100 90 L 70 60 L 40 90 L 40 120 L 20 120 Z"
                        fill={`url(#${gradientId})`}
                        stroke={colorHex}
                        strokeWidth="2"
                    />
                )}
                {direction === 'horizontal' && (
                    // Horizontal arrow
                    <path
                        d="M 20 65 L 90 65 L 90 45 L 130 75 L 90 105 L 90 85 L 20 85 Z"
                        fill={`url(#${gradientId})`}
                        stroke={colorHex}
                        strokeWidth="2"
                    />
                )}
            </svg>
        </div>
    );
};

export default AnimatedArrow;
