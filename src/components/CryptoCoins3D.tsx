import { Canvas } from '@react-three/fiber';
import { Sphere, Text3D, Float } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

const CryptoCoin = ({ position, color, symbol }: { position: [number, number, number], color: string, symbol: string }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.01;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.5;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <group position={position}>
        <Sphere ref={meshRef} args={[0.5]} position={[0, 0, 0]}>
          <meshStandardMaterial color={color} metalness={0.8} roughness={0.2} />
        </Sphere>
        <Text3D
          font="/fonts/helvetiker_regular.typeface.json"
          size={0.2}
          height={0.02}
          position={[-0.1, 0, 0.51]}
        >
          {symbol}
          <meshStandardMaterial color="white" />
        </Text3D>
      </group>
    </Float>
  );
};

const CryptoCoins3D = () => {
  const coins = [
    { position: [-4, 2, -5] as [number, number, number], color: "#f7931a", symbol: "₿" },
    { position: [4, -1, -3] as [number, number, number], color: "#627eea", symbol: "Ξ" },
    { position: [-2, -3, -4] as [number, number, number], color: "#00d4aa", symbol: "₳" },
    { position: [3, 3, -6] as [number, number, number], color: "#1652f0", symbol: "◎" },
    { position: [0, 4, -7] as [number, number, number], color: "#f0b90b", symbol: "◈" },
  ];

  return (
    <Canvas
      camera={{ position: [0, 0, 5], fov: 75 }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none' }}
    >
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#7c3aed" />
      
      {coins.map((coin, index) => (
        <CryptoCoin key={index} {...coin} />
      ))}
    </Canvas>
  );
};

export default CryptoCoins3D;