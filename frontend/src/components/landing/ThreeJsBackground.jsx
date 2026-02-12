import React from 'react';

// React Three Fiber is not fully compatible with React 19
// This wrapper safely renders ThreeJsBackground only if compatible
class ThreeJsErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false };
    }

    static getDerivedStateFromError() {
        return { hasError: true };
    }

    componentDidCatch(error, errorInfo) {
        console.warn('ThreeJsBackground failed to render (React 19 compatibility issue):', error.message);
    }

    render() {
        if (this.state.hasError) {
            return null; // Silently fail - the page works fine without the 3D background
        }
        return this.props.children;
    }
}

// Lazy load the actual Three.js component
const ThreeJsActual = React.lazy(() => import('./ThreeJsBackground_impl'));

const ThreeJsBackground = () => {
    return (
        <ThreeJsErrorBoundary>
            <React.Suspense fallback={null}>
                <ThreeJsActual />
            </React.Suspense>
        </ThreeJsErrorBoundary>
    );
};

export default ThreeJsBackground;
