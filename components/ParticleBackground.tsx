import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-slate-950">
      <Canvas camera={{ position: [0, 0, 20], fov: 60 }} dpr={[1, 2]}>
        <SimpleParticles />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/50 via-transparent to-slate-950/80 pointer-events-none" />
    </div>
  );
};

const SimpleParticles = () => {
  const points = useRef<THREE.Points>(null!);
  
  // Uniforms to pass data to the shader
  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(1000, 1000, 0) }, // Start off-screen
    uColor: { value: new THREE.Color('#38bdf8') } // Azure Blue
  });

  const count = 2500; // Number of particles
  
  const { positions, scales, randoms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randoms = new Float32Array(count * 3); // Random values for drift
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;     // x spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z depth
      
      scales[i] = Math.random();
      
      randoms[i * 3] = Math.random();
      randoms[i * 3 + 1] = Math.random();
      randoms[i * 3 + 2] = Math.random();
    }
    return { positions, scales, randoms };
  }, []);

  useFrame((state) => {
    const { clock, pointer, viewport } = state;
    uniforms.current.uTime.value = clock.getElapsedTime();
    
    // Map normalized pointer coordinates (-1 to 1) to world coordinates at z=0
    // This ensures the repulsion matches the cursor position visually
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    
    // Smoothly interpolate mouse position for fluid effect
    uniforms.current.uMouse.value.lerp(new THREE.Vector3(x, y, 0), 0.1);
  });

  return (
    <points ref={points}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-aScale"
          count={count}
          array={scales}
          itemSize={1}
        />
        <bufferAttribute
          attach="attributes-aRandom"
          count={count}
          array={randoms}
          itemSize={3}
        />
      </bufferGeometry>
      <shaderMaterial
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        uniforms={uniforms.current}
        vertexShader={`
          uniform float uTime;
          uniform vec3 uMouse;
          attribute float aScale;
          attribute vec3 aRandom;
          varying float vAlpha;
          
          void main() {
            vec3 pos = position;
            
            // 1. Natural Drift
            // Use random attributes to make each particle drift differently
            float time = uTime * 0.3;
            pos.x += sin(time * aRandom.x + pos.y * 0.05) * 0.5;
            pos.y += cos(time * aRandom.y + pos.x * 0.05) * 0.5;
            pos.z += sin(time * aRandom.z) * 0.5;

            // 2. Mouse Interaction
            // Calculate distance in XY plane (ignoring Z for interaction feel)
            float dist = distance(pos.xy, uMouse.xy);
            float radius = 5.0; // Interaction radius
            float force = 0.0;
            
            if (dist < radius) {
               force = (radius - dist) / radius;
               // Push particles away from cursor
               vec3 dir = normalize(pos - uMouse);
               // Add a little Z push for 3D feel
               pos += dir * force * 3.0; 
               pos.z += force * 2.0;
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;
            
            // Size attenuation: larger when closer to camera
            gl_PointSize = aScale * 35.0 * (1.0 / -mvPosition.z);
            
            // Opacity logic:
            // Base opacity + brighten when interacted with
            vAlpha = 0.4 + force * 0.6;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor;
          varying float vAlpha;
          
          void main() {
            // Create a soft circular glow
            float r = length(gl_PointCoord - vec2(0.5));
            
            // Discard pixels outside circle
            if (r > 0.5) discard;
            
            // Radial gradient for soft edge
            float glow = 1.0 - (r * 2.0);
            glow = pow(glow, 2.0); // Sharpen the falloff slightly
            
            gl_FragColor = vec4(uColor, glow * vAlpha);
          }
        `}
      />
    </points>
  );
};

export default ParticleBackground;