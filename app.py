<<<<<<< HEAD
"""
KnowYourBets - AI-Powered Investment Research Assistant
Main Streamlit application entry point
"""

import streamlit as st
import pandas as pd
import plotly.graph_objects as go
import plotly.express as px
from backend import (
    get_stock_data,
    get_news,
    get_reddit_posts,
    read_pdf,
    get_youtube_text,
    aggregate_context,
    AnalystAI,
    ZOMATO_DEMO,
    DEMO_DATA
)

# Page configuration
st.set_page_config(
    page_title="KnowYourBets",
    page_icon="📈",
    layout="wide",
    initial_sidebar_state="expanded"
)

# Custom CSS for better styling
st.markdown("""
<style>
    .main-header {
        font-size: 2.5rem;
        font-weight: bold;
        background: linear-gradient(90deg, #667eea 0%, #764ba2 100%);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: 1rem;
    }
    .verdict-box {
        padding: 1.5rem;
        border-radius: 10px;
        text-align: center;
        font-size: 1.5rem;
        font-weight: bold;
    }
    .verdict-buy { background-color: #d4edda; color: #155724; }
    .verdict-sell { background-color: #f8d7da; color: #721c24; }
    .verdict-hold { background-color: #fff3cd; color: #856404; }
    .verdict-wait { background-color: #cce5ff; color: #004085; }
    .risk-low { color: #28a745; }
    .risk-medium { color: #ffc107; }
    .risk-high { color: #dc3545; }
</style>
""", unsafe_allow_html=True)

# Main title
st.markdown('<h1 class="main-header">📈 KnowYourBets</h1>', unsafe_allow_html=True)
st.markdown("<p style='text-align: center; color: gray;'>AI-Powered Investment Research Assistant</p>", unsafe_allow_html=True)

# Sidebar configuration
with st.sidebar:
    st.header("⚙️ Configuration")
    
    # Demo mode toggle
    demo_mode = st.toggle("🧪 Demo Mode", value=True, help="Use mock data instead of live APIs")
    
    st.markdown("---")
    
    # Stock ticker input
    ticker = st.text_input(
        "📊 Stock Ticker",
        placeholder="e.g., ZOMATO.NS, RELIANCE.NS",
        help="Enter NSE ticker with .NS suffix or US ticker"
    )
    
    # User's investment question
    user_case = st.text_area(
        "❓ Your Question",
        placeholder="e.g., Should I buy Zomato for long term?",
        help="Describe your investment scenario or question"
    )
    
    st.markdown("---")
    
    # Additional data sources
    st.subheader("📁 Additional Sources")
    
    uploaded_pdf = st.file_uploader(
        "Upload PDF (Annual Report, etc.)",
        type=["pdf"],
        help="Upload company documents for analysis"
    )
    
    youtube_url = st.text_input(
        "YouTube Video URL",
        placeholder="https://youtube.com/watch?v=...",
        help="Link to analysis video for transcript extraction"
    )
    
    st.markdown("---")
    
    # Analyze button
    analyze_button = st.button("🔍 Analyze", type="primary", use_container_width=True)

