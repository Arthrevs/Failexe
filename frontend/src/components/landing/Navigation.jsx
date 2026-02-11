import React from 'react';

const Navigation = () => {
    return (
        <nav>
            <div className="logo">TrackBets</div>
            <ul className="nav-links-c">
                <li><a href="#products" className="nav-link-item">Products</a></li>
                <li><a href="#features" className="nav-link-item">Features</a></li>
                <li><a href="#pricing" className="nav-link-item">Pricing</a></li>
                <li><a href="#about" className="nav-link-item">About</a></li>
            </ul>
            <div className="nav-actions">
                <button className="btn-outline">Sign In</button>
                <button
                    className="btn-icon"
                    aria-label="Settings"
                    onClick={() => document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' })}
                >
                    ⚙️
                </button>
                <button
                    className="btn-icon"
                    aria-label="Profile"
                    onClick={() => window.location.href = 'https://accounts.google.com/signup'}
                >
                    👤
                </button>
            </div>
        </nav>
    );
};

export default Navigation;
