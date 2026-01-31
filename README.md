📈 TrackBets: AI-Powered Financial Analyst
TrackBets is a full-stack financial intelligence platform that combines real-time data scraping, social sentiment analysis, and Large Language Models (LLM) to deliver actionable "Buy/Sell/Hold" verdicts for retail investors.

🚀 [Live Demo Link] | 📊 [Presentation / Pitch Deck Link]

🛠️ The Tech Stack
Frontend: React.js with Vite, styled with a high-fidelity "Neon-Dark" UI for maximum readability.

Backend: FastAPI (Python) hosted on Render, designed for high-concurrency asynchronous data processing.

Intelligence: Google Gemini 1.5 Pro API for complex financial reasoning and sentiment synthesis.

Data Layer: * yfinance for real-time NSE/BSE market pricing.

BeautifulSoup & GoogleNews for live financial news scraping.

PRAW (Reddit API) for gauging retail investor sentiment.

✨ Key Features
Real-time Analysis: Fetches live data to provide instant verdicts on tickers like ZOMATO.NS or TSLA.

Strategy Wizard: Guided workflow to help users define entry prices, investment goals (Long-term vs. Quick Scalp), and risk tolerance.

Sentiment Engine: Aggregates data from social media and news to calculate a "Bullish vs. Bearish" percentage.

AI Insights: Provides a natural language summary explaining the why behind every recommendation.

⚙️ Architecture & Deployment
The project is architected using a decoupled service model to ensure scalability and bypass execution timeouts:

Backend (The Brain): Deployed as a Web Service on Render, handling heavy computation and API calls.

Frontend (The Face): Deployed as a Static Site on Render, optimized for low-latency user interactions.
👥 The Team
Arindam Nath - Backend Architect & AI Integration

Debanga Shivam - Lead Frontend Engineer & UI Designer

Meghank Dutta - Data Scientist & Financial Analyst
