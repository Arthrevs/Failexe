import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const WaveMesh = () => {
    const mesh = useRef();
    const count = 10000; // Increased for smoother look if using points, but we use Plane here

    // Generate a high-res plane
    const geometry = useMemo(() => new THREE.PlaneGeometry(30, 30, 128, 128), []);

    // Store original positions for reference
    const originalPositions = useMemo(() => {
        const pos = geometry.attributes.position.array;
        return new Float32Array(pos);
    }, [geometry]);

    useFrame((state) => {
        const time = state.clock.getElapsedTime();
        const { array } = mesh.current.geometry.attributes.position;

        for (let i = 0; i < array.length; i += 3) {
            const x = originalPositions[i];
            const y = originalPositions[i + 1];

            // Complex wave equation for fluid metallic look
            // Combining multiple sine waves with different frequencies and phases
            const wave1 = 1.5 * Math.sin(x * 0.4 + time * 0.8);
            const wave2 = 1.0 * Math.sin(y * 0.5 + time * 0.6);
            const wave3 = 0.5 * Math.sin((x + y) * 0.5 + time * 1.2);
            // Diagonal wave
            const wave4 = 0.8 * Math.cos(Math.sqrt(x * x + y * y) * 0.4 - time * 0.5);

            // Z displacement
            array[i + 2] = wave1 + wave2 + wave3 + wave4;
        }

        mesh.current.geometry.attributes.position.needsUpdate = true;
        mesh.current.geometry.computeVertexNormals(); // Crucial for lighting updates on the waves
    });

    return (
        <mesh ref={mesh} position={[0, 0, -5]} rotation={[-Math.PI / 4, 0, 0]} geometry={geometry}>
            <meshStandardMaterial
                color="#2a0a4a" // Dark Purple base
                emissive="#1a0530"
                emissiveIntensity={0.2}
                metalness={0.9}
                roughness={0.1}
                side={THREE.DoubleSide}
            />
        </mesh>
    );
};

const FluidBackground = () => {
    return (
        <div className="fixed inset-0 z-0 bg-black">
            <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1.5} color="#A0A0FF" />
                <pointLight position={[-10, -10, 10]} intensity={1.5} color="#FF0080" />
                <directionalLight position={[0, 5, 5]} intensity={1} color="#ffffff" />

                {/* Purple/Blue rim light effect */}
                <pointLight position={[0, 0, 10]} intensity={0.5} color="#8b5cf6" />

                <WaveMesh />

                {/* Fog for depth and to blend edges */}
                <fog attach="fog" args={['#000000', 5, 30]} />
            </Canvas>
        </div>
    );
};

export default FluidBackground;
