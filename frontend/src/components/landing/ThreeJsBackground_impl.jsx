import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

function WireframeShape({ geometry, color, position, rotationSpeed }) {
    const meshRef = useRef();

    useFrame(() => {
        if (meshRef.current) {
            meshRef.current.rotation.x += rotationSpeed.x;
            meshRef.current.rotation.y += rotationSpeed.y;
        }
    });

    return (
        <mesh ref={meshRef} position={position} geometry={geometry}>
            <meshBasicMaterial
                color={color}
                wireframe
                transparent
                opacity={0.15}
            />
        </mesh>
    );
}

function Shapes() {
    const icosahedron = new THREE.IcosahedronGeometry(10, 0);
    const octahedron = new THREE.OctahedronGeometry(8, 0);
    const tetrahedron = new THREE.TetrahedronGeometry(12, 0);

    return (
        <>
            <WireframeShape
                geometry={icosahedron}
                color="#00FF94"
                position={[-20, 10, 0]}
                rotationSpeed={{ x: 0.001, y: 0.002 }}
            />
            <WireframeShape
                geometry={octahedron}
                color="#A0A0FF"
                position={[25, -15, -10]}
                rotationSpeed={{ x: 0.002, y: 0.001 }}
            />
            <WireframeShape
                geometry={tetrahedron}
                color="#FF0080"
                position={[0, 20, -20]}
                rotationSpeed={{ x: 0.0015, y: 0.0015 }}
            />
        </>
    );
}

const ThreeJsBackgroundImpl = () => {
    return (
        <div className="fixed inset-0 z-1 opacity-30 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 50], fov: 75 }}
                gl={{ alpha: true, antialias: true }}
            >
                <Shapes />
            </Canvas>
        </div>
    );
};

export default ThreeJsBackgroundImpl;
