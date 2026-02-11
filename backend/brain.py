"""
Brain module for KnowYourBets
Contains Gemini AI logic for investment analysis
"""

import os
import json
from dotenv import load_dotenv
import google.generativeai as genai


class AnalystAI:
    """
    AI-powered investment analyst using Google's Gemini 1.5 Flash model.
    Analyzes market data, news, and sentiment to provide investment verdicts.
    """
    
    def __init__(self):
        """
        Initialize the AnalystAI with API credentials from environment variables.
        """
        load_dotenv()
        self.api_key = os.getenv("GOOGLE_API_KEY")
        
        if self.api_key:
            genai.configure(api_key=self.api_key)
            self.model = genai.GenerativeModel('gemini-1.5-flash')
        else:
            self.model = None
            print("Warning: GOOGLE_API_KEY not found in environment variables")
    
    def analyze_context(self, text_data: str, user_case: str) -> dict:
        """
        Analyze the provided context using Gemini AI and return investment insights.
        
        Args:
            text_data (str): Combined text data from various sources (news, Reddit, PDFs, etc.)
            user_case (str): The user's specific investment question or scenario
        
        Returns:
            dict: Analysis result with the following structure:
                - verdict (str): "BUY", "SELL", "HOLD", or "WAIT"
                - reasons (list): List of key reasons supporting the verdict
                - risk_level (str): "Low", "Medium", or "High"
        """
        if not self.model:
            return {
                "verdict": "ERROR",
                "reasons": ["API key not configured"],
                "risk_level": "Unknown"
            }
        
        prompt = f"""
        You are a senior financial analyst. Based on the following market data and context,
        provide an investment analysis.
        
        User's Question: {user_case}
        
        Context Data:
        {text_data}
        
        Respond ONLY with a valid JSON object in this exact format:
        {{
            "verdict": "BUY" | "SELL" | "HOLD" | "WAIT",
            "reasons": ["reason1", "reason2", "reason3"],
            "risk_level": "Low" | "Medium" | "High"
        }}
        """
        
        try:
            response = self.model.generate_content(prompt)
            result = json.loads(response.text)
            return result
        except Exception as e:
            return {
                "verdict": "ERROR",
                "reasons": [f"Analysis failed: {str(e)}"],
                "risk_level": "Unknown"
            }
