"""
Scrapers module for KnowYourBets
Contains data fetching logic from various sources
"""

import os
import re
from dotenv import load_dotenv
import yfinance as yf
from GoogleNews import GoogleNews
import praw
from pypdf import PdfReader
from youtube_transcript_api import YouTubeTranscriptApi

# Load environment variables
load_dotenv()


def get_stock_data(ticker: str) -> dict:
    """
    Fetch stock data for a given ticker symbol using yfinance.
    
    Args:
        ticker (str): The stock ticker symbol (e.g., 'ZOMATO.NS', 'AAPL')
    
    Returns:
        dict: Stock data including price, history, and key metrics
    """
    try:
        stock = yf.Ticker(ticker)
        info = stock.info
        history = stock.history(period="1mo")
        
        return {
            "ticker": ticker,
            "name": info.get("longName", ticker),
            "current_price": info.get("currentPrice") or info.get("regularMarketPrice"),
            "previous_close": info.get("previousClose"),
            "market_cap": info.get("marketCap"),
            "pe_ratio": info.get("trailingPE"),
            "52_week_high": info.get("fiftyTwoWeekHigh"),
            "52_week_low": info.get("fiftyTwoWeekLow"),
            "volume": info.get("volume"),
            "avg_volume": info.get("averageVolume"),
            "dividend_yield": info.get("dividendYield"),
            "sector": info.get("sector"),
            "industry": info.get("industry"),
            "history": history.to_dict() if not history.empty else {},
            "summary": info.get("longBusinessSummary", "")
        }
    except Exception as e:
        return {"error": str(e), "ticker": ticker}


def get_news(ticker: str, num_results: int = 10) -> list:
    """
    Fetch recent news articles for a given ticker using GoogleNews.
    
    Args:
        ticker (str): The stock ticker or company name to search news for
        num_results (int): Number of news articles to fetch
    
    Returns:
        list: List of news articles with title, date, and source
    """
    try:
        googlenews = GoogleNews(lang='en', period='7d')
        googlenews.clear()
        googlenews.search(ticker)
        results = googlenews.result()
        
        news_list = []
        for article in results[:num_results]:
            news_list.append({
                "title": article.get("title", ""),
                "description": article.get("desc", ""),
                "date": article.get("date", ""),
                "source": article.get("media", ""),
                "link": article.get("link", "")
            })
        
        return news_list
    except Exception as e:
        return [{"error": str(e)}]


def get_reddit_posts(ticker: str, subreddits: list = None, limit: int = 10) -> list:
    """
    Fetch Reddit posts and sentiment for a given ticker using PRAW.
    
    Args:
        ticker (str): The stock ticker to search on Reddit
        subreddits (list): List of subreddits to search (default: investing related)
        limit (int): Number of posts to fetch per subreddit
    
    Returns:
        list: List of relevant Reddit posts with title, score, and comments
    """
    if subreddits is None:
        subreddits = ["IndianStockMarket", "IndiaInvestments", "wallstreetbets", "stocks", "investing"]
    
    try:
        reddit = praw.Reddit(
            client_id=os.getenv("REDDIT_CLIENT_ID"),
            client_secret=os.getenv("REDDIT_CLIENT_SECRET"),
            user_agent=os.getenv("REDDIT_USER_AGENT", "KnowYourBets/1.0")
        )
        
        posts = []
        for subreddit_name in subreddits:
            try:
                subreddit = reddit.subreddit(subreddit_name)
                for post in subreddit.search(ticker, limit=limit, time_filter="month"):
                    posts.append({
                        "subreddit": subreddit_name,
                        "title": post.title,
                        "score": post.score,
                        "upvote_ratio": post.upvote_ratio,
                        "num_comments": post.num_comments,
                        "url": post.url,
                        "selftext": post.selftext[:500] if post.selftext else "",
                        "created_utc": post.created_utc
                    })
            except Exception:
                continue  # Skip subreddit if access fails
        
        # Sort by score (engagement)
        posts.sort(key=lambda x: x.get("score", 0), reverse=True)
        return posts
    except Exception as e:
        return [{"error": str(e)}]


def read_pdf(file_path: str) -> str:
    """
    Extract text content from a PDF file using pypdf.
    
    Args:
        file_path (str): Path to the PDF file
    
    Returns:
        str: Extracted text content from the PDF
    """
    try:
        reader = PdfReader(file_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text() + "\n"
        return text.strip()
    except Exception as e:
        return f"Error reading PDF: {str(e)}"


def get_youtube_text(video_url: str) -> str:
    """
    Extract transcript/captions from a YouTube video.
    
    Args:
        video_url (str): YouTube video URL or video ID
    
    Returns:
        str: Transcript text from the video
    """
    try:
        # Extract video ID from URL
        video_id = video_url
        
        # Handle various YouTube URL formats
        if "youtube.com" in video_url:
            match = re.search(r'v=([a-zA-Z0-9_-]{11})', video_url)
            if match:
                video_id = match.group(1)
        elif "youtu.be" in video_url:
            match = re.search(r'youtu\.be/([a-zA-Z0-9_-]{11})', video_url)
            if match:
                video_id = match.group(1)
        
        # Get transcript
        transcript_list = YouTubeTranscriptApi.get_transcript(video_id)
        
        # Combine all transcript segments
        full_transcript = " ".join([segment['text'] for segment in transcript_list])
        return full_transcript
    except Exception as e:
        return f"Error fetching transcript: {str(e)}"


def aggregate_context(ticker: str, pdf_path: str = None, youtube_url: str = None) -> str:
    """
    Aggregate data from all sources into a single context string for AI analysis.
    
    Args:
        ticker (str): Stock ticker symbol
        pdf_path (str): Optional path to PDF document
        youtube_url (str): Optional YouTube video URL
    
    Returns:
        str: Combined context from all sources
    """
    context_parts = []
    
    # Stock data
    stock_data = get_stock_data(ticker)
    if "error" not in stock_data:
        context_parts.append(f"=== STOCK DATA ===\n{stock_data}")
    
    # News
    news = get_news(ticker)
    if news and "error" not in news[0]:
        news_text = "\n".join([f"- {n['title']} ({n['source']})" for n in news])
        context_parts.append(f"=== RECENT NEWS ===\n{news_text}")
    
    # Reddit
    reddit_posts = get_reddit_posts(ticker)
    if reddit_posts and "error" not in reddit_posts[0]:
        reddit_text = "\n".join([f"- [r/{p['subreddit']}] {p['title']} (Score: {p['score']})" for p in reddit_posts[:5]])
        context_parts.append(f"=== REDDIT SENTIMENT ===\n{reddit_text}")
    
    # PDF content
    if pdf_path:
        pdf_text = read_pdf(pdf_path)
        if not pdf_text.startswith("Error"):
            context_parts.append(f"=== DOCUMENT CONTENT ===\n{pdf_text[:3000]}")  # Limit length
    
    # YouTube transcript
    if youtube_url:
        yt_text = get_youtube_text(youtube_url)
        if not yt_text.startswith("Error"):
            context_parts.append(f"=== YOUTUBE ANALYSIS ===\n{yt_text[:2000]}")  # Limit length
    
    return "\n\n".join(context_parts)
