"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Physics, useSphere, useBox } from "@react-three/cannon";
import { Environment, Text } from "@react-three/drei";
import * as THREE from "three";
import { useRef } from "react";

// The invisible mouse collider that pushes objects around
function MouseCollider() {
  const { viewport } = useThree();
  const [ref, api] = useSphere(() => ({ type: "Kinematic", args: [2] }));
  
  useFrame(({ mouse }) => {
    const x = (mouse.x * viewport.width) / 2;
    const y = (mouse.y * viewport.height) / 2;
    api.position.set(x, y, 0);
  });
  
  return <mesh ref={ref as any}><sphereGeometry args={[2, 16, 16]} /><meshBasicMaterial visible={false} /></mesh>;
}

// Interactive Floating Orbs
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

export default function Scene() {
  return (
    <div className="absolute inset-0 w-full h-full -z-10 bg-[#0a0a0a]">
      <Canvas shadows camera={{ position: [0, 0, 15], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={2} castShadow />
        <Physics gravity={[0, 0, 0]} iterations={10}>
          <MouseCollider />
          {/* Injecting chaos: Physics-enabled elements */}
          <FloatingOrb position={[-4, 2, 0]} color="#ff0055" speed={1} />
          <FloatingOrb position={[4, -2, 0]} color="#00ffcc" speed={1.5} />
          <FloatingOrb position={[0, 4, -2]} color="#ffcc00" speed={0.8} />
          <FloatingOrb position={[-6, -4, 0]} color="#9900ff" speed={1.2} />
          <FloatingOrb position={[6, 4, -1]} color="#ff3300" speed={1.1} />
          
          {/* Massive 3D Text that objects bounce off of */}
          <Text 
            position={[0, 0, -5]} 
            fontSize={8} 
            color="#ffffff"
            font="/fonts/Geist-Bold.ttf" // Make sure to add a font file to your public folder
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