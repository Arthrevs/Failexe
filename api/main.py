"""
TrackBets Backend - FastAPI Main Entry Point
=============================================
Production-ready API for stock analysis with Gemini AI.

Run locally: uvicorn main:app --reload --port 8000
"""

import os
import sys
<<<<<<< HEAD
import yfinance as yf
=======
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
from datetime import datetime
from typing import Optional

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from dotenv import load_dotenv

# Add parent dir to path for imports
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

# Load environment variables
load_dotenv()

# Import our backend modules
from backend.scrapers import get_stock_price, get_news, get_reddit_posts
from backend.brain import FinancialAnalyst

# ============================================================================
# FASTAPI APP INITIALIZATION
# ============================================================================
app = FastAPI(
    title="TrackBets API",
    description="AI-powered stock analysis using Gemini",
    version="2.0.0"
)

# CORS Middleware - Allow all origins for hackathon demo
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================================
# MOCK DATA SAFETY NET (for demo reliability)
# ============================================================================
MOCK_DB = {
<<<<<<< HEAD
    "ETERNAL.NS": {
        "ticker": "ETERNAL.NS",
        "price_data": {
            "price": 265.80,
            "change_percent": 4.12,
            "is_up": True,
            "currency": "₹",
            "name": "Eternal Limited (formerly Zomato)",
            "market_cap": 245000000000,
            "52_week_high": 310.00,
            "52_week_low": 120.50
        },
        "news": "1. [ET] Eternal Ltd (Zomato) profits soar after rebranding\n2. [Moneycontrol] Blinkit growth drives Eternal's valuation re-rating\n3. [Mint] Eternal to join Nifty 50 index soon",
        "social": "1. [r/IndianStreetBets] (🟢 Bullish) Eternal (Zomato) is the new titan | ⬆️ 600",
        "analysis": {
            "verdict": "BUY",
            "confidence": 90,
            "reasons": ["Successful rebranding to Eternal", "Market dominance confirmed", "Profitable quarters continuing"],
            "ai_explanation": "Eternal Ltd (ex-Zomato) is firing on all cylinders. The rebrand reflects its evolution into a conglomerate. Strong buy.",
            "risk_level": "MEDIUM",
            "target_price": 320.00,
            "timeframe": "Long-term"
        }
    },
    "ZOMATO.NS": {
        "redirect": "ETERNAL.NS"
    },
    "ZOMATO": {
        "redirect": "ETERNAL.NS"
=======
    "ZOMATO.NS": {
        "ticker": "ZOMATO.NS",
        "price_data": {
            "price": 260.45,
            "change_percent": 2.34,
            "is_up": True,
            "currency": "₹",
            "name": "Zomato Limited",
            "market_cap": 229000000000,
            "52_week_high": 304.50,
            "52_week_low": 108.30
        },
        "news": "1. [ET] Zomato Q3 profit jumps 280% on strong food delivery growth\n2. [Moneycontrol] Zomato Blinkit revenue surges 120% YoY\n3. [NDTV] Zomato hits all-time high as FIIs increase stake\n4. [Bloomberg] Zomato expands quick commerce with 10-min delivery\n5. [Reuters] Zomato CEO bullish on India's food delivery market",
        "social": "1. [r/IndianStreetBets] (🟢 Bullish) Zomato flying! Target 300 soon | ⬆️ 542\n2. [r/IndianStreetBets] (🟢 Bullish) Zomato is the Amazon of India food | ⬆️ 328\n3. [r/stocks] (🟢 Bullish) Why Indian food delivery is the next big thing | ⬆️ 156",
        "analysis": {
            "verdict": "BUY",
            "confidence": 87,
            "reasons": [
                "Strong Q3 results with 280% profit growth YoY",
                "Blinkit quick commerce showing explosive 120% revenue growth",
                "Positive institutional activity - FIIs increasing stake",
                "Trading near 52-week high with strong momentum",
                "Market leader in India's growing food delivery segment"
            ],
            "ai_explanation": "Zomato presents a compelling BUY opportunity. The company has achieved profitability inflection with Q3 profits surging 280%. Blinkit's quick commerce is a major growth driver. Strong institutional buying and bullish social sentiment (85%+) support the uptrend. Entry at current levels offers solid risk-reward for 6-12 month horizon.",
            "risk_level": "MEDIUM",
            "target_price": 300.00,
            "timeframe": "Medium-term"
        }
    },
    "ZOMATO": {
        # Alias for ease of use
        "redirect": "ZOMATO.NS"
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
    },
    "TSLA": {
        "ticker": "TSLA",
        "price_data": {
            "price": 420.69,
            "change_percent": 3.14,
            "is_up": True,
            "currency": "$",
            "name": "Tesla, Inc.",
            "market_cap": 1340000000000,
            "52_week_high": 488.54,
            "52_week_low": 138.80
        },
        "news": "1. [CNBC] Tesla Q4 deliveries beat expectations at 484K units\n2. [Reuters] Tesla Cybertruck production ramping up in Texas\n3. [Bloomberg] Elon Musk announces FSD v12 major improvements\n4. [WSJ] Tesla's energy storage business hits record revenue\n5. [TechCrunch] Tesla robotaxi event scheduled for Q2 2024",
        "social": "1. [r/wallstreetbets] (🟢 Bullish) TSLA to the moon with Cybertruck 🚀🚀 | ⬆️ 2.3K\n2. [r/stocks] (🟡 Neutral) Tesla valuation: growth priced in? | ⬆️ 856\n3. [r/investing] (🟢 Bullish) Long TSLA for FSD revolution | ⬆️ 423",
        "analysis": {
            "verdict": "BUY",
            "confidence": 78,
            "reasons": [
                "Q4 deliveries exceeded analyst expectations",
                "Cybertruck production finally scaling up",
                "FSD v12 showing significant improvements",
                "Energy storage business providing diversification",
                "Strong brand loyalty and retail investor support"
            ],
            "ai_explanation": "Tesla remains a high-conviction BUY for growth investors. Despite premium valuation, multiple catalysts are in play: Cybertruck ramp, FSD improvements, and energy storage growth. The stock shows strong technical support and overwhelming retail bullishness. Risk-reward favorable for $500+ targets in 2024.",
            "risk_level": "HIGH",
            "target_price": 500.00,
            "timeframe": "Medium-term"
        }
    },
    "RELIANCE.NS": {
        "ticker": "RELIANCE.NS",
        "price_data": {
            "price": 2890.75,
            "change_percent": 1.85,
            "is_up": True,
            "currency": "₹",
            "name": "Reliance Industries Limited",
            "market_cap": 19600000000000,
            "52_week_high": 3024.90,
            "52_week_low": 2220.30
        },
        "news": "1. [ET] Reliance AGM 2024: Jio and Retail IPO timelines announced\n2. [Moneycontrol] Reliance green energy capex to hit $10B by 2026\n3. [Bloomberg] Reliance Retail valued at $100B ahead of IPO\n4. [NDTV] Mukesh Ambani outlines vision for 5G domination\n5. [Reuters] Reliance in talks for major overseas acquisitions",
        "social": "1. [r/IndianStreetBets] (🟢 Bullish) RIL is the safest large cap bet | ⬆️ 312\n2. [r/stocks] (🟡 Neutral) Reliance conglomerate analysis | ⬆️ 89",
        "analysis": {
            "verdict": "HOLD",
            "confidence": 72,
            "reasons": [
                "Jio and Retail IPOs are long-term catalysts",
                "Green energy investments show future focus",
                "Current valuation is fair, not cheap",
                "Trading near all-time highs, wait for dip",
                "Core refining business facing headwinds"
            ],
            "ai_explanation": "Reliance is a core portfolio holding for Indian investors, but current levels warrant a HOLD rather than aggressive BUY. The stock is fairly valued with most positives priced in. Wait for a 5-10% correction for better entry. Long-term thesis remains intact with Jio/Retail IPOs as catalysts.",
            "risk_level": "LOW",
            "target_price": 3100.00,
            "timeframe": "Long-term"
        }
    }
}


# ============================================================================
# REQUEST/RESPONSE MODELS
# ============================================================================
class AnalyzeRequest(BaseModel):
    ticker: str
    
class AnalyzeResponse(BaseModel):
    success: bool
    ticker: str
    timestamp: str
    currency: str
    price_data: dict
    news: str
    social: str
    analysis: dict
<<<<<<< HEAD
    graph_data: Optional[dict] = None  # Real historical data
    source: str  # "mock" or "live"

class SearchRequest(BaseModel):
    query: str

=======
    source: str  # "mock" or "live"

>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b

# ============================================================================
# HELPER FUNCTIONS
# ============================================================================
def get_currency_symbol(ticker: str) -> str:
    """Return ₹ for Indian stocks, $ for US stocks."""
    ticker = ticker.upper()
    if ".NS" in ticker or ".BO" in ticker:
        return "₹"
    return "$"


<<<<<<< HEAD
def get_historical_graph_data(ticker: str) -> dict:
    """Fetch 1 year of historical data for the chart."""
    try:
        stock = yf.Ticker(ticker)
        # Fetch 1 year data with daily interval
        hist = stock.history(period="1y", interval="1d")
        
        if hist.empty:
            return {}
            
        points = []
        for date, row in hist.iterrows():
            points.append({
                "time": date.strftime("%Y-%m-%d"),
                "value": row['Close']
            })
            
        return {"points": points}
    except Exception as e:
        print(f"[API] Graph data error: {e}")
        return {}


=======
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
# ============================================================================
# API ENDPOINTS
# ============================================================================
@app.get("/")
async def root():
    """Health check endpoint."""
    return {
        "status": "online",
        "service": "TrackBets API",
        "version": "2.0.0",
        "timestamp": datetime.now().isoformat()
    }


@app.get("/api/health")
async def health_check():
    """Detailed health check."""
    return {
        "status": "healthy",
        "gemini_key": bool(os.getenv("GOOGLE_API_KEY")),
        "reddit_configured": bool(os.getenv("REDDIT_CLIENT_ID")),
        "mock_tickers_available": list(MOCK_DB.keys())
    }


@app.post("/api/analyze", response_model=AnalyzeResponse)
async def analyze_stock(request: AnalyzeRequest):
    """
    Main analysis endpoint.
    Accepts a ticker and returns comprehensive AI analysis.
    """
    ticker = request.ticker.upper().strip()
    
    if not ticker:
        raise HTTPException(status_code=400, detail="Ticker symbol required")
    
    # Check for mock data first (hackathon safety net)
    if ticker in MOCK_DB:
        mock_data = MOCK_DB[ticker]
        
        # Handle redirects (e.g., ZOMATO -> ZOMATO.NS)
        if "redirect" in mock_data:
            mock_data = MOCK_DB[mock_data["redirect"]]
        
        return AnalyzeResponse(
            success=True,
            ticker=mock_data["ticker"],
            timestamp=datetime.now().isoformat(),
            currency=mock_data["price_data"]["currency"],
            price_data=mock_data["price_data"],
            news=mock_data["news"],
            social=mock_data["social"],
            analysis=mock_data["analysis"],
            source="mock"
        )
    
    # Live data path
    try:
        # 1. Fetch price data
        price_data = get_stock_price(ticker)
        
        if price_data.get("error") and price_data.get("price") is None:
            raise HTTPException(
                status_code=404, 
                detail=f"Could not find stock data for {ticker}"
            )
        
        # 2. Fetch news
        news = get_news(ticker)
        
        # 3. Fetch social sentiment
        social = get_reddit_posts(ticker)
        
<<<<<<< HEAD
        # 4. Run AI Analysis
=======
        # 4. Run AI analysis
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
        analyst = FinancialAnalyst()
        
        context = f"""
STOCK ANALYSIS REQUEST
======================
Ticker: {ticker}
Current Price: {price_data.get('currency', '$')}{price_data.get('price', 'N/A')}
Daily Change: {price_data.get('change_percent', 0)}%
Company: {price_data.get('name', ticker)}

RECENT NEWS:
{news}

SOCIAL SENTIMENT (Reddit/Twitter):
{social}

Additional Data:
- Market Cap: {price_data.get('market_cap', 'N/A')}
- 52-Week High: {price_data.get('52_week_high', 'N/A')}
- 52-Week Low: {price_data.get('52_week_low', 'N/A')}
- Volume: {price_data.get('volume', 'N/A')}
"""
        
<<<<<<< HEAD
        analysis_result = analyst.analyze(context)
        
        # 5. Fetch Graph Data (Real)
        graph_data = get_historical_graph_data(ticker)
=======
        analysis = analyst.analyze(context)
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
        
        return AnalyzeResponse(
            success=True,
            ticker=ticker,
            timestamp=datetime.now().isoformat(),
            currency=get_currency_symbol(ticker),
            price_data=price_data,
            news=news,
            social=social,
<<<<<<< HEAD
            analysis=analysis_result,
            graph_data=graph_data,  # Include real graph data
            source="live"
        )
        
=======
            analysis=analysis,
            source="live"
        )
        
    except HTTPException:
        raise
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
    except Exception as e:
        print(f"[API ERROR] {ticker}: {str(e)}")
        
        # Return fallback response instead of crashing
        return AnalyzeResponse(
            success=False,
            ticker=ticker,
            timestamp=datetime.now().isoformat(),
            currency=get_currency_symbol(ticker),
            price_data={"price": None, "error": str(e)},
            news="News unavailable",
            social="Social data unavailable",
            analysis={
                "verdict": "HOLD",
                "confidence": 50,
                "reasons": ["Analysis failed", "Please try again", str(e)[:50]],
                "ai_explanation": "Unable to complete analysis due to an error. Please try again or use a different ticker.",
                "risk_level": "MEDIUM",
                "target_price": None,
                "timeframe": "N/A"
            },
            source="error"
        )


