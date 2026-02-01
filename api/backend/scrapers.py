"""
TrackBets Backend - Scrapers Module
====================================
Robust scraping functions for stock prices, news, and social sentiment.
All functions have try-except blocks to prevent crashing.
"""

import os
from typing import Optional, List, Dict
from datetime import datetime


# ============================================================================
# ============================================================================
# 1. STOCK PRICE SCRAPER (yfinance + Twelve Data)
# ============================================================================
def get_stock_price(ticker: str) -> Dict:
    """
    Fetch current stock price with robust fallback logic.
    Priority: yfinance -> Twelve Data
    Handles Crypto formats automatically (BTC-USD vs BTC/USD).
    """
    ticker = ticker.upper()
    is_indian = ".NS" in ticker or ".BO" in ticker

    # 1. Prepare Tickers for different APIs
    # yfinance: expects "BTC-USD" (dash)
    yf_ticker = ticker.replace("/", "-")
    
    # Twelve Data: expects "BTC/USD" (slash)
    td_ticker = ticker.replace("-", "/")

    # ---------------------------------------------------------
    # PRIMARY SOURCE: yfinance
    # ---------------------------------------------------------
    try:
        import yfinance as yf
        
        stock = yf.Ticker(yf_ticker)
        
        # Try retrieving data via .info (can be flaky)
        try:
            info = stock.info
            # Check if info is valid (sometimes returns empty dict)
            if not info or 'regularMarketPrice' not in info:
                raise ValueError("Incomplete info data")

            current_price = info.get('currentPrice') or info.get('regularMarketPrice') or info.get('previousClose')
            prev_close = info.get('previousClose') or info.get('regularMarketPreviousClose')
            name = info.get('shortName') or info.get('longName') or yf_ticker
            market_cap = info.get('marketCap')
            volume = info.get('volume')
            day_high = info.get('dayHigh')
            day_low = info.get('dayLow')
            high_52 = info.get('fiftyTwoWeekHigh')
            low_52 = info.get('fiftyTwoWeekLow')
        except:
             # Fallback: Use .history() (more reliable for price)
             hist = stock.history(period="1d")
             if hist.empty:
                 raise ValueError(f"No history data found for {yf_ticker}")
             
             current_price = float(hist['Close'].iloc[-1])
             prev_close = float(hist['Open'].iloc[-1]) # Approximate
             name = yf_ticker
             market_cap = "N/A"
             volume = int(hist['Volume'].iloc[-1])
             day_high = float(hist['High'].iloc[-1])
             day_low = float(hist['Low'].iloc[-1])
             high_52 = "N/A"
             low_52 = "N/A"

        # Calculate change
        change_percent = 0.0
        if prev_close and current_price:
            change_percent = round(((current_price - prev_close) / prev_close) * 100, 2)
        
        currency = "₹" if is_indian else "$"
        
        return {
            "price": round(float(current_price), 2),
            "change_percent": change_percent,
            "is_up": change_percent >= 0,
            "currency": currency,
            "name": name,
            "market_cap": market_cap,
            "volume": volume,
            "day_high": day_high,
            "day_low": day_low,
            "52_week_high": high_52,
            "52_week_low": low_52,
            "source": "yfinance"
        }
        
    except Exception as e:
        print(f"[SCRAPER] yfinance failed for {yf_ticker}: {str(e)}")
        # Proceed to fallback...

    # ---------------------------------------------------------
    # FALLBACK SOURCE: Twelve Data (Mainly for Crypto/US)
    # ---------------------------------------------------------
    twelve_data_key = os.getenv("TWELVE_DATA_API_KEY")
    if twelve_data_key:
        print(f"[SCRAPER] Falling back to Twelve Data for {td_ticker}...")
        td_data = get_price_twelve_data(td_ticker, twelve_data_key)
        if td_data:
            return td_data
            
    # If all fail
    return {
        "error": "All sources failed",
        "price": None,
        "currency": "₹" if is_indian else "$"
    }


