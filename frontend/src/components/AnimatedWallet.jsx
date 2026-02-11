import React from 'react';

const AnimatedWallet = ({ isHovered }) => {
    return (
        <div className="relative w-10 h-10 mx-auto mb-4">
            <svg
                width="40"
                height="40"
                viewBox="0 0 40 40"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className={`text-gray-500 group-hover:text-[#5ac53b] transition-all duration-300 ${isHovered ? 'scale-125 -translate-y-2' : ''}`}
            >
                {/* Wallet base */}
                <rect
                    x="8"
                    y="14"
                    width="24"
                    height="16"
                    rx="2"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                />

                {/* Wallet flap */}
                <path
                    d="M8 18 L8 12 C8 11 9 10 10 10 L30 10 C31 10 32 11 32 12 L32 14"
                    stroke="currentColor"
                    strokeWidth="2"
                    fill="none"
                />

                {/* Wallet card slot */}
                <rect
                    x="26"
                    y="20"
                    width="4"
                    height="4"
                    rx="1"
                    fill="currentColor"
                />

                {/* Money notes with $ symbol - CSS animation plays once on hover */}
                {isHovered && (
                    <>
                        {/* Note 1 */}
                        <g className="money-note" style={{ animationDelay: '0s' }}>
                            <rect
                                x="2"
                                y="6"
                                width="14"
                                height="8"
                                rx="1.5"
                                fill="#22c55e"
                                stroke="#16a34a"
                                strokeWidth="0.8"
                            />
                            <text
                                x="9"
                                y="12"
                                fontSize="6"
                                fontWeight="bold"
                                fill="#ffffff"
                                textAnchor="middle"
                            >
                                $
                            </text>
                        </g>

                        {/* Note 2 */}
                        <g className="money-note" style={{ animationDelay: '0.6s' }}>
                            <rect
                                x="3"
                                y="4"
                                width="14"
                                height="8"
                                rx="1.5"
                                fill="#22c55e"
                                stroke="#16a34a"
                                strokeWidth="0.8"
                            />
                            <text
                                x="10"
                                y="10"
                                fontSize="6"
                                fontWeight="bold"
                                fill="#ffffff"
                                textAnchor="middle"
                            >
                                $
                            </text>
                        </g>

                        {/* Note 3 */}
                        <g className="money-note" style={{ animationDelay: '1.2s' }}>
                            <rect
                                x="5"
                                y="2"
                                width="14"
                                height="8"
                                rx="1.5"
                                fill="#22c55e"
                                stroke="#16a34a"
                                strokeWidth="0.8"
                            />
                            <text
                                x="12"
                                y="8"
                                fontSize="6"
                                fontWeight="bold"
                                fill="#ffffff"
                                textAnchor="middle"
                            >
                                $
                            </text>
                        </g>
                    </>
                )}
            </svg>

            {/* CSS Animation - plays once per hover */}
            <style jsx>{`
                @keyframes money-fly {
                    0% {
                        opacity: 0;
                        transform: translate(-10px, 8px) scale(0.8);
                    }
                    30% {
                        opacity: 1;
                    }
                    70% {
                        opacity: 1;
                        transform: translate(8px, -2px) scale(1);
                    }
                    100% {
                        opacity: 0;
                        transform: translate(16px, -6px) scale(0.9);
                    }
                }

                .money-note {
                    animation: money-fly 2s ease-out forwards;
                    opacity: 0;
                }
            `}</style>
        </div>
    );
};

export default AnimatedWallet;
