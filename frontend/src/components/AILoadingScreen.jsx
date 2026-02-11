<<<<<<< HEAD
import React, { useEffect, useState } from 'react';
import { Brain, Database, Activity, Network, CheckCircle2, Lock, Cpu } from 'lucide-react';

const AILoadingScreen = ({ ticker, onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentStep, setCurrentStep] = useState(0);

    const steps = [
        { icon: Database, text: `Connecting to market data streams for ${ticker || 'asset'}...` },
        { icon: Activity, text: "Analyzing price action & volatility models..." },
        { icon: Network, text: "Processing sentiment from global news sources..." },
        { icon: Brain, text: "Generating predictive alpha strategies..." }
    ];

    useEffect(() => {
        // Total duration ~4.5 seconds
        const interval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                // Nonlinear progress for realism
                const increment = Math.random() * 2 + 0.5;
                return Math.min(prev + increment, 100);
            });
        }, 50);

        // Step transitions
        const stepInterval = setInterval(() => {
            setCurrentStep(prev => {
                if (prev < steps.length - 1) return prev + 1;
                return prev;
            });
        }, 1100);

        // Complete
        const timeout = setTimeout(() => {
            onComplete?.();
        }, 5000);

        return () => {
            clearInterval(interval);
            clearInterval(stepInterval);
            clearTimeout(timeout);
        };
    }, [ticker, onComplete, steps.length]);

    const CurrentIcon = steps[currentStep].icon;

    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/95 backdrop-blur-3xl">
            {/* Background Ambient Glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-lando-main/10 rounded-full blur-[120px] animate-pulse-slow"></div>
                <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-purple-500/10 rounded-full blur-[100px] animate-float"></div>
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-blue-500/10 rounded-full blur-[80px] animate-float-delayed"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center max-w-md w-full px-6">

                {/* Central AI Core Animation */}
                <div className="relative w-32 h-32 mb-12 flex items-center justify-center">
                    {/* Rotating Rings */}
                    <div className="absolute inset-0 border-2 border-dashed border-lando-main/30 rounded-full animate-spin-slow"></div>
                    <div className="absolute inset-2 border border-lando-main/20 rounded-full animate-reverse-spin"></div>

                    {/* Core Pulse */}
                    <div className="absolute inset-0 bg-lando-main/10 rounded-full blur-xl animate-pulse-fast"></div>

                    {/* Center Icon */}
                    <div className="relative z-10 p-4 bg-black/40 backdrop-blur-md rounded-2xl border border-lando-main/30 shadow-[0_0_30px_rgba(110,241,149,0.15)]">
                        <Cpu size={40} className="text-lando-main animate-pulse" />
                    </div>

                    {/* Particles/Data Streams */}
                    {[...Array(6)].map((_, i) => (
                        <div
                            key={i}
                            className="absolute w-1 h-1 bg-lando-main/60 rounded-full"
                            style={{
                                top: '50%',
                                left: '50%',
                                transform: `rotate(${i * 60}deg) translateY(-40px)`,
                                animation: `particleFade 2s infinite ${i * 0.2}s`
                            }}
                        />
                    ))}
                </div>

                {/* Status Text & Steps */}
                <div className="w-full text-center space-y-6">
                    <h2 className="text-3xl font-bold text-white tracking-tight animate-fade-in">
                        analyzing <span className="text-lando-main">{ticker}</span>
                    </h2>

                    <div className="h-16 relative">
                        {steps.map((step, idx) => (
                            <div
                                key={idx}
                                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-500 transform ${idx === currentStep
                                        ? 'opacity-100 translate-y-0'
                                        : idx < currentStep
                                            ? 'opacity-0 -translate-y-4'
                                            : 'opacity-0 translate-y-4'
                                    }`}
                            >
                                <div className="flex items-center gap-2 text-gray-400">
                                    <step.icon size={18} className={idx === currentStep ? "text-lando-main animate-bounce" : ""} />
                                    <span className="text-lg font-light tracking-wide">{step.text}</span>
                                </div>
                            </div>
=======
import React, { useState, useEffect } from 'react';
import { Loader2, Globe, MessageSquare, Brain, Sparkles } from 'lucide-react';

const AILoadingScreen = ({ ticker, onComplete }) => {
    const [stage, setStage] = useState(0);
    const [progress, setProgress] = useState(0);

    const stages = [
        {
            icon: Globe,
            text: 'Scraping global news sources...',
            color: 'text-cyan-400',
            bgColor: 'from-cyan-500/20 to-cyan-600/10'
        },
        {
            icon: MessageSquare,
            text: 'Analyzing Reddit sentiment...',
            color: 'text-orange-400',
            bgColor: 'from-orange-500/20 to-orange-600/10'
        },
        {
            icon: Brain,
            text: 'Gemini 2.5 Flash calculating verdict...',
            color: 'text-purple-400',
            bgColor: 'from-purple-500/20 to-purple-600/10'
        }
    ];

    useEffect(() => {
        // Progress animation
        const progressInterval = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) return 100;
                return prev + 1;
            });
        }, 30); // 3 seconds total = 100 steps * 30ms

        // Stage transitions at 1s and 2s
        const stage1Timeout = setTimeout(() => setStage(1), 1000);
        const stage2Timeout = setTimeout(() => setStage(2), 2000);

        // Complete at 3s
        const completeTimeout = setTimeout(() => {
            if (onComplete) onComplete();
        }, 3000);

        return () => {
            clearInterval(progressInterval);
            clearTimeout(stage1Timeout);
            clearTimeout(stage2Timeout);
            clearTimeout(completeTimeout);
        };
    }, [onComplete]);

    const CurrentIcon = stages[stage].icon;

    return (
        <div className="min-h-screen flex flex-col items-center justify-center px-6 relative z-10 fade-in">
            {/* Background glow */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-linear-to-br from-purple-500/10 via-blue-500/10 to-cyan-500/10 rounded-full blur-3xl animate-pulse" />
            </div>

            {/* Main Card */}
            <div className="relative max-w-md w-full">
                {/* Animated glow ring */}
                <div className="absolute -inset-1 bg-linear-to-r from-purple-600 via-blue-500 to-cyan-400 rounded-3xl opacity-30 blur-xl animate-pulse" />

                <div className="relative bg-linear-to-br from-[#1a1a2e] via-[#16213e] to-[#0f3460] rounded-2xl p-10 border border-white/10 overflow-hidden">
                    {/* Shimmer overlay */}
                    <div className="absolute inset-0 shimmer opacity-30 pointer-events-none" />

                    {/* Ticker Badge */}
                    <div className="text-center mb-8 relative">
                        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-4">
                            <Sparkles size={14} className="text-purple-400" />
                            <span className="text-sm font-bold text-white">{ticker}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-2">AI Analysis in Progress</h2>
                        <p className="text-gray-500 text-sm">Our AI is crunching the data...</p>
                    </div>

                    {/* Current Stage Display */}
                    <div className={`flex items-center gap-4 p-5 rounded-xl bg-linear-to-br ${stages[stage].bgColor} border border-white/10 mb-6 transition-all duration-500`}>
                        <div className={`p-3 rounded-xl bg-black/40 ${stages[stage].color}`}>
                            <CurrentIcon size={28} className="animate-pulse" />
                        </div>
                        <div className="flex-1">
                            <div className={`font-bold ${stages[stage].color} text-lg`}>
                                {stages[stage].text}
                            </div>
                        </div>
                        <Loader2 size={24} className="text-white/50 animate-spin" />
                    </div>

                    {/* Stage Indicators */}
                    <div className="flex justify-center gap-3 mb-6">
                        {stages.map((s, i) => (
                            <div
                                key={i}
                                className={`w-3 h-3 rounded-full transition-all duration-300 ${i <= stage
                                        ? 'bg-white scale-100'
                                        : 'bg-gray-700 scale-75'
                                    }`}
                            />
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
                        ))}
                    </div>

                    {/* Progress Bar */}
<<<<<<< HEAD
                    <div className="relative h-1 w-full bg-gray-900/50 rounded-full overflow-hidden backdrop-blur-sm border border-white/5">
                        <div
                            className="absolute top-0 left-0 h-full bg-gradient-to-r from-lando-main via-green-400 to-lando-main"
                            style={{ width: `${progress}%` }}
                        >
                            <div className="absolute inset-0 bg-white/30 animate-shimmer"></div>
                        </div>
                    </div>

                    <div className="flex justify-between text-xs text-gray-500 font-mono">
                        <span>AI PROCESSING NODE: 0x8F...3A</span>
                        <span>{Math.round(progress)}% COMPLETE</span>
=======
                    <div className="relative">
                        <div className="h-2 bg-black/40 rounded-full overflow-hidden">
                            <div
                                className="h-full bg-linear-to-r from-purple-500 via-blue-500 to-cyan-400 transition-all duration-100 ease-linear rounded-full"
                                style={{ width: `${progress}%` }}
                            />
                        </div>
                        <div className="flex justify-between mt-2 text-xs text-gray-500">
                            <span>Processing...</span>
                            <span>{Math.round(progress)}%</span>
                        </div>
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
                    </div>
                </div>
            </div>

<<<<<<< HEAD
            <style jsx>{`
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        @keyframes pulse-fast {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 0.8; transform: scale(1.1); }
        }
        @keyframes particleFade {
          0% { opacity: 0; transform: rotate(var(--rot)) translateY(-30px); }
          50% { opacity: 1; }
          100% { opacity: 0; transform: rotate(var(--rot)) translateY(-50px); }
        }
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(20px, -20px); }
        }
        @keyframes float-delayed {
          0%, 100% { transform: translate(0, 0); }
          50% { transform: translate(-20px, 10px); }
        }
        
        .animate-spin-slow { animation: spin-slow 10s linear infinite; }
        .animate-reverse-spin { animation: reverse-spin 15s linear infinite; }
        .animate-pulse-fast { animation: pulse-fast 2s ease-in-out infinite; }
        .animate-pulse-slow { animation: pulse-fast 4s ease-in-out infinite; }
        .animate-shimmer { animation: shimmer 2s linear infinite; }
        .animate-float { animation: float 10s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 12s ease-in-out infinite; }
      `}</style>
=======
            {/* Powered by badge */}
            <div className="mt-8 flex items-center gap-2 text-gray-500 text-sm">
                <Brain size={16} className="text-purple-400" />
                <span>Powered by <span className="text-purple-400 font-semibold">Gemini 2.5 Flash</span></span>
            </div>
>>>>>>> 5975cd6370f8958f548059bc3406ee08e2ffe68b
        </div>
    );
};

export default AILoadingScreen;
