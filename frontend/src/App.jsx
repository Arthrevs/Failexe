import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import AssetForm from './components/AssetForm';
import StockDetail from './components/StockDetail';
import AILoadingScreen from './components/AILoadingScreen';

// API Base URL - empty string for relative path (works for both local main.py and production)
const API_BASE_URL = '';

// --- MOCK DATA FOR LOCALHOST DEV ---
const MOCK_DATA = {
    ticker: "MOCK",
    price_data: {
        price: 245.30,
        change_percent: 3.45,
        currency: "$",
        name: "Mock Company Inc.",
        market_cap: "780B",
        volume: "125M"
    },
    analysis: {
        verdict: {
            signal: "STRONG BUY",
            confidence: 92
        },
        action: "Accumulate on dips",
        target_price: "285.00",
        timeframe: "3-6 Months",
        risk_level: "HIGH",
        ai_explanation: "This is MOCK DATA because the backend is not reachable. The asset shows strong momentum breaking above key resistance levels. Delivery numbers exceeded expectations and margin improvements suggest operational efficiency. Technical indicators RSI and MACD are bullish.",
        reasons: [
            "Earnings beat estimates by 5%",
            "New product launch faster than expected",
            "Regulatory approval limits downside"
        ],
        flashcard: { title: "Growth Catalyst" }
    },
    social: "1. [r/wallstreetbets] THIS STOCK TO THE MOON 🚀\n2. @TechAnalyst: Buying the dip here.\n3. MarketWatch: Sector rally continues.",
    graph_data: {
        points: [
            { time: '9:30', value: 238 },
            { time: '10:00', value: 240 },
            { time: '11:00', value: 242 },
            { time: '12:00', value: 241 },
            { time: '13:00', value: 243 },
            { time: '14:00', value: 244 },
            { time: '15:00', value: 245.30 }
        ]
    }
};

function App() {
    const [view, setView] = useState('landing'); // landing | wizard | loading | detail
    const [intent, setIntent] = useState(null); // buy | sell | track
    const [selectedTicker, setSelectedTicker] = useState(null);
    const [wizardData, setWizardData] = useState(null); // Full wizard form data
    const [analysisData, setAnalysisData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);

    // API Handler - Fetches analysis from Python backend
    const handleAnalyze = async (ticker) => {
        console.log("🚀 Sending request to backend for:", ticker);
        setIsLoading(true);
        setError(null);
        setAnalysisData(null);

        try {
            // Use GET request with ticker as query parameter
            const response = await fetch(`${API_BASE_URL}/api/analyze?ticker=${encodeURIComponent(ticker)}`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            const contentType = response.headers.get("content-type");
            if (!response.ok || (contentType && contentType.includes("text/html"))) {
                // If not OK or returns HTML (Vite fallback), throw to trigger mock
                throw new Error(`API Connection Failed: ${response.status}`);
            }

            const data = await response.json();
            console.log("✅ Data received:", data);

            if (data.error) {
                throw new Error(data.error);
            }

            setAnalysisData(data);
        } catch (err) {
            console.warn("❌ Backend unavailable, using MOCK DATA:", err);
            // FALLBACK TO MOCK DATA instead of showing error screen
            setAnalysisData({
                ...MOCK_DATA,
                ticker: ticker,
                price_data: {
                    ...MOCK_DATA.price_data,
                    name: `${ticker} (Mock Mode)`,
                    price: (Math.random() * 1000).toFixed(2) // Randomize price slightly for fun
                }
            });
            setError(null); // Clear error so the UI renders
        } finally {
            setIsLoading(false);
        }
    };

    // Navigation Logic
    const goHome = () => {
        setView('landing');
        setIntent(null);
        setSelectedTicker(null);
        setWizardData(null);
        setAnalysisData(null);
        setError(null);
    };

    // Back Logic: Detail -> Home (or Wizard if we wanted complex history)
    const goBack = () => {
        if (view === 'detail' || view === 'loading') {
            goHome();
        } else if (view === 'wizard') {
            goHome();
        }
    };

    const startWizard = (type) => {
        setIntent(type);
        setView('wizard');
    };

    // Now receives full form data from wizard
    const finishWizard = (formData) => {
        setSelectedTicker(formData.ticker);
        setWizardData(formData);
        setView('loading'); // Show loading screen first
    };

    // Called when AI loading completes
    const onLoadingComplete = () => {
        setView('detail');
        handleAnalyze(selectedTicker); // Trigger API call when loading finishes
    };

    return (
        <div className="min-h-screen text-white font-sans selection:bg-lando-neon selection:text-black">

            {view === 'landing' && (
                <LandingPage onNavigate={(dest, params) => startWizard(params.type)} />
            )}

            {view === 'wizard' && (
                <AssetForm
                    intent={intent}
                    onBack={goHome}
                    onComplete={finishWizard}
                />
            )}

            {view === 'loading' && (
                <AILoadingScreen
                    ticker={selectedTicker}
                    onComplete={onLoadingComplete}
                />
            )}

            {view === 'detail' && (
                <StockDetail
                    ticker={selectedTicker}
                    wizardData={wizardData}
                    onBack={goHome}
                    analysisData={analysisData}
                    isLoading={isLoading}
                    error={error}
                    onRetry={() => handleAnalyze(selectedTicker)}
                />
            )}
        </div>
    );
}

export default App;
