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
    uColor1: { value: new THREE.Color('#38bdf8') }, // Azure
    uColor2: { value: new THREE.Color('#7c3aed') }  // Purple accent
  });

  const count = 1200; // Reduced particle count for performance and clarity
  
  const { positions, scales, randoms } = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const scales = new Float32Array(count);
    const randoms = new Float32Array(count * 3); // Random values for drift/mix
    
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 60;     // x spread
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40; // y spread
      positions[i * 3 + 2] = (Math.random() - 0.5) * 20; // z depth
      
      // Bias scales toward smaller sizes while keeping some larger
      scales[i] = 0.4 + Math.pow(Math.random(), 2) * 1.2;

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
    uniforms.current.uMouse.value.lerp(new THREE.Vector3(x, y, 0), 0.08);
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

            // Natural drift
            float time = uTime * 0.25;
            pos.x += sin(time * aRandom.x + pos.y * 0.03) * 0.6;
            pos.y += cos(time * aRandom.y + pos.x * 0.03) * 0.6;
            pos.z += sin(time * aRandom.z * 0.5) * 0.4;

            // Mouse Interaction
            float dist = distance(pos.xy, uMouse.xy);
            float radius = 6.0;
            float force = 0.0;
            if (dist < radius) {
               force = (radius - dist) / radius;
               vec3 dir = normalize(pos - uMouse);
               pos += dir * force * 3.2;
               pos.z += force * 2.2;
            }

            vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
            gl_Position = projectionMatrix * mvPosition;

            gl_PointSize = aScale * 28.0 * (1.0 / -mvPosition.z);

            // Mix factor for color interpolation
            vMix = aRandom.x;

            // Subtle twinkle per particle
            vTwinkle = 0.6 + 0.4 * sin(uTime * 3.0 + aRandom.y * 12.0);

            vAlpha = (0.35 + force * 0.65) * vTwinkle;
          }
        `}
        fragmentShader={`
          uniform vec3 uColor1;
          uniform vec3 uColor2;
          varying float vAlpha;
          varying float vMix;
          varying float vTwinkle;

          void main() {
            float r = length(gl_PointCoord - vec2(0.5));
            if (r > 0.5) discard;

            float glow = 1.0 - (r * 2.0);
            glow = pow(glow, 2.0);

            vec3 color = mix(uColor1, uColor2, vMix);
            gl_FragColor = vec4(color, glow * vAlpha);
          }
        `}
      />
    </points>
  );
};

export default ParticleBackground;