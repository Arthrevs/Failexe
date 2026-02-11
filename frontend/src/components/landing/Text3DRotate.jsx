import React, { useRef, useEffect, useState, useMemo } from 'react';
import { animate, stagger } from 'animejs';

const Text3DRotate = ({ children, className = '' }) => {
    const containerRef = useRef(null);
    const [isHovered, setIsHovered] = useState(false);

    const text = useMemo(() => children?.toString() || '', [children]);
    const chars = useMemo(() => text.split(''), [text]);

    // Create/play animation on hover
    useEffect(() => {
        if (!containerRef.current) return;

        if (isHovered) {
            const charElements = containerRef.current.querySelectorAll('.char-3d');

            if (charElements.length > 0) {
                const charsStagger = stagger(50, { start: 0 });

                animate(charElements, {
                    rotateX: [-360, 0],
                    ease: 'outQuad',
                    duration: 800,
                    delay: charsStagger
                });
            }
        }
    }, [isHovered]);

    return (
        <span
            ref={containerRef}
            className={className}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            style={{ display: 'inline', cursor: 'pointer' }}
        >
            {chars.map((char, i) => (
                char === ' ' ? (
                    <span key={i} style={{ display: 'inline' }}>&nbsp;</span>
                ) : (
                    <span
                        key={i}
                        className="char-3d"
                        style={{
                            display: 'inline-block',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {char}
                    </span>
                )
            ))}
        </span>
    );
};

export default Text3DRotate;