def get_price_twelve_data(ticker: str, api_key: str) -> Optional[Dict]:
    """Fetch real-time price from Twelve Data API."""
    try:
        import requests
        url = f"https://api.twelvedata.com/quote?symbol={ticker}&apikey={api_key}"
        response = requests.get(url, timeout=10) # Increased timeout
        
        # FIX: Ensure we parse JSON
        try:
            data = response.json()
        except ValueError:
            print(f"[TwelveData] Failed to parse JSON response: {response.text[:100]}")
            return None
        
        if "price" not in data:
            print(f"[TwelveData] Error in response: {data.get('message', 'Unknown error')}")
            return None
            
        current_price = float(data['price'])
        change_percent = float(data.get('percent_change', 0))
        
        return {
            "price": round(current_price, 2),
            "change_percent": round(change_percent, 2),
            "is_up": change_percent >= 0,
            "currency": "$", 
            "name": data.get('name', ticker),
            "market_cap": "N/A", 
            "volume": data.get('volume'),
            "day_high": data.get('high'),
            "day_low": data.get('low'),
            "52_week_high": data.get('fifty_two_week', {}).get('high', "N/A"),
            "52_week_low": data.get('fifty_two_week', {}).get('low', "N/A"),
            "source": "TwelveData"
        }
    except Exception as e:
        print(f"[TwelveData] Exception: {e}")
        return None


# ============================================================================
# 2. NEWS SCRAPER (GoogleNews)
# ============================================================================
def get_news(ticker: str, max_results: int = 5) -> str:
    """
    Fetch top news headlines for a stock ticker.
    Returns a formatted string of headlines.
    """
    try:
        from GoogleNews import GoogleNews
        
        # Clean ticker for search
        search_term = ticker.replace(".NS", "").replace(".BO", "").replace(".NYSE", "")
        
        # Initialize GoogleNews
        gn = GoogleNews(lang='en', period='7d')
        gn.clear()
        gn.search(f"{search_term} stock")
        
        results = gn.results()[:max_results]
        
        if not results:
            return f"No recent news found for {search_term}."
        
        # Format headlines
        headlines = []
        for i, article in enumerate(results, 1):
            title = article.get('title', 'No title')
            source = article.get('media', 'Unknown')
            headlines.append(f"{i}. [{source}] {title}")
        
        return "\n".join(headlines)
        
    except Exception as e:
        print(f"[SCRAPER ERROR] get_news({ticker}): {str(e)}")
        return f"News unavailable for {ticker}. Error: {str(e)}"


# ============================================================================
# 3. REDDIT/SOCIAL SCRAPER (praw)
# ============================================================================
def get_reddit_posts(ticker: str, max_posts: int = 5) -> str:
    """
    Fetch top Reddit posts about a stock from relevant subreddits.
    Returns a formatted string of posts with sentiment hints.
    """
    try:
        import praw
        
        # Check for Reddit API credentials
        client_id = os.getenv("REDDIT_CLIENT_ID")
        client_secret = os.getenv("REDDIT_CLIENT_SECRET")
        user_agent = os.getenv("REDDIT_USER_AGENT", "TrackBets/1.0")
        
        if not client_id or not client_secret:
            # Fallback: Use DuckDuckGo search for Reddit posts
            return _get_reddit_via_duckduckgo(ticker)
        
        # Initialize Reddit client
        reddit = praw.Reddit(
            client_id=client_id,
            client_secret=client_secret,
            user_agent=user_agent
        )
        
        # Clean ticker
        search_term = ticker.replace(".NS", "").replace(".BO", "")
        
        # Search relevant subreddits
        subreddits = ["IndianStreetBets", "wallstreetbets", "stocks", "investing"]
        posts = []
        
        for sub_name in subreddits:
            try:
                subreddit = reddit.subreddit(sub_name)
                for post in subreddit.search(search_term, limit=2, time_filter="week"):
                    sentiment = _quick_sentiment(post.title + " " + (post.selftext[:200] if post.selftext else ""))
                    posts.append({
                        "title": post.title[:100],
                        "subreddit": sub_name,
                        "upvotes": post.score,
                        "sentiment": sentiment
                    })
            except:
                continue
        
        if not posts:
            return f"No Reddit discussions found for {search_term} in the past week."
        
        # Sort by upvotes and format
        posts = sorted(posts, key=lambda x: x['upvotes'], reverse=True)[:max_posts]
        
        formatted = []
        for i, p in enumerate(posts, 1):
            formatted.append(f"{i}. [r/{p['subreddit']}] ({p['sentiment']}) {p['title']} | ⬆️ {p['upvotes']}")
        
        return "\n".join(formatted)
        
    except Exception as e:
        print(f"[SCRAPER ERROR] get_reddit_posts({ticker}): {str(e)}")
        return _get_reddit_via_duckduckgo(ticker)