# Main content area
if analyze_button and ticker:
    with st.spinner("🔄 Gathering intelligence..."):
        
        if demo_mode:
            # Use mock data
            result = DEMO_DATA.get(ticker.upper(), ZOMATO_DEMO)
            stock_data = {
                "name": ticker.replace(".NS", ""),
                "current_price": 250.50,
                "previous_close": 248.00,
                "market_cap": 220000000000,
                "pe_ratio": 350.5,
                "52_week_high": 280.00,
                "52_week_low": 120.00
            }
            news = [
                {"title": "Company reports strong Q3 earnings", "source": "Economic Times", "date": "2 hours ago"},
                {"title": "Analysts upgrade rating to Buy", "source": "Moneycontrol", "date": "1 day ago"},
                {"title": "New expansion plans announced", "source": "Business Standard", "date": "2 days ago"}
            ]
        else:
            # Live data
            stock_data = get_stock_data(ticker)
            news = get_news(ticker)
            
            # Aggregate context for AI
            context = aggregate_context(
                ticker,
                pdf_path=None,  # Handle uploaded PDF
                youtube_url=youtube_url if youtube_url else None
            )
            
            # Get AI analysis
            ai = AnalystAI()
            result = ai.analyze_context(context, user_case)
        
        # Display results
        st.markdown("---")
        
        # Verdict section
        col1, col2, col3 = st.columns([2, 2, 1])
        
        with col1:
            verdict = result.get("verdict", "N/A")
            verdict_class = f"verdict-{verdict.lower()}" if verdict.lower() in ["buy", "sell", "hold", "wait"] else ""
            st.markdown(f"""
                <div class="verdict-box {verdict_class}">
                    🎯 VERDICT: {verdict}
                </div>
            """, unsafe_allow_html=True)
        
        with col2:
            risk = result.get("risk_level", "Unknown")
            risk_class = f"risk-{risk.lower()}" if risk.lower() in ["low", "medium", "high"] else ""
            st.metric("⚠️ Risk Level", risk)
        
        with col3:
            if not demo_mode and "current_price" in stock_data:
                st.metric(
                    "💰 Current Price",
                    f"₹{stock_data.get('current_price', 'N/A')}"
                )
        
        # Reasons
        st.markdown("### 📋 Key Insights")
        reasons = result.get("reasons", [])
        for i, reason in enumerate(reasons, 1):
            st.markdown(f"**{i}.** {reason}")
        
        # Stock info cards
        st.markdown("### 📊 Stock Overview")
        if "error" not in stock_data:
            metrics_col1, metrics_col2, metrics_col3, metrics_col4 = st.columns(4)
            
            with metrics_col1:
                st.metric("Market Cap", f"₹{stock_data.get('market_cap', 0)/10000000:.0f} Cr" if stock_data.get('market_cap') else "N/A")
            with metrics_col2:
                st.metric("P/E Ratio", f"{stock_data.get('pe_ratio', 'N/A'):.2f}" if stock_data.get('pe_ratio') else "N/A")
            with metrics_col3:
                st.metric("52W High", f"₹{stock_data.get('52_week_high', 'N/A')}")
            with metrics_col4:
                st.metric("52W Low", f"₹{stock_data.get('52_week_low', 'N/A')}")
        
        # News section
        st.markdown("### 📰 Recent News")
        if news and "error" not in (news[0] if news else {}):
            for article in news[:5]:
                with st.expander(f"📄 {article.get('title', 'No title')}", expanded=False):
                    st.write(f"**Source:** {article.get('source', 'Unknown')}")
                    st.write(f"**Date:** {article.get('date', 'Unknown')}")
                    if article.get('description'):
                        st.write(article.get('description'))

elif analyze_button and not ticker:
    st.warning("⚠️ Please enter a stock ticker to analyze.")

else:
    # Welcome/instruction state
    st.markdown("---")
    
    col1, col2 = st.columns(2)
    
    with col1:
        st.markdown("### 🚀 How it works")
        st.markdown("""
        1. **Enter a stock ticker** (e.g., ZOMATO.NS, TATAMOTORS.NS)
        2. **Describe your investment scenario** or question
        3. **Optionally upload** annual reports or YouTube analysis links
        4. **Click Analyze** to get AI-powered insights
        """)
    
    with col2:
        st.markdown("### 📊 Data Sources")
        st.markdown("""
        - 📈 **Stock Data** - Real-time prices via Yahoo Finance
        - 📰 **News** - Latest headlines from Google News
        - 💬 **Reddit** - Community sentiment analysis
        - 📄 **PDFs** - Annual reports & documents
        - 🎥 **YouTube** - Video transcript analysis
        """)
    
    # Demo quick access
    st.markdown("---")
    st.markdown("### 🧪 Quick Demo")
    demo_col1, demo_col2, demo_col3 = st.columns(3)
    
    with demo_col1:
        if st.button("Try Zomato", use_container_width=True):
            st.session_state['demo_ticker'] = "ZOMATO.NS"
            st.rerun()
    
    with demo_col2:
        if st.button("Try Reliance", use_container_width=True):
            st.session_state['demo_ticker'] = "RELIANCE.NS"
            st.rerun()
    
    with demo_col3:
        if st.button("Try Tata Motors", use_container_width=True):
            st.session_state['demo_ticker'] = "TATAMOTORS.NS"
            st.rerun()

# Footer
st.markdown("---")
st.markdown(
    "<p style='text-align: center; color: gray; font-size: 0.8rem;'>"
    "Built with ❤️ for FinTech Hackathon | Powered by Gemini AI"
    "</p>",
    unsafe_allow_html=True
)
=======
import streamlit as st
import time
import os
from dotenv import load_dotenv

# --- BACKEND IMPORTS (The Bridge) ---
# We use the explicit getters we built in scrapers.py
from backend.scrapers import get_stock_price, get_news, get_reddit_posts
# We use the new Class we built in brain.py
from backend.brain import FinancialAnalyst

# Load Environment
load_dotenv()

# --- 1. CONFIG & CSS (The Lando Aesthetic) ---
st.set_page_config(
    page_title="TrackBets | High-Performance Finance",
    page_icon="🏎️",
    layout="wide",
    initial_sidebar_state="collapsed"
)