<<<<<<< HEAD
@app.post("/api/identity")
async def get_ticker_identity(request: AnalyzeRequest):
    """
    Get a quick identity/overview for a ticker (Gen Z style).
    """
    ticker = request.ticker.upper().strip()
    
    # Mock data check
    if ticker in MOCK_DB:
        mock_data = MOCK_DB[ticker]
        if "redirect" in mock_data:
            mock_data = MOCK_DB[mock_data["redirect"]]
            
        return {
            "overview": mock_data['analysis']['ai_explanation'][:150] + "...",
            "currency_symbol": mock_data['price_data']['currency'],
            "currency_code": "INR" if mock_data['price_data']['currency'] == "₹" else "USD"
        }

    try:
        analyst = FinancialAnalyst()
        return analyst.get_ticker_identity(ticker)
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.post("/api/search")
async def search_ticker(request: SearchRequest):
    """
    Search for a generic company name and return the valid ticker.
    Uses Gemini to resolve names like "zomato" -> "ZOMATO.NS".
    """
    analyst = FinancialAnalyst()
    result = analyst.search_ticker(request.query)
    return result


=======
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
@app.get("/api/analyze/{ticker}")
async def analyze_stock_get(ticker: str):
    """GET endpoint for easy browser testing."""
    return await analyze_stock(AnalyzeRequest(ticker=ticker))


@app.get("/api/mock-tickers")
async def list_mock_tickers():
    """List all available mock tickers for demo."""
    return {
        "mock_tickers": [k for k in MOCK_DB.keys() if "redirect" not in MOCK_DB.get(k, {})],
        "description": "These tickers return instant mock data for reliable demos"
    }


# ============================================================================
# MAIN ENTRY POINT
# ============================================================================
if __name__ == "__main__":
    import uvicorn
    
    port = int(os.getenv("PORT", 8000))
    uvicorn.run(
        "main:app",
        host="0.0.0.0",
        port=port,
        reload=True
<<<<<<< HEAD
    )
=======
    )
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
