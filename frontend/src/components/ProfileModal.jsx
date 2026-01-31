import React, { useState, useEffect } from 'react';
import { User, Shield, Check, Loader2, X, ChevronRight } from 'lucide-react';

const ProfileModal = ({ onClose, isOpen }) => {
    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('unverified'); // unverified, verifying, verified
    const [isOwner, setIsOwner] = useState(false);

    // Load persisted state
    useEffect(() => {
        const saved = localStorage.getItem('trackbets_verification');
        if (saved === 'true') setStatus('verified');
        const savedEmail = localStorage.getItem('trackbets_email');
        if (savedEmail) setEmail(savedEmail);
    }, []);

    const handleVerify = () => {
        if (!email.includes('@') || !email.includes('.')) return;

        setStatus('verifying');

        // Mock API verification delay
        setTimeout(() => {
            setStatus('verified');
            localStorage.setItem('trackbets_verification', 'true');
            localStorage.setItem('trackbets_email', email);
        }, 2000);
    };

    if (!isOpen) return null;

    return (
        <div className="absolute top-16 right-6 w-80 bg-black/90 backdrop-blur-xl border border-gray-800 rounded-2xl shadow-2xl overflow-hidden z-50 animate-in fade-in zoom-in-95 duration-200">
            {/* Header */}
            <div className="relative h-24 bg-linear-to-r from-blue-900/50 to-purple-900/50 p-4">
                <button onClick={onClose} className="absolute top-4 right-4 text-white/50 hover:text-white transition-colors">
                    <X size={16} />
                </button>
                <div className="absolute -bottom-8 left-4">
                    <div className="w-16 h-16 rounded-full bg-[#1c1c1e] border-4 border-[#1c1c1e] flex items-center justify-center relative">
                        <User size={30} className="text-gray-400" />
                        {status === 'verified' && (
                            <div className="absolute bottom-0 right-0 bg-[#5ac53b] rounded-full p-0.5 border-2 border-[#1c1c1e]">
                                <Check size={10} className="text-black stroke-3" />
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="pt-10 px-6 pb-6">
                {status === 'verified' ? (
                    <div className="text-center animate-in fade-in slide-in-from-bottom-2">
                        <h3 className="font-bold text-white text-lg">Verified User</h3>
                        <p className="text-gray-500 text-sm mb-4">{email}</p>
                        <div className="bg-[#5ac53b]/10 text-[#5ac53b] px-3 py-2 rounded-lg text-sm font-bold flex items-center justify-center gap-2 mb-4">
                            <Shield size={16} /> Identity Verified
                        </div>
                        <button
                            onClick={() => {
                                setStatus('unverified');
                                localStorage.removeItem('trackbets_verification');
                            }}
                            className="text-xs text-gray-600 hover:text-gray-400 underline"
                        >
                            Sign Out
                        </button>
                    </div>
                ) : (
                    <div className="animate-in fade-in">
                        <h3 className="font-bold text-white mb-1">Sign In</h3>
                        <p className="text-gray-500 text-xs mb-4">Verify your identity to access premium features.</p>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-[10px] uppercase font-bold text-gray-500 tracking-wider mb-1">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="name@example.com"
                                    disabled={status === 'verifying'}
                                    className="w-full bg-white/5 border border-white/10 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-blue-500 transition-colors"
                                />
                            </div>

                            <button
                                onClick={handleVerify}
                                disabled={status === 'verifying' || !email}
                                className="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold py-2 rounded-lg text-sm transition-all flex items-center justify-center gap-2"
                            >
                                {status === 'verifying' ? (
                                    <>
                                        <Loader2 size={16} className="animate-spin" /> Verifying...
                                    </>
                                ) : (
                                    <>
                                        Verify Email <ChevronRight size={16} />
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfileModal;