CSS_STYLES = """
<style>
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=JetBrains+Mono:wght@400;700&family=Roboto+Condensed:wght@700&display=swap');

.stApp { background-color: #050505 !important; font-family: 'Inter', sans-serif; color: #FFFFFF; }
header, footer, #MainMenu {visibility: hidden !important;}

h1, h2, h3 { font-family: 'Roboto Condensed', sans-serif !important; text-transform: uppercase; }

/* Input Styling */
div[data-testid="stTextInput"] input {
    background-color: #0A0A0A !important;
    color: #CCFF00 !important;
    border: 1px solid #333 !important;
    font-family: 'JetBrains Mono', monospace;
}

/* Flashcard Styling */
.flashcard {
    background: rgba(255, 255, 255, 0.05);
    border: 1px solid #333;
    border-radius: 12px;
    padding: 2rem;
    backdrop-filter: blur(10px);
    margin-top: 20px;
}
.flashcard-BUY { border-left: 4px solid #CCFF00; box-shadow: 0 0 20px rgba(204, 255, 0, 0.1); }
.flashcard-SELL { border-left: 4px solid #FF3B30; box-shadow: 0 0 20px rgba(255, 59, 48, 0.1); }
.flashcard-HOLD { border-left: 4px solid #FFCC00; }

/* Metrics */
.metric-value { font-family: 'JetBrains Mono', monospace; font-size: 1.5rem; font-weight: 700; }
.text-green { color: #CCFF00; }
.text-red { color: #FF3B30; }
</style>
"""
st.markdown(CSS_STYLES, unsafe_allow_html=True)

# --- 2. LOGIC FUNCTIONS ---

def render_result(ticker, price, verdict_data):
    """Renders the final analysis card"""
    verdict = verdict_data.get('verdict', 'HOLD')
    confidence = verdict_data.get('confidence', 50)
    reasons = verdict_data.get('reasons', [])
    
    # CSS Classes
    card_class = f"flashcard-{verdict}"
    color_class = "text-green" if verdict == "BUY" else "text-red" if verdict == "SELL" else "text-yellow"

    # HTML Component
    st.markdown(f"""
    <div class="flashcard {card_class}">
        <div style="display: flex; justify-content: space-between; align-items: center;">
            <h1 style="margin:0;">{ticker.upper()}</h1>
            <h2 class="{color_class}" style="font-size: 2.5rem;">{verdict}</h2>
        </div>
        
        <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 20px; margin-top: 20px;">
            <div>
                <span style="color:#888; font-size:0.8rem;">CURRENT PRICE</span>
                <div class="metric-value">₹{price}</div>
            </div>
            <div>
                <span style="color:#888; font-size:0.8rem;">AI CONFIDENCE</span>
                <div class="metric-value">{confidence}%</div>
            </div>
        </div>

        <div style="margin-top: 20px; border-top: 1px solid #333; padding-top: 15px;">
            <span style="color:#888; font-size:0.8rem;">KEY DRIVERS</span>
            <ul style="margin-top: 10px; line-height: 1.6;">
                {''.join([f'<li>{r}</li>' for r in reasons])}
            </ul>
        </div>
    </div>
    """, unsafe_allow_html=True)


# --- 3. MAIN APP LAYOUT ---

# Title
col1, col2, col3 = st.columns([1, 2, 1])
with col2:
    st.markdown("<h1 style='text-align: center; margin-bottom: 0px;'>TRACK<span style='color:#CCFF00'>BETS</span></h1>", unsafe_allow_html=True)
    st.markdown("<p style='text-align: center; color: #888; font-family:monospace;'>// RETAIL SENTIMENT ANALYZER v2.0</p>", unsafe_allow_html=True)

# Search Bar
ticker_input = st.text_input("", placeholder="Enter Ticker (e.g. ZOMATO.NS, TATAMOTORS.NS)", label_visibility="collapsed")

# Analyze Button
if st.button("RUN ANALYSIS 🚀", type="primary", use_container_width=True):
    if not ticker_input:
        st.warning("⚠️ Please enter a ticker symbol")
    else:
        with st.status("🔍 Scanning Market Data...", expanded=True) as status:
            
            # 1. Price
            st.write("📈 Fetching Live Prices...")
            price, history = get_stock_price(ticker_input)
            
            # 2. News
            st.write("📰 Aggregating Global News...")
            news_text = get_news(ticker_input)
            
            # 3. Social
            st.write("🗣️ Analyzing Reddit Sentiment...")
            social_text = get_reddit_posts(ticker_input)
            
            # 4. Brain
            st.write("🧠 Feeding Neural Network...")
            analyst = FinancialAnalyst()
            
            # Combine Context
            full_context = f"Price: {price}. News: {news_text}. Social Sentiment: {social_text}"
            result = analyst.analyze(full_context, "Investment Decision")
            
            status.update(label="Analysis Complete!", state="complete", expanded=False)
            
        # 5. Render
        render_result(ticker_input, price, result)
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
