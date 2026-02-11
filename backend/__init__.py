# Backend module for KnowYourBets
from .scrapers import (
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
]
