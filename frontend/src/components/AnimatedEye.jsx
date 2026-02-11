import React from 'react';

const AnimatedEye = ({ isHovered }) => {
  return (
    <div className="relative w-10 h-10 mx-auto mb-4">
      <svg
        width="40"
        height="40"
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`text-gray-500 group-hover:text-blue-400 transition-all duration-300 ${isHovered ? 'scale-125 -translate-y-2' : ''}`}
      >
        {/* Eye outline */}
        <path
          d="M20 13C13 13 7.73 17.11 6 23C7.73 28.89 13 33 20 33C27 33 32.27 28.89 34 23C32.27 17.11 27 13 20 13Z"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />

        {/* Pupil container (moves left-right on hover) */}
        <g className={`transition-transform duration-700 ${isHovered ? 'animate-pupil-look' : ''}`}>
          <circle
            cx="20"
            cy="23"
            r="4"
            stroke="currentColor"
            strokeWidth="1.5"
            fill="none"
          />

          <circle
            cx="20"
            cy="23"
            r="2.5"
            fill="currentColor"
          />

        </g>
      </svg>

      {/* CSS Animations */}
      <style jsx>{`
        @keyframes pupil-look {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-3px); }
          50% { transform: translateX(3px); }
          75% { transform: translateX(-2px); }
        }
        
        .animate-pupil-look {
          animation: pupil-look 2s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default AnimatedEye;
