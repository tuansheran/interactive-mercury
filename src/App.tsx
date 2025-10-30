import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { SunModel } from './components/SunModel/Sun';
import { MercuryModel } from './components/MercuryModel/Mercury';
import { EarthModel } from './components/EarthModel/Earth';
import { SolarWind } from './components/SolarWind/SolarWind';
import './App.css';

function App() {
  return (
    <div className="app-container">
      <Canvas camera={{ position: [0, 5, 20], fov: 70 }}>
        <ambientLight intensity={0.4} />
        <directionalLight position={[5, 5, 5]} />
        <Suspense fallback={null}>
          <SunModel />
           <SolarWind count={2000} speed={0.03} />
          <MercuryModel />
          <EarthModel />
        </Suspense>
        <Stars radius={100} depth={50} count={5000} factor={4} fade />
        <OrbitControls enableZoom={true} />
      </Canvas>
    </div>
  );
}

export default App;


