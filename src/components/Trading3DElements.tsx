import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, Text3D, Center } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

// Floating Bitcoin Symbol
const BitcoinSymbol = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={2}>
      <mesh position={position}>
        <torusGeometry args={[0.5, 0.15, 16, 32]} />
        <meshStandardMaterial color="#f7931a" emissive="#f7931a" emissiveIntensity={0.3} />
        <mesh position={[0, 0, 0.1]}>
          <boxGeometry args={[0.15, 1, 0.1]} />
          <meshStandardMaterial color="#f7931a" emissive="#f7931a" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, 0.3, 0.1]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.6, 0.15, 0.1]} />
          <meshStandardMaterial color="#f7931a" emissive="#f7931a" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, -0.3, 0.1]} rotation={[0, 0, Math.PI / 6]}>
          <boxGeometry args={[0.6, 0.15, 0.1]} />
          <meshStandardMaterial color="#f7931a" emissive="#f7931a" emissiveIntensity={0.3} />
        </mesh>
      </mesh>
    </Float>
  );
};

// Floating Ethereum Symbol
const EthereumSymbol = ({ position }: { position: [number, number, number] }) => {
  return (
    <Float speed={2.5} rotationIntensity={1.5} floatIntensity={2.5}>
      <mesh position={position}>
        <coneGeometry args={[0.4, 0.8, 4]} />
        <meshStandardMaterial color="#627eea" emissive="#627eea" emissiveIntensity={0.3} />
        <mesh position={[0, 0, 0]} rotation={[Math.PI, 0, 0]}>
          <coneGeometry args={[0.4, 0.8, 4]} />
          <meshStandardMaterial color="#627eea" emissive="#627eea" emissiveIntensity={0.3} />
        </mesh>
      </mesh>
    </Float>
  );
};

// Floating Candlestick
const Candlestick = ({ position, color }: { position: [number, number, number]; color: string }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={1.5}>
      <mesh position={position}>
        {/* Wick */}
        <mesh position={[0, 0.5, 0]}>
          <boxGeometry args={[0.05, 1, 0.05]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.2} />
        </mesh>
        {/* Body */}
        <mesh position={[0, 0.3, 0]}>
          <boxGeometry args={[0.2, 0.6, 0.2]} />
          <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.3} />
        </mesh>
      </mesh>
    </Float>
  );
};

// Floating Chart Bar
const ChartBar = ({ position, height }: { position: [number, number, number]; height: number }) => {
  return (
    <Float speed={1.8} rotationIntensity={0.3} floatIntensity={1}>
      <mesh position={position}>
        <boxGeometry args={[0.15, height, 0.15]} />
        <meshStandardMaterial color="#06b6d4" emissive="#06b6d4" emissiveIntensity={0.4} transparent opacity={0.8} />
      </mesh>
    </Float>
  );
};

// Rotating Cube with symbols
const TradingCube = ({ position }: { position: [number, number, number] }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  
  return (
    <Float speed={2} rotationIntensity={2} floatIntensity={1.5}>
      <mesh ref={meshRef} position={position}>
        <boxGeometry args={[0.8, 0.8, 0.8]} />
        <meshStandardMaterial 
          color="#8b5cf6" 
          emissive="#8b5cf6" 
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
          wireframe
        />
      </mesh>
    </Float>
  );
};

// Arrow indicator
const ArrowIndicator = ({ position, direction }: { position: [number, number, number]; direction: 'up' | 'down' }) => {
  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={2}>
      <mesh position={position} rotation={direction === 'down' ? [0, 0, Math.PI] : [0, 0, 0]}>
        <coneGeometry args={[0.2, 0.5, 3]} />
        <meshStandardMaterial 
          color={direction === 'up' ? '#22c55e' : '#ef4444'} 
          emissive={direction === 'up' ? '#22c55e' : '#ef4444'} 
          emissiveIntensity={0.5}
        />
      </mesh>
    </Float>
  );
};

const Trading3DElements = () => {
  return (
    <div className="absolute inset-0 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#06b6d4" />
        
        {/* Bitcoin symbols */}
        <BitcoinSymbol position={[-4, 2, 0]} />
        <BitcoinSymbol position={[4, -2, -2]} />
        
        {/* Ethereum symbols */}
        <EthereumSymbol position={[3, 3, -1]} />
        <EthereumSymbol position={[-3, -3, 1]} />
        
        {/* Candlesticks */}
        <Candlestick position={[-2, -1, 0]} color="#22c55e" />
        <Candlestick position={[2, 1, 1]} color="#ef4444" />
        <Candlestick position={[-1, 2, -1]} color="#22c55e" />
        
        {/* Chart bars */}
        <ChartBar position={[-3, 0, 2]} height={1.2} />
        <ChartBar position={[-2, 0, 2]} height={0.8} />
        <ChartBar position={[-1, 0, 2]} height={1.5} />
        <ChartBar position={[1, 0, 2]} height={1.0} />
        <ChartBar position={[2, 0, 2]} height={1.3} />
        <ChartBar position={[3, 0, 2]} height={0.9} />
        
        {/* Trading cubes */}
        <TradingCube position={[0, -2, -1]} />
        <TradingCube position={[4, 1, 0]} />
        
        {/* Arrow indicators */}
        <ArrowIndicator position={[-4, -1, 1]} direction="up" />
        <ArrowIndicator position={[4, 0, 0]} direction="down" />
        <ArrowIndicator position={[1, -3, 1]} direction="up" />
        
        {/* Subtle rotation */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.5}
        />
      </Canvas>
    </div>
  );
};

export default Trading3DElements;
