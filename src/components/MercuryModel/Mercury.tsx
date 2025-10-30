import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { useGLTF } from '@react-three/drei';
import * as THREE from 'three';

export function MercuryModel() {
  const meshRef = useRef<THREE.Group | null>(null);
  const { scene } = useGLTF('/models/mercury.glb');

  useFrame(() => {
    if (meshRef.current) {
      // Orbit Mercury around Sun
      const time = Date.now() * 0.0002;
      meshRef.current.position.x = Math.cos(time * 4.15) * 45;
      meshRef.current.position.z = Math.sin(time * 4.15) * 45;
      meshRef.current.rotation.y += 0.00017; 
    }
  });

  return <primitive ref={meshRef} object={scene}  scale={[0.01, 0.01, 0.01]} />;
}




