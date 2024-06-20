import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Points, PointMaterial, Preload } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';
import './AnimatedBackground.css';

function Stars() {
  const ref = useRef();
  const sphere = random.inSphere(new Float32Array(5000), { radius: 1.2 });
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
  });
  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
}

export default function AnimatedBackground() {
  return (
    <div className="canvas-container">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Stars />
        <Preload all />
      </Canvas>
    </div>
  );
}
