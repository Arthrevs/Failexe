# Backend module for KnowYourBets
from .scrapers import (
<<<<<<< HEAD
    get_stock_data,
    get_news,
    get_reddit_posts,
    read_pdf,
    get_youtube_text,
    aggregate_context
)
from .brain import AnalystAI
from .mock_data import ZOMATO_DEMO, DEMO_DATA

__all__ = [
    'get_stock_data',
    'get_news',
    'get_reddit_posts',
    'read_pdf',
    'get_youtube_text',
    'aggregate_context',
    'AnalystAI',
    'ZOMATO_DEMO',
    'DEMO_DATA'
=======
    fetch_stock_price,
    fetch_aggregated_sentiment, # Updated name
    extract_pdf_context,
    extract_video_context
)
from .brain import generate_flashcard, rule_based_verdict
from .mock_data import get_zomato_static, get_tcs_static

__all__ = [
    'fetch_stock_price',
    'fetch_aggregated_sentiment',
    'extract_pdf_context',
    'extract_video_context',
    'generate_flashcard',
    'rule_based_verdict',
    'get_zomato_static',
    'get_tcs_static'
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
]