def _get_reddit_via_duckduckgo(ticker: str) -> str:
    """
    Fallback: Scrape Reddit mentions via DuckDuckGo search.
    """
    try:
        from duckduckgo_search import DDGS
        
        search_term = ticker.replace(".NS", "").replace(".BO", "")
        
        with DDGS() as ddgs:
            results = list(ddgs.text(
                f"{search_term} stock site:reddit.com",
                max_results=5
            ))
        
        if not results:
            return f"No Reddit posts found for {search_term}."
        
        formatted = []
        for i, r in enumerate(results, 1):
            title = r.get('title', '')[:80]
            formatted.append(f"{i}. [Reddit] {title}")
        
        return "\n".join(formatted)
        
    except Exception as e:
        print(f"[SCRAPER ERROR] DuckDuckGo fallback: {str(e)}")
        return "Social media data unavailable (API limit reached)."


def _quick_sentiment(text: str) -> str:
    """
    Quick rule-based sentiment detection.
    Returns: 🟢 Bullish, 🔴 Bearish, 🟡 Neutral
    """
    text = text.lower()
    
    bullish_words = ['buy', 'bullish', 'moon', 'rocket', 'undervalued', 'long', 'calls', 'breakout', 'strong', 'growth']
    bearish_words = ['sell', 'bearish', 'crash', 'puts', 'overvalued', 'short', 'dump', 'avoid', 'weak', 'decline']
    
    bullish_count = sum(1 for word in bullish_words if word in text)
    bearish_count = sum(1 for word in bearish_words if word in text)
    
    if bullish_count > bearish_count:
        return "🟢 Bullish"
    elif bearish_count > bullish_count:
        return "🔴 Bearish"
    return "🟡 Neutral"


# ============================================================================
# 5. HISTORICAL DATA SCRAPER (Graph)
# ============================================================================
def get_historical_data(ticker: str, period: str = "1mo") -> Dict:
    """
    Fetch historical data for graphing.
    Priority: Twelve Data -> yfinance
    """
    ticker = ticker.upper()
    
    # Format Tickers
    yf_ticker = ticker.replace("/", "-")
    td_ticker = ticker.replace("-", "/")
    
    # 1. Try Twelve Data
    twelve_data_key = os.getenv("TWELVE_DATA_API_KEY")
    if twelve_data_key:
        try:
            import requests
            # interval: 1day for 1mo, maybe 1h for shorter periods? logic can be enhanced.
            # outputsize=30 for roughly 1 month of trading days
            url = f"https://api.twelvedata.com/time_series?symbol={td_ticker}&interval=1day&outputsize=30&apikey={twelve_data_key}"
            response = requests.get(url, timeout=5)
            data = response.json()
            
            if "values" in data:
                # Twelve Data returns newest first. We usually want oldest first for graphs.
                values = data["values"][::-1] 
                points = [{"time": v["datetime"], "value": float(v["close"])} for v in values]
                return {"points": points, "source": "TwelveData"}
                
        except Exception as e:
            print(f"[Graph] Twelve Data failed for {td_ticker}: {e}")

    # 2. Fallback: yfinance
    try:
        import yfinance as yf
        stock = yf.Ticker(yf_ticker)
        # period="1mo" is standard
        hist = stock.history(period=period)
        
        if hist.empty:
            return {"points": [], "error": "No history found"}
            
        points = []
        for date, row in hist.iterrows():
            points.append({
                "time": date.strftime("%Y-%m-%d"),
                "value": round(float(row["Close"]), 2)
            })
            
        return {"points": points, "source": "yfinance"}
        
    except Exception as e:
        print(f"[Graph] yfinance failed for {yf_ticker}: {e}")
        return {"points": [], "error": str(e)}


# ============================================================================
# 6. COMBINED DATA FETCHER
# ============================================================================
def fetch_all_data(ticker: str) -> Dict:
    """
    Fetch all data for a ticker in one call.
    Returns a comprehensive data dictionary.
    """
    return {
        "ticker": ticker.upper(),
        "timestamp": datetime.now().isoformat(),
        "price_data": get_stock_price(ticker),
        "graph_data": get_historical_data(ticker),
        "news": get_news(ticker),
        "social": get_reddit_posts(ticker)
    }


# ============================================================================
# EXPORTS
# ============================================================================
__all__ = [
    'get_stock_price',
    'get_historical_data',
    'get_news', 
    'get_reddit_posts',
    'fetch_all_data'
]
