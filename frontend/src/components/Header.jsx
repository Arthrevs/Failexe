import React, { useState } from 'react';
import { Settings, User, ArrowLeft, Home } from 'lucide-react';
import SettingsModal from './SettingsModal';
import ProfileModal from './ProfileModal';

const Header = ({ onHome, showBack, onBack }) => {
    const navItems = ['Products', 'Features', 'Pricing', 'About'];
    const [openModal, setOpenModal] = useState(null); // 'settings', 'profile', or null

    const toggleModal = (modalName) => {
        setOpenModal(prev => prev === modalName ? null : modalName);
    };

    return (
        <div className="fixed top-0 left-0 right-0 z-50">
            {/* Main nav bar - Apple-style frosted glass */}
            <div className="px-6 py-3 flex justify-between items-center bg-black/80 backdrop-blur-sm border-b border-white/5">
                <div className="flex items-center gap-8">
                    {showBack && (
                        <button
                            onClick={onBack}
                            className="p-2 -ml-2 rounded-full hover:bg-white/5 transition-colors"
                        >
                            <ArrowLeft size={18} className="text-gray-400" />
                        </button>
                    )}

                    {/* Logo */}
                    <button onClick={onHome} className="flex items-center gap-2 group">
                        {showBack && <Home size={16} className="text-gray-500 group-hover:text-[#5ac53b] transition-colors" />}
                        <div className="text-lg font-semibold tracking-tight">
                            Track<span className="text-[#5ac53b]">Bets</span>
                        </div>
                    </button>

                    {/* Navigation Items - Only show on landing */}
                    {!showBack && (
                        <nav className="hidden md:flex items-center gap-6">
                            {navItems.map((item) => (
                                <button
                                    key={item}
                                    className="text-sm text-gray-400 hover:text-white transition-colors font-medium"
                                >
                                    {item}
                                </button>
                            ))}
                        </nav>
                    )}
                </div>

                <div className="flex items-center gap-2 relative">
                    {!showBack && (
                        <button className="text-sm text-gray-400 hover:text-white transition-colors font-medium px-3 py-1.5">
                            Sign In
                        </button>
                    )}
                    <button
                        onClick={() => toggleModal('settings')}
                        className={`p-2 rounded-full transition-colors ${openModal === 'settings' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <Settings size={18} />
                    </button>
                    <button
                        onClick={() => toggleModal('profile')}
                        className={`p-2 rounded-full transition-colors ${openModal === 'profile' ? 'bg-white/10 text-white' : 'hover:bg-white/5 text-gray-400'}`}
                    >
                        <User size={18} />
                    </button>

                    {/* Modals */}
                    <SettingsModal isOpen={openModal === 'settings'} onClose={() => setOpenModal(null)} />
                    <ProfileModal isOpen={openModal === 'profile'} onClose={() => setOpenModal(null)} />
                </div>
            </div>
        </div>
    );
};

export default Header;
