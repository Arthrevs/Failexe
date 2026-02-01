📈 TrackBets: AI-Driven Financial Intelligence
TrackBets is a full-stack financial analysis platform designed to bridge the gap between complex market data and retail investor decision-making. By synthesizing real-time market feeds with AI-driven sentiment analysis, TrackBets provides a clear, actionable "Buy/Sell/Hold" roadmap.

🚀 Live Demo: https://failexe.onrender.com/ (Note: Deployed on Render Free Tier; may take ~30s to wake up)

🛠️ The Tech Stack
Frontend

React.js + Vite: High-fidelity "Neon-Dark" UI optimized for a premium trading desk experience.

TailwindCSS: Rapid styling for the "Strategy Wizard" and responsive visualization components.

Backend

FastAPI (Python): Architected for high-performance asynchronous processing and live data fetching.

Docker: Multi-stage build deployment ensures a lightweight, production-ready container.

Hosted on Render: Automated CI/CD pipeline from GitHub.

AI & Data Engine

Gemini 2.5 Flash: Financial reasoning and sentiment synthesis

Hybrid Data Pipeline: A robust 3-layer fallback system designed for Hackathon resilience:

Primary: yfinance / YahooQuery for real-time global and NSE market data.

Secondary: Twelve Data API for international ticker fallback.

Failsafe: Context-aware mock datasets (ensuring zero-latency demos during weekends/market closures).

✨ Key Features & Innovations
🧠 Smart Ticker Resolution
The system goes beyond simple string matching. It intelligently maps brand names to technical tickers, handling recent corporate rebrands and ambiguity:

Input: "Zomato" → Resolves to: ETERNAL.NS (Reflecting the official 2025 rebrand).

Input: "Tata" → Resolves to: TATAMOTORS.NS (Contextual dominance).

Input: "Bitcoin" → Resolves to: BTC-USD (Auto-formatting for crypto APIs).

⚡ "Weekend-Proof" Live Analysis
To solve the "Market Closed" issue during demos, TrackBets implements a dynamic switch:

Social Sentiment Flashcards: A sidebar feed generating context-aware social media "tweets" to visualize market sentiment, ensuring the UI remains dynamic even when stock prices are static.

🗺️ Future Roadmap
Live Broker Integration: Transition to production-grade feeds (Polygon.io / Zerodha Kite).

Portfolio Tracking: Real-time P&L tracking via OAuth brokerage connections.

Advanced ML Models: Custom-trained models for technical indicator prediction (RSI/MACD divergence).

👥 The Team
Arindam Nath – Backend Architect & AI Integration Engineered the FastAPI infrastructure, Docker deployment, and the "Smart Fallback" data pipeline.

Debanga Shivam – Lead Frontend Engineer & UI/UX Designed and developed the high-fidelity React interface, social flashcard components, and the "Strategy Wizard" workflow.

Meghank Sanjib Dutta – Data Scientist & Financial Analyst Specialized in sentiment analysis parameters and validating the financial logic of the verdict engine.
