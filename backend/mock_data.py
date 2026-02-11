"""
Mock Data module for KnowYourBets
Contains static demo data for testing UI without API calls
"""

# Sample demo response for Zomato stock analysis
ZOMATO_DEMO = {
    "verdict": "WAIT",
    "reasons": [
        "Strong Q3 results with 70% YoY revenue growth",
        "Bearish Reddit sentiment due to market volatility concerns",
        "Upcoming competition from Swiggy IPO may impact market share"
    ],
    "risk_level": "Medium"
}

# Additional demo data for other stocks (extend as needed)
DEMO_DATA = {
    "ZOMATO.NS": ZOMATO_DEMO,
    "RELIANCE.NS": {
        "verdict": "HOLD",
        "reasons": [
            "Stable dividend yield",
            "Strong retail business growth",
            "Oil price volatility risk"
        ],
        "risk_level": "Low"
    },
    "TATAMOTORS.NS": {
        "verdict": "BUY",
        "reasons": [
            "EV segment showing strong growth",
            "JLR turnaround successful",
            "Positive analyst upgrades"
        ],
        "risk_level": "Medium"
    }
}
