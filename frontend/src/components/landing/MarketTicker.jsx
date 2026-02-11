import React from 'react';

const TickerItem = ({ symbol, verdict, confidence }) => (
    <div className="ticker-item">
        <span className="ticker-symbol">{symbol}</span>
        <span className="ticker-verdict">→ {verdict}</span>
        <span className="ticker-confidence">{confidence}%</span>
    </div>
);

const MarketTicker = () => {
    const tickerItems = [
        { symbol: 'AAPL', verdict: 'STRONG BUY', confidence: 94 },
        { symbol: 'TSLA', verdict: 'HOLD', confidence: 72 },
        { symbol: 'NVDA', verdict: 'BUY', confidence: 88 },
        { symbol: 'META', verdict: 'STRONG BUY', confidence: 91 },
        { symbol: 'MSFT', verdict: 'BUY', confidence: 85 },
    ];

    return (
        <div className="market-ticker">
            <div className="ticker-content">
                {/* Original Items */}
                {tickerItems.map((item, index) => (
                    <TickerItem key={`orig-${index}`} {...item} />
                ))}

                {/* Duplicate for seamless scroll */}
                {tickerItems.map((item, index) => (
                    <TickerItem key={`dup-${index}`} {...item} />
                ))}
            </div>
        </div>
    );
};

export default MarketTicker;
