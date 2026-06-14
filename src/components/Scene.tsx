"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere } from "@react-three/cannon";
import { Environment, Text, Sparkles } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

// 1. The invisible mouse collider that pushes objects around
function MouseCollider() {
  const { viewport } = useThree();
  const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [2] }));
  
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    api.position.set(x, y, 0);
  });
  
  return (
    <mesh ref={ref as any}>
      <sphereGeometry args={[2, 16, 16]} />
      <meshBasicMaterial visible={false} />
    </mesh>
  );
}

// 2. Interactive Floating Orbs
function FloatingOrb({ position, color, speed }: { position: [number, number, number], color: string, speed: number }) {
  const [ref] = useSphere(() => ({
    mass: 1,
    position,
    args: [1],
    linearDamping: 0.5,
    angularDamping: 0.5,
  }));

  return (
    <mesh ref={ref as any} castShadow receiveShadow>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial 
        color={color} 
        roughness={0.1} 
        metalness={0.8} 
        emissive={color}
        emissiveIntensity={0.5}
      />
    </mesh>
  );
}

// 3. NEW: Deep Background Rotating Geometry
function BackgroundRing() {
  const ringRef = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (ringRef.current) {
      // Rotates slowly over time based on the internal clock
      ringRef.current.rotation.x = state.clock.elapsedTime * 0.1;
      ringRef.current.rotation.y = state.clock.elapsedTime * 0.05;
      ringRef.current.rotation.z = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <mesh ref={ringRef} position={[0, 0, -20]}>
      {/* A massive, thin wireframe ring in the distant background */}
      <torusGeometry args={[18, 0.02, 16, 100]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.15} />
    </mesh>
  );
}

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-[#0a0a0a]">
      <Canvas 
        shadows 
        camera={{ position: [0, 0, 15], fov: 50 }}
        style={{ touchAction: 'auto' }}
      >
        {/* Lighting */}
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        
        {/* NEW: Volumetric Neon Dust (Sparkles) */}
        {/* Cyan dust floating slowly */}
        <Sparkles count={200} scale={30} size={2} speed={0.2} opacity={0.3} color="#00ffcc" />
        {/* Pink/Red dust floating slightly faster */}
        <Sparkles count={200} scale={30} size={2.5} speed={0.4} opacity={0.2} color="#ff0055" />
        
        {/* NEW: Ambient Background Object */}
        <BackgroundRing />
        
        {/* Interactive Physics Environment */}
        <Physics gravity={[0, 0, 0]} iterations={10}>
          <MouseCollider />
          <FloatingOrb position={[-4, 2, 0]} color="#ff0055" speed={1} />
          <FloatingOrb position={[4, -2, 0]} color="#00ffcc" speed={1.5} />
          <FloatingOrb position={[0, 4, -2]} color="#ffcc00" speed={0.8} />
          <FloatingOrb position={[-6, -4, 0]} color="#9900ff" speed={1.2} />
          <FloatingOrb position={[6, 4, -1]} color="#ff3300" speed={1.1} />
          
          <Text 
            position={[0, 0, -5]} 
            fontSize={8} 
            color="#ffffff"
            font="/fonts/Geist-Bold.ttf" 
            letterSpacing={-0.05}
          >
            MOUNTLIFT
            <meshStandardMaterial metalness={0.5} roughness={0.2} color="#111" />
          </Text>
        </Physics>
        
        <Environment preset="city" />
      </Canvas>
    </div>
  );
}