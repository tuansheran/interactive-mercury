import * as THREE from 'three';
import { useMemo, useRef } from 'react';
import { useFrame } from '@react-three/fiber';

export function SolarWind({ count = 1000, speed = 0.05 }) {
  const points = useRef<THREE.Points | null>(null);

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = Math.random() * 2;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI;
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, [count]);

  useFrame(() => {
    if (!points.current) return;
    const pos = points.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < count; i++) {
      const x = pos[i * 3];
      const y = pos[i * 3 + 1];
      const z = pos[i * 3 + 2];
      const dir = new THREE.Vector3(x, y, z).normalize();
      pos[i * 3] += dir.x * speed;
      pos[i * 3 + 1] += dir.y * speed;
      pos[i * 3 + 2] += dir.z * speed;

      if (Math.sqrt(x * x + y * y + z * z) > 50) {
        pos[i * 3] = (Math.random() - 0.5) * 2;
        pos[i * 3 + 1] = (Math.random() - 0.5) * 2;
        pos[i * 3 + 2] = (Math.random() - 0.5) * 2;
      }
    }

    points.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
            attach="attributes-position"
            args={[positions, 3]} // array, itemSize
            />
      </bufferGeometry>
      <pointsMaterial color="yellow" size={0.05} />
    </points>
  );
}

