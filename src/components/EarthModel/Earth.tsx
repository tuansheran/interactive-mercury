import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function EarthModel() {
  const meshRef = useRef<THREE.Group | null>(null);
  const { scene } = useGLTF('/models/earth.glb');

  useFrame(() => {
    if (meshRef.current) {
      const time = Date.now() * 0.0001;
      meshRef.current.position.x = Math.cos(time) * 75; 
      meshRef.current.position.z = Math.sin(time) * 75;
      meshRef.current.rotation.y += 0.01; 
    }
  });

  return <primitive ref={meshRef} object={scene} scale={[0.02, 0.02, 0.02]} />;
}
