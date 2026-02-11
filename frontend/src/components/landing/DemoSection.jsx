import React, { useState } from 'react';
import { motion } from 'framer-motion';

const DemoSection = ({ onAnalyze }) => {
    const [ticker, setTicker] = useState('');
    const [isAnalyzing, setIsAnalyzing] = useState(false);

    const handleAnalyze = () => {
        if (!ticker) return;
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            if (onAnalyze) {
                onAnalyze(ticker);
            } else {
                alert(`Analysis for ${ticker} would appear here! (Demo only)`);
            }
        }, 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') handleAnalyze();
    };

    return (
        <section className="demo-section">
            <motion.div
                className="demo-container"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
            >
                <h2 className="demo-title">Try It Free</h2>
                <p className="demo-subtitle">
                    Analyze any stock ticker. No signup required for your first 3 stocks.
                </p>
                <div className="demo-input-group">
                    <input
                        type="text"
                        className="demo-input"
                        placeholder="Enter ticker (e.g., AAPL)"
                        maxLength={5}
                        value={ticker}
                        onChange={(e) => setTicker(e.target.value.toUpperCase())}
                        onKeyPress={handleKeyPress}
                    />
                    <motion.button
                        className="btn-primary"
                        onClick={handleAnalyze}
                        whileTap={{ scale: 0.95 }}
                        animate={isAnalyzing ? { scale: [1, 0.95, 1], transition: { repeat: Infinity, duration: 1 } } : {}}
                    >
                        {isAnalyzing ? 'Analyzing...' : 'Analyze Now'}
                    </motion.button>
                </div>
            </motion.div>
        </section>
    );
};

export default DemoSection;
