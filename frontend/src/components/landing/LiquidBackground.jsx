import React, { useEffect, useRef } from 'react';

const LiquidBackground = ({ color }) => {
    const canvasRef = useRef(null);
    const timeRef = useRef(0);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        let animationId;

        const updateSize = () => {
            canvas.width = canvas.parentElement?.offsetWidth || 400;
            canvas.height = canvas.parentElement?.offsetHeight || 500;
        };
        updateSize();
        window.addEventListener('resize', updateSize);

        const drawLiquid = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            for (let i = 0; i < 3; i++) {
                const opacity = Math.floor(20 - i * 5).toString(16).padStart(2, '0');
                ctx.fillStyle = color + opacity;

                ctx.beginPath();
                for (let x = 0; x <= canvas.width; x += 5) {
                    const y = Math.sin((x + timeRef.current + i * 100) * 0.01) * 30 +
                        Math.sin((x + timeRef.current * 1.5 + i * 50) * 0.015) * 20 +
                        canvas.height / 2 + i * 30;
                    if (x === 0) {
                        ctx.moveTo(x, y);
                    } else {
                        ctx.lineTo(x, y);
                    }
                }
                ctx.lineTo(canvas.width, canvas.height);
                ctx.lineTo(0, canvas.height);
                ctx.closePath();
                ctx.fill();
            }

            timeRef.current += 0.3;
            animationId = requestAnimationFrame(drawLiquid);
        };

        drawLiquid();

        return () => {
            window.removeEventListener('resize', updateSize);
            cancelAnimationFrame(animationId);
        };
    }, [color]);

    return (
        <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full opacity-20 pointer-events-none"
        />
    );
};

export default LiquidBackground;
