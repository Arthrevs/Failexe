import React, { useState, useEffect, useRef } from 'react';
import {
    TrendingUp,
    Zap,
    ChevronLeft,
    Sparkles,
    ArrowUpRight,
    Share2,
    Cpu,
    Globe,
    Activity,
    Scan,
    ShieldCheck,
    MessageSquare,
    X,
    Send,
    RefreshCw,
    BarChart2,
    Clock,
    Maximize2
} from 'lucide-react';
import {
    AreaChart,
    Area,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
    CartesianGrid
} from 'recharts';

// --- Configuration ---
const apiKey = import.meta.env.VITE_GEMINI_API_KEY || ""; // Gemini API Key from environment

// --- Mock Data ---
const priceData = [
    { time: '10:00', price: 228.00 },
    { time: '10:30', price: 229.20 },
    { time: '11:00', price: 228.80 },
    { time: '11:30', price: 230.50 },
    { time: '12:00', price: 231.10 },
    { time: '12:30', price: 230.90 },
    { time: '13:00', price: 232.40 },
    { time: '13:30', price: 233.10 },
    { time: '14:00', price: 232.80 },
    { time: '14:30', price: 233.50 },
    { time: '15:00', price: 234.00 },
];

const StockDetail = ({ ticker, onBack, wizardData }) => {
    const [mounted, setMounted] = useState(false);

    // AI Chat State
    const [chatOpen, setChatOpen] = useState(false);
    const [messages, setMessages] = useState([
        { role: 'assistant', text: 'Analyst Node Active. Analyzing market volatility models. How can I assist?' }
    ]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const messagesEndRef = useRef(null);

    // AI Alpha Generator State
    const [alphaLoading, setAlphaLoading] = useState(false);
    const [alphaInsights, setAlphaInsights] = useState([
        { title: "Technical Breakout", text: "Price action cleared resistance with 2.1x volume confirmation." },
        { title: "Sentiment Shift", text: "Institutional sentiment flipped net-long following supply chain updates." }
    ]);

    const displayTicker = ticker || 'TSLA';
    const displayPrice = 234.00;
    const displayChange = 2.51;

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (messagesEndRef.current) {
            messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [messages]);

    // --- Gemini API Call for Chat ---
    const handleSendMessage = async () => {
        if (!input.trim()) return;
        const userMsg = { role: 'user', text: input };
        setMessages(prev => [...prev, userMsg]);
        setInput('');
        setLoading(true);

        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `You are a professional, data-driven hedge fund analyst. 
                       Context: Stock ${displayTicker}, Price $${displayPrice}, Trend: Strong Buy, Sentiment: 89% Bullish.
                       User Question: "${input}"
                       Answer concisely (max 2 sentences). Focus on risk/reward.`
                            }]
                        }]
                    })
                }
            );
            const data = await response.json();
            const aiText = data.candidates?.[0]?.content?.parts?.[0]?.text || "Signal interrupted.";

            setMessages(prev => [...prev, { role: 'assistant', text: aiText }]);
        } catch (error) {
            console.error("Gemini Error:", error);
            setMessages(prev => [...prev, { role: 'assistant', text: "Data stream offline. Please check API configuration." }]);
        } finally {
            setLoading(false);
        }
    };

    // --- Gemini API Call for New Scenarios ---
    const generateNewAlpha = async () => {
        setAlphaLoading(true);
        try {
            const response = await fetch(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=${apiKey}`,
                {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: `Generate 2 new "Alpha Insights" for ${displayTicker}.
                       Tone: Professional, Technical, Institutional.
                       Return ONLY valid JSON array: [{"title": "...", "text": "..."}, {"title": "...", "text": "..."}]`
                            }]
                        }],
                        generationConfig: { responseMimeType: "application/json" }
                    })
                }
            );
            const data = await response.json();
            const newInsights = JSON.parse(data.candidates[0].content.parts[0].text);
            setAlphaInsights(newInsights);
        } catch (error) {
            console.error("Alpha Gen Error:", error);
            setAlphaInsights([
                { title: "Analysis Unavailable", text: "Unable to generate new insights. Check API configuration." }
            ]);
        } finally {
            setAlphaLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#050505] text-[#E0E0E0] font-sans antialiased selection:bg-cyan-900/50 pb-24 overflow-x-hidden relative">

            {/* --- Technical Grid Background (Subtle) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.03) 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}>
            </div>
            <div className="fixed inset-0 z-0 bg-gradient-to-b from-black via-transparent to-black pointer-events-none"></div>

            <div className="relative z-10 max-w-[600px] mx-auto min-h-screen flex flex-col pt-6">

                {/* --- Navigation Bar --- */}
                <div className="px-5 mb-6 flex justify-between items-center z-50">
                    {onBack ? (
                        <button
                            onClick={onBack}
                            className="flex items-center gap-1 text-slate-500 hover:text-white transition-colors group"
                        >
                            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
                            <span className="text-xs font-medium uppercase tracking-wider">Back</span>
                        </button>
                    ) : (
                        <div />
                    )}
                    <div className="flex items-center gap-2 px-3 py-1 bg-[#111] border border-white/5 rounded-full">
                        <div className="relative flex h-1.5 w-1.5">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-500 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span>
                        </div>
                        <span className="text-[10px] font-mono font-medium tracking-widest text-emerald-500 uppercase">Live</span>
                    </div>
                </div>

                {/* --- Header: Clean & Informational --- */}
                <header className="px-6 mb-8">
                    <div className="flex justify-between items-start">
                        <div>
                            <h1 className="text-4xl font-light tracking-tight text-white mb-1 flex items-center gap-3">
                                {displayTicker}
                                <span className="text-xs font-bold bg-[#1A1A1A] text-slate-400 px-2 py-1 rounded border border-white/5">NASDAQ</span>
                            </h1>
                            <p className="text-slate-500 text-xs font-mono tracking-wide">TESLA INCORPORATED</p>
                        </div>
                        <div className="text-right">
                            <div className="text-3xl font-mono text-white tracking-tight">${displayPrice.toFixed(2)}</div>
                            <div className="flex items-center justify-end gap-1.5 mt-1">
                                <span className="text-emerald-400 text-xs font-mono flex items-center bg-emerald-500/5 px-1.5 py-0.5 rounded border border-emerald-500/10">
                                    <ArrowUpRight size={12} className="mr-1" /> +{displayChange}%
                                </span>
                            </div>
                        </div>
                    </div>
                </header>

                {/* --- MAIN SIGNAL CARD: "The Instrument" --- */}
                <div className={`px-4 mb-5 transition-all duration-700 ease-out ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="relative bg-[#0A0A0A] border border-[#222] rounded-xl overflow-hidden group hover:border-[#333] transition-all">

                        {/* Technical Corner Accents */}
                        <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-cyan-500/50"></div>
                        <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-cyan-500/50"></div>
                        <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-cyan-500/50"></div>
                        <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-cyan-500/50"></div>

                        {/* Header Strip */}
                        <div className="bg-[#111] px-5 py-3 border-b border-[#222] flex justify-between items-center">
                            <div className="flex items-center gap-2">
                                <Cpu size={14} className="text-cyan-500" />
                                <span className="text-[10px] font-bold tracking-[0.2em] text-cyan-500 uppercase">Gemini 2.0 Core</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <span className="text-[10px] text-slate-500 font-mono uppercase">Confidence</span>
                                <span className="text-[10px] font-bold text-white bg-cyan-950/30 px-1.5 rounded border border-cyan-900/50">89%</span>
                            </div>
                        </div>

                        <div className="p-6">
                            <div className="flex justify-between items-center mb-8">
                                <div>
                                    <h2 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
                                        STRONG BUY
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                                        </span>
                                    </h2>
                                    <div className="h-0.5 w-12 bg-emerald-500 mt-2"></div>
                                </div>

                                {/* Mini Status Visualizer */}
                                <div className="flex gap-1 h-8 items-end opacity-50">
                                    {[1, 2, 3, 4, 3, 5, 4, 2].map((h, i) => (
                                        <div key={i} className="w-1 bg-emerald-500" style={{ height: `${h * 20}%`, opacity: 0.2 + (i * 0.1) }}></div>
                                    ))}
                                </div>
                            </div>

                            {/* Data Grid - Clean & Dense */}
                            <div className="grid grid-cols-3 gap-4 border-t border-[#222] pt-5">
                                <DataMetric label="Target" value="$265.00" sub="+13.2%" />
                                <DataMetric label="Horizon" value="2-4 WKS" sub="Mid-Term" />
                                <DataMetric label="Risk" value="0.85" sub="Beta" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- MARKET SENTIMENT SECTION --- */}
                <div className={`px-4 mb-5 transition-all duration-700 delay-100 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-5 hover:border-[#333] transition-colors">
                        <div className="flex justify-between items-end mb-3">
                            <div className="flex items-center gap-2">
                                <Activity size={14} className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Market Sentiment</span>
                            </div>
                            <span className="text-sm font-mono font-bold text-emerald-400">78% BULLISH</span>
                        </div>

                        {/* Professional Gauge Bar */}
                        <div className="h-2 w-full bg-[#1A1A1A] rounded-sm overflow-hidden relative mb-2">
                            <div className="absolute top-0 left-0 h-full w-[78%] bg-gradient-to-r from-emerald-900 to-emerald-400"></div>
                            {/* Tick Marks for precision */}
                            <div className="absolute inset-0 flex justify-between px-[1px]">
                                {[0, 25, 50, 75, 100].map(tick => (
                                    <div key={tick} className="w-[1px] h-full bg-[#050505]"></div>
                                ))}
                            </div>
                        </div>

                        <div className="flex justify-between text-[10px] font-mono text-slate-600 uppercase">
                            <span>Bearish</span>
                            <span>Neutral</span>
                            <span className="text-emerald-500">Bullish</span>
                        </div>
                    </div>
                </div>

                {/* --- ALPHA INSIGHTS (Gemini) --- */}
                <div className={`px-4 mb-5 transition-all duration-700 delay-200 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-[#0A0A0A] border border-[#222] rounded-xl p-1 relative group overflow-hidden">
                        <div className="absolute top-0 left-0 w-[2px] h-full bg-indigo-500/50"></div>

                        <div className="p-4 bg-[#0F0F0F]">
                            <div className="flex justify-between items-center mb-4">
                                <div className="flex items-center gap-2">
                                    <Zap size={14} className="text-indigo-400" />
                                    <h3 className="text-xs font-bold text-white uppercase tracking-widest">Alpha Signals</h3>
                                </div>
                                <button
                                    onClick={generateNewAlpha}
                                    disabled={alphaLoading}
                                    className="p-1.5 hover:bg-white/5 rounded transition-colors text-slate-400 hover:text-white"
                                >
                                    <RefreshCw size={12} className={alphaLoading ? "animate-spin" : ""} />
                                </button>
                            </div>

                            <div className="space-y-4">
                                {alphaLoading ? (
                                    <div className="text-xs font-mono text-slate-500 animate-pulse py-2">Processing market data streams...</div>
                                ) : (
                                    alphaInsights.map((insight, idx) => (
                                        <div key={idx} className="relative pl-3 border-l border-[#333]">
                                            <h4 className="text-xs font-bold text-slate-200 mb-0.5">{insight.title}</h4>
                                            <p className="text-xs text-slate-400 leading-relaxed font-light">{insight.text}</p>
                                        </div>
                                    ))
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- CHART SECTION --- */}
                <div className={`px-4 mb-24 transition-all duration-700 delay-300 ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
                    <div className="bg-[#0A0A0A] border border-[#222] rounded-xl overflow-hidden">
                        <div className="px-5 py-3 border-b border-[#222] flex justify-between items-center bg-[#111]">
                            <div className="flex items-center gap-2">
                                <BarChart2 size={14} className="text-slate-400" />
                                <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Price Action</span>
                            </div>
                            <div className="flex gap-0.5 bg-[#0A0A0A] p-0.5 rounded border border-[#222]">
                                {['1H', '1D', '1W'].map(t => (
                                    <button key={t} className={`text-[10px] font-mono px-2 py-0.5 rounded transition-colors ${t === '1D' ? 'bg-[#222] text-white' : 'text-slate-600 hover:text-slate-400'}`}>
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="h-56 w-full bg-[#050505] p-2">
                            <ResponsiveContainer width="100%" height="100%">
                                <AreaChart data={priceData} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
                                    <defs>
                                        <linearGradient id="chartFill" x1="0" y1="0" x2="0" y2="1">
                                            <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                            <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                        </linearGradient>
                                    </defs>
                                    <CartesianGrid strokeDasharray="3 3" stroke="#1A1A1A" vertical={false} />
                                    <XAxis dataKey="time" hide />
                                    <YAxis hide domain={['auto', 'auto']} />
                                    <Tooltip
                                        contentStyle={{
                                            backgroundColor: '#0A0A0A',
                                            borderColor: '#333',
                                            fontSize: '11px',
                                            fontFamily: 'monospace',
                                            color: '#ccc'
                                        }}
                                        itemStyle={{ color: '#10b981' }}
                                        cursor={{ stroke: '#333' }}
                                    />
                                    <Area
                                        type="monotone"
                                        dataKey="price"
                                        stroke="#10b981"
                                        strokeWidth={1.5}
                                        fill="url(#chartFill)"
                                    />
                                </AreaChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>

                {/* --- BOTTOM ACTION BAR --- */}
                <div className="fixed bottom-6 inset-x-4 max-w-[600px] mx-auto z-40 flex gap-3">
                    {/* Chat Trigger */}
                    <button
                        onClick={() => setChatOpen(true)}
                        className="flex items-center justify-center gap-2 px-5 py-3 bg-[#111] border border-[#333] hover:border-cyan-500/50 hover:bg-[#161616] text-white rounded-lg transition-all group"
                    >
                        <MessageSquare size={16} className="text-cyan-500 group-hover:scale-110 transition-transform" />
                        <span className="text-xs font-bold uppercase tracking-wider">Analyst</span>
                    </button>
                </div>

                {/* --- CHAT MODAL (Gemini) --- */}
                {chatOpen && (
                    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-end sm:items-center justify-center animate-fade-in p-0 sm:p-4">
                        <div className="bg-[#09090b] border border-[#222] w-full max-w-[600px] h-[85vh] sm:rounded-xl rounded-t-xl flex flex-col shadow-2xl relative overflow-hidden">

                            {/* Chat Header */}
                            <div className="p-4 border-b border-[#222] bg-[#111] flex justify-between items-center">
                                <div className="flex items-center gap-2">
                                    <div className="w-2 h-2 bg-emerald-500 rounded-full animate-pulse"></div>
                                    <span className="text-xs font-bold text-white uppercase tracking-widest">Live Analyst</span>
                                </div>
                                <button onClick={() => setChatOpen(false)} className="text-slate-500 hover:text-white transition-colors">
                                    <X size={18} />
                                </button>
                            </div>

                            {/* Messages */}
                            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-[#050505]">
                                {messages.map((msg, i) => (
                                    <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                        <div className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed border ${msg.role === 'user'
                                            ? 'bg-[#111] border-[#333] text-white rounded-br-none'
                                            : 'bg-[#0A0A0A] border-[#222] text-slate-300 rounded-bl-none'
                                            }`}>
                                            {msg.role === 'assistant' && <div className="text-[9px] font-bold text-cyan-500 uppercase mb-1">Gemini AI</div>}
                                            {msg.text}
                                        </div>
                                    </div>
                                ))}
                                {loading && (
                                    <div className="text-xs font-mono text-slate-600 pl-4 animate-pulse">Typing...</div>
                                )}
                                <div ref={messagesEndRef} />
                            </div>

                            {/* Input */}
                            <div className="p-4 bg-[#111] border-t border-[#222]">
                                <div className="relative">
                                    <input
                                        value={input}
                                        onChange={(e) => setInput(e.target.value)}
                                        onKeyDown={(e) => e.key === 'Enter' && handleSendMessage()}
                                        placeholder="Ask about risk, entry, or news..."
                                        className="w-full bg-[#050505] border border-[#333] rounded-lg pl-3 pr-10 py-3 text-sm text-white focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-slate-600 font-mono"
                                    />
                                    <button
                                        onClick={handleSendMessage}
                                        disabled={loading}
                                        className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 text-cyan-500 hover:text-cyan-400 disabled:opacity-50"
                                    >
                                        <Send size={16} />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}

            </div>
        </div>
    );
};

// --- Sub-Components ---
const DataMetric = ({ label, value, sub }) => (
    <div className="flex flex-col gap-1">
        <span className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{label}</span>
        <span className="text-lg font-mono font-bold text-white tracking-tight">{value}</span>
        <span className="text-[10px] text-cyan-500/80 font-mono">{sub}</span>
    </div>
);

export default StockDetail;
