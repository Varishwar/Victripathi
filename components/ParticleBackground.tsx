import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <Canvas camera={{ position: [0, 0, 20], fov: 75 }} dpr={[1, 2]}>
        <SimpleParticles />
        <ambientLight intensity={0.1} />
      </Canvas>
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950/30 via-transparent to-slate-950/60 pointer-events-none" />
      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-azure-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '1s'}}></div>
      <div className="absolute top-1/2 right-1/3 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{animationDelay: '2s'}}></div>
    </div>
  );
};

const SimpleParticles = () => {
  const points = useRef<THREE.Points>(null!);
  
  // Uniforms to pass data to the shader
  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(1000, 1000, 0) }, // Start off-screen
    uColor1: { value: new THREE.Color('#38bdf8') }, // Azure blue
    uColor2: { value: new THREE.Color('#14b8a6') }, // Teal
    uColor3: { value: new THREE.Color('#a855f7') }  // Purple accent
  });

  const count = 2000; // Increased particle count for more impressive effect
  
  const { positions, scales, randoms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randoms = new Float32Array(count * 3); // Random values for drift/mix
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 80;     // x spread - wider
      positions[i * 3 + 1] = (Math.random() - 0.5) * 60; // y spread - taller
      positions[i * 3 + 2] = (Math.random() - 0.5) * 30; // z depth - deeper
      
      // Varied scales for depth perception
      scales[i] = 0.3 + Math.pow(Math.random(), 2) * 1.5;

      // randoms: x = color mix, y = twinkle offset, z = drift seed
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
    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;

    // Smoothly interpolate mouse position for fluid effect
    uniforms.current.uMouse.value.lerp(new THREE.Vector3(x, y, 0), 0.05);
    
    // Gentle rotation for dynamic feel
    if (points.current) {
      points.current.rotation.y += 0.0002;
      points.current.rotation.x = Math.sin(clock.getElapsedTime() * 0.1) * 0.05;
    }
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
          varying float vMix;
          varying float vTwinkle;

          void main() {
            vec3 pos = position;

            // Gentle global rotation for parallax feel
            float rot = uTime * 0.02;
            float c = cos(rot);
            float s = sin(rot);
            mat2 R = mat2(c, -s, s, c);
            pos.xy = R * pos.xy;

            // Natural drift with more movement
            float time = uTime * 0.3;
            pos.x += sin(time * aRandom.x + pos.y * 0.04) * 0.8;
            pos.y += cos(time * aRandom.y + pos.x * 0.04) * 0.8;
            pos.z += sin(time * aRandom.z * 0.6) * 0.6;

            // Mouse Interaction - stronger effect
            float dist = distance(pos.xy, uMouse.xy);
            float radius = 8.0;
            float force = 0.0;
            if (dist < radius) {
               force = (radius - dist) / radius;
               vec3 dir = normalize(pos - uMouse);
               pos += dir * force * 4.5;
               pos.z += force * 3.0;
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            gl_PointSize = aScale * 32.0 * (1.0 / -mvPosition.z);

            // Mix factor for color interpolation
            vMix = aRandom.x;

            // More pronounced twinkle
            vTwinkle = 0.5 + 0.5 * sin(uTime * 2.5 + aRandom.y * 10.0);

            vAlpha = (0.4 + force * 0.6) * vTwinkle;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          uniform vec3 uColor3;
          varying float vAlpha;
          varying float vMix;
          varying float vTwinkle;

          void main() {
            float r = length(gl_PointCoord - vec2(0.5));
            if (r > 0.5) discard;

            float glow = 1.0 - (r * 2.0);
            glow = pow(glow, 2.5);

            // Mix three colors for more variety
            vec3 color;
            if (vMix < 0.33) {
              color = uColor1;
            } else if (vMix < 0.66) {
              color = uColor2;
            } else {
              color = uColor3;
            }
            
            gl_FragColor = vec4(color, glow * vAlpha);
          }
        `}
      />
    </points>
  );
};

export default ParticleBackground;