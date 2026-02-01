import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Twitter, ShieldCheck, Clock } from 'lucide-react';

const TwitterDeck = ({ tweets = [] }) => {
    const [isFanned, setIsFanned] = useState(false);

    if (!tweets || tweets.length === 0) return null;

    // Take top 5 tweets
    const deckTweets = tweets.slice(0, 5);

    // Fan variants: Spread out horizontally like a hand of cards
    const cardVariants = {
        stacked: (index) => ({
            x: index * 2, // Slight offset to show depth
            y: index * -1,
            rotate: (index - 2) * 2, // Subtle rotation while stacked
            scale: 1 - index * 0.05,
            zIndex: 5 - index,
            transition: { type: "spring", stiffness: 300, damping: 20 }
        }),
        fanned: (index) => {
            // Calculate angle and position for fan
            // Center index is 2
            const offset = index - 2;
            return {
                x: offset * 80, // Spread horizontal
                y: Math.abs(offset) * 10, // Slight curve (arch)
                rotate: offset * 10, // Fan rotation
                scale: 1,
                // zIndex: 5 - Math.abs(offset), // Center should be top? Or left to right?
                // Actually for a deck fan, usually we want natural overlap.
                // Let's keep z-index simple or just rely on DOM order.
                // In DOM order (0..4), 4 is on top. 
                // If we want the *center* card on top, we need specific Z-indexes.
                zIndex: 10 - Math.abs(offset),
                transition: { type: "spring", stiffness: 200, damping: 20 }
            };
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center my-8 py-4 relative z-0">
            <h3 className="text-gray-400 font-bold mb-8 text-sm uppercase tracking-wider flex items-center gap-2">
                <Twitter size={16} className="text-blue-400" />
                Community Sentiment
            </h3>

            {/* Deck Container - Click/Hover to Fan */}
            <div
                className="relative h-[280px] w-full max-w-[340px] flex justify-center items-center cursor-pointer"
                onMouseEnter={() => setIsFanned(true)}
                onMouseLeave={() => setIsFanned(false)}
                onClick={() => setIsFanned(!isFanned)}
            >
                {deckTweets.map((tweet, index) => (
                    <motion.div
                        key={index}
                        custom={index}
                        variants={cardVariants}
                        initial="stacked"
                        animate={isFanned ? "fanned" : "stacked"}
                        className="absolute w-[260px] h-[180px] bg-[#1a1a1a] rounded-2xl p-4 border border-gray-800 shadow-2xl flex flex-col gap-3 select-none"
                        style={{ transformOrigin: "bottom center" }}
                    >
                        {/* Twitter Card Content */}
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-2">
                                <div className="w-8 h-8 rounded-full bg-linear-to-br from-blue-500 to-purple-600 flex items-center justify-center text-xs font-bold text-white">
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
                            <Twitter size={14} className="text-gray-600" />
                        </div>

                        <p className="text-xs text-gray-300 font-medium leading-relaxed">
                            {tweet.text}
                        </p>

                        <div className="mt-auto flex items-center gap-2 text-[10px] text-gray-500">
                            <Clock size={10} />
                            <span>{tweet.timestamp}</span>
                        </div>

                        {/* Glow Effect */}
                        <div className="absolute inset-0 rounded-2xl bg-blue-500/5 opacity-0 hover:opacity-100 transition-opacity pointer-events-none" />
                    </motion.div>
                ))}
            </div>

            <p className="text-xs text-gray-600 animate-pulse mt-[-20px]">
                {isFanned ? "" : "Tap to reveal thoughts"}
            </p>
        </div>
    );
};

export default TwitterDeck;
