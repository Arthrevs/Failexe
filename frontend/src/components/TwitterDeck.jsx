import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShieldCheck, Clock, X } from 'lucide-react';

// Custom X Logo (Twitter is now X)
const XLogo = ({ size = 16, className = "" }) => (
    <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="currentColor"
        className={className}
    >
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
);

const TwitterDeck = ({ tweets = [] }) => {
    const [isFanned, setIsFanned] = useState(false);
    const [focusedIndex, setFocusedIndex] = useState(null);

    if (!tweets || tweets.length === 0) return null;

    // Take top 5 tweets
    const deckTweets = tweets.slice(0, 5);

    // Variants for card states
    const cardVariants = {
        stacked: (index) => ({
            x: index * 2,
            y: index * -1,
            rotate: (index - 2) * 2,
            scale: 1 - index * 0.05,
            zIndex: 5 - index,
            opacity: 1,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }),
        fanned: (index) => {
            const offset = index - 2;
            return {
                x: offset * 80,
                y: Math.abs(offset) * 10,
                rotate: offset * 10,
                scale: 1,
                zIndex: 10 - Math.abs(offset),
                opacity: 1,
                transition: { type: "spring", stiffness: 200, damping: 20 }
            };
        },
        focused: (index) => {
            // If this card is the focused one:
            if (index === focusedIndex) {
                return {
                    x: 0,
                    y: -50,
                    rotate: 0,
                    scale: 1.1,
                    zIndex: 50,
                    opacity: 1,
                    transition: { type: "spring", stiffness: 300, damping: 25 }
                };
            }
            // If another card is focused, dim/hide this one
            return {
                x: (index - 2) * 20, // Bunch them up slightly behind
                y: 50,
                scale: 0.8,
                rotate: 0,
                zIndex: 0,
                opacity: 0.3,
                transition: { duration: 0.3 }
            };
        }
    };

    const handleCardClick = (e, index) => {
        e.stopPropagation();
        // Toggle focus
        setFocusedIndex(focusedIndex === index ? null : index);
    };

    const handleDeckLeave = () => {
        setIsFanned(false);
        setFocusedIndex(null); // Reset focus on leave
    };

    return (
        <div className="w-full flex flex-col items-center justify-center my-8 py-4 relative z-0">
            <h3 className="text-gray-400 font-bold mb-8 text-sm uppercase tracking-wider flex items-center gap-2">
                <XLogo size={14} className="text-white/80" />
                Community Sentiment
            </h3>

            {/* Deck Container */}
            <div
                className="relative h-[320px] w-full max-w-[340px] flex justify-center items-center cursor-pointer"
                onMouseEnter={() => setIsFanned(true)}
                onMouseLeave={handleDeckLeave}
            >
                {deckTweets.map((tweet, index) => {
                    // Determine current state based on focus > fan > stack
                    let currentState = "stacked";
                    if (focusedIndex !== null) currentState = "focused";
                    else if (isFanned) currentState = "fanned";

                    return (
                        <motion.div
                            key={index}
                            custom={index}
                            variants={cardVariants}
                            initial="stacked"
                            animate={currentState}
                            onClick={(e) => handleCardClick(e, index)}
                            className="absolute w-[260px] h-[180px] bg-[#1a1a1a] rounded-2xl p-5 border border-gray-800 shadow-2xl flex flex-col gap-3 select-none"
                            style={{ transformOrigin: "bottom center" }}
                        >
                            {/* X Card Content */}
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-gray-700 to-black flex items-center justify-center text-xs font-bold text-white border border-gray-600">
                                        {tweet.user[0]}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-xs font-bold text-white flex items-center gap-1">
                                            {tweet.user}
                                            {tweet.verified && <ShieldCheck size={10} className="text-blue-400 fill-blue-400/20" />}
                                        </span>
                                        <span className="text-[10px] text-gray-500">{tweet.handle}</span>
                                    </div>
                                </div>
                                <XLogo size={12} className="text-gray-500" />
                            </div>

                            <p className="text-sm text-gray-200 font-medium leading-relaxed">
                                {tweet.text}
                            </p>

                            <div className="mt-auto flex items-center gap-2 text-[10px] text-gray-500">
                                <Clock size={10} />
                                <span>{tweet.timestamp}</span>
                            </div>

                            {/* Glow Effect */}
                            <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                        </motion.div>
                    );
                })}
            </div>

            <p className="text-xs text-gray-600 animate-pulse mt-[-40px]">
                {focusedIndex !== null ? "Tap to close" : (isFanned ? "Tap a card to read" : "Tap to reveal thoughts")}
            </p>
        </div>
    );
};

export default TwitterDeck;
