import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function SunModel() {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001; // gentle rotation
    }
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]}>
      <sphereGeometry args={[27, 100, 100]} />
      <meshStandardMaterial emissive={'#ffdd00'} emissiveIntensity={2} />
      <pointLight intensity={4} distance={20} />
    </mesh>
  );
}
