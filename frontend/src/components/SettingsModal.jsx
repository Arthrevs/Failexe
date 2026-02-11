import React, { useState, useEffect } from 'react';
import { Moon, Sun, Info, ExternalLink, X } from 'lucide-react';

const SettingsModal = ({ onClose, isOpen }) => {
    const [isDark, setIsDark] = useState(true);

    // Initialize toggle from current class
    useEffect(() => {
        setIsDark(document.documentElement.classList.contains('dark'));
    }, []);

    const toggleTheme = () => {
        const newMode = !isDark;
        setIsDark(newMode);
        if (newMode) {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    };

    if (!isOpen) return null;

    return (
        <div className="absolute top-16 right-16 w-64 bg-black/90 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl p-4 z-50 animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center mb-4 pb-4 border-b border-gray-800">
                <h3 className="font-bold text-white">Settings</h3>
                <button onClick={onClose} className="text-gray-500 hover:text-white transition-colors">
                    <X size={16} />
                </button>
            </div>

            <div className="space-y-2">
                {/* Theme Toggle */}
                <button
                    onClick={toggleTheme}
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        {isDark ? <Moon size={18} className="text-purple-400" /> : <Sun size={18} className="text-orange-400" />}
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">Dark Mode</span>
                    </div>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${isDark ? 'bg-[#5ac53b]' : 'bg-gray-600'}`}>
                        <div className={`absolute top-1 left-1 w-4 h-4 bg-white rounded-full transition-transform ${isDark ? 'translate-x-4' : 'translate-x-0'}`} />
                    </div>
                </button>

                {/* About Us */}
                <a
                    href="#"
                    className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-white/5 transition-colors group"
                >
                    <div className="flex items-center gap-3">
                        <Info size={18} className="text-blue-400" />
                        <span className="text-sm font-medium text-gray-300 group-hover:text-white">About Us</span>
                    </div>
                    <ExternalLink size={14} className="text-gray-600 group-hover:text-white" />
                </a>
            </div>

            <div className="mt-4 pt-4 border-t border-white/5 text-center text-xs text-gray-600">
                TrackBets v2.0.1
            </div>
        </div>
    );
};

export default SettingsModal;
