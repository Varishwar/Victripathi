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
  const bgRef = useRef<THREE.Points>(null!);
  const fgRef = useRef<THREE.Points>(null!);
  const starsRef = useRef<THREE.Points>(null!);

  const uniforms = useRef({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector3(1000, 1000, 0) },
    uColor1: { value: new THREE.Color('#38bdf8') },
    uColor2: { value: new THREE.Color('#7c3aed') }
  });

  // Reduce particle counts and strength to remove clutter and tiny dots
  const bgCount = 200;
  const fgCount = 60;
  const starMax = 3; // max concurrent shooting stars

  const { bgPositions, bgScales, bgRandoms, fgPositions, fgScales, fgRandoms } = useMemo(() => {
    const bgPositions = new Float32Array(bgCount * 3);
    const bgScales = new Float32Array(bgCount);
    const bgRandoms = new Float32Array(bgCount * 3);

    const fgPositions = new Float32Array(fgCount * 3);
    const fgScales = new Float32Array(fgCount);
    const fgRandoms = new Float32Array(fgCount * 3);

    for (let i = 0; i < bgCount; i++) {
      bgPositions[i * 3] = (Math.random() - 0.5) * 120;
      bgPositions[i * 3 + 1] = (Math.random() - 0.5) * 80;
      bgPositions[i * 3 + 2] = -20 - Math.random() * 40; // further back
      bgScales[i] = 0.3 + Math.random() * 0.8;
      bgRandoms[i * 3] = Math.random();
      bgRandoms[i * 3 + 1] = Math.random();
      bgRandoms[i * 3 + 2] = Math.random();
    }

    for (let i = 0; i < fgCount; i++) {
      fgPositions[i * 3] = (Math.random() - 0.5) * 80;
      fgPositions[i * 3 + 1] = (Math.random() - 0.5) * 60;
      fgPositions[i * 3 + 2] = -2 - Math.random() * 8; // near camera
      fgScales[i] = 0.6 + Math.random() * 1.6;
      fgRandoms[i * 3] = Math.random();
      fgRandoms[i * 3 + 1] = Math.random();
      fgRandoms[i * 3 + 2] = Math.random();
    }

    return { bgPositions, bgScales, bgRandoms, fgPositions, fgScales, fgRandoms };
  }, []);

  // Shooting stars state
  const starPositions = useRef(new Float32Array(starMax * 3));
  const starAlphas = useRef(new Float32Array(starMax));
  const starVel = useRef(new Array(starMax).fill(null).map(() => new THREE.Vector3()));
  const starLife = useRef(new Array(starMax).fill(0));

  useFrame((state) => {
    const { clock, pointer, viewport } = state;
    const t = clock.getElapsedTime();
    uniforms.current.uTime.value = t;

    const x = (pointer.x * viewport.width) / 2;
    const y = (pointer.y * viewport.height) / 2;
    uniforms.current.uMouse.value.lerp(new THREE.Vector3(x, y, 0), 0.08);

    // Update shooting stars
    for (let i = 0; i < starMax; i++) {
      if (starLife.current[i] > 0) {
        starLife.current[i] -= state.clock.getDelta();
        starPositions.current[i * 3] += starVel.current[i].x * state.clock.getDelta();
        starPositions.current[i * 3 + 1] += starVel.current[i].y * state.clock.getDelta();
        starPositions.current[i * 3 + 2] += starVel.current[i].z * state.clock.getDelta();
        starAlphas.current[i] = Math.max(0, starLife.current[i] / 1.6);
      } else if (Math.random() < 0.001) {
        // spawn a new star occasionally
        const sx = (Math.random() - 0.5) * 140;
        const sy = 60 + Math.random() * 30; // start above
        const sz = -5 - Math.random() * 10;
        starPositions.current[i * 3] = sx;
        starPositions.current[i * 3 + 1] = sy;
        starPositions.current[i * 3 + 2] = sz;
        // velocity mostly diagonal across screen
        starVel.current[i].set(-20 - Math.random() * 30, -30 - Math.random() * 30, 0.5 + Math.random());
        starLife.current[i] = 1.2 + Math.random() * 0.8;
        starAlphas.current[i] = 1.0;
      }
    }

    // Push updated star attributes to GPU
    if (starsRef.current) {
      const geom = starsRef.current.geometry as THREE.BufferGeometry;
      (geom.attributes.position as THREE.BufferAttribute).array = starPositions.current as any;
      (geom.attributes.position as THREE.BufferAttribute).needsUpdate = true;
      (geom.attributes.aAlpha as THREE.BufferAttribute).array = starAlphas.current as any;
      (geom.attributes.aAlpha as THREE.BufferAttribute).needsUpdate = true;
    }
  });

  return (
    <>
      {/* Background layer */}
      <points ref={bgRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={bgCount} array={bgPositions} itemSize={3} />
          <bufferAttribute attach="attributes-aScale" count={bgCount} array={bgScales} itemSize={1} />
          <bufferAttribute attach="attributes-aRandom" count={bgCount} array={bgRandoms} itemSize={3} />
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

            void main(){
              vec3 pos = position;
              float time = uTime * 0.2;
              pos.x += sin(time * aRandom.x + pos.y * 0.02) * 0.8;
              pos.y += cos(time * aRandom.y + pos.x * 0.02) * 0.8;
              float dist = distance(pos.xy, uMouse.xy);
              float radius = 8.0;
              float force = 0.0;
              if(dist < radius){
                force = (radius - dist) / radius;
                vec3 dir = normalize(pos - uMouse);
                pos += dir * force * 2.2;
              }
              vec4 mvPos = modelViewMatrix * vec4(pos,1.0);
              gl_Position = projectionMatrix * mvPos;
              gl_PointSize = aScale * 10.0 * (1.0 / -mvPos.z);
              vMix = aRandom.x;
              vAlpha = 0.12 + force * 0.35;
            }
          `}
          fragmentShader={`
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            varying float vAlpha;
            varying float vMix;
            void main(){
              float r = length(gl_PointCoord - vec2(0.5));
              if(r > 0.5) discard;
              float glow = pow(1.0 - r*2.0, 2.0);
              vec3 color = mix(uColor1, uColor2, vMix*0.5);
              gl_FragColor = vec4(color, glow * vAlpha);
            }
          `}
        />
      </points>

      {/* Foreground layer */}
      <points ref={fgRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={fgCount} array={fgPositions} itemSize={3} />
          <bufferAttribute attach="attributes-aScale" count={fgCount} array={fgScales} itemSize={1} />
          <bufferAttribute attach="attributes-aRandom" count={fgCount} array={fgRandoms} itemSize={3} />
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

            void main(){
              vec3 pos = position;
              float time = uTime * 0.4;
              pos.x += sin(time * aRandom.x + pos.y * 0.03) * 0.6;
              pos.y += cos(time * aRandom.y + pos.x * 0.03) * 0.6;
              float dist = distance(pos.xy, uMouse.xy);
              float radius = 6.0;
              float force = 0.0;
              if(dist < radius){
                force = (radius - dist) / radius;
                vec3 dir = normalize(pos - uMouse);
                pos += dir * force * 3.0;
                pos.z += force * 1.8;
              }
              vec4 mvPos = modelViewMatrix * vec4(pos,1.0);
              gl_Position = projectionMatrix * mvPos;
              gl_PointSize = aScale * 14.0 * (1.0 / -mvPos.z);
              vMix = aRandom.x;
              vAlpha = 0.22 + force * 0.3;
            }
          `}
          fragmentShader={`
            uniform vec3 uColor1;
            uniform vec3 uColor2;
            varying float vAlpha;
            varying float vMix;
            void main(){
              float r = length(gl_PointCoord - vec2(0.5));
              if(r > 0.6) discard;
              float glow = pow(1.0 - r*1.8, 2.0);
              vec3 color = mix(uColor1, uColor2, vMix);
              gl_FragColor = vec4(color, glow * vAlpha);
            }
          `}
        />
      </points>

      {/* Shooting stars */}
      <points ref={starsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" count={starMax} array={starPositions.current} itemSize={3} />
          <bufferAttribute attach="attributes-aAlpha" count={starMax} array={starAlphas.current} itemSize={1} />
        </bufferGeometry>
        <shaderMaterial
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
          uniforms={{ uTime: uniforms.current.uTime }}
          vertexShader={`
            attribute float aAlpha;
            uniform float uTime;
            varying float vAlpha;
            void main(){
              vec3 pos = position;
              vec4 mvPos = modelViewMatrix * vec4(pos,1.0);
              gl_Position = projectionMatrix * mvPos;
              gl_PointSize = 80.0 * (1.0 / -mvPos.z);
              vAlpha = aAlpha;
            }
          `}
          fragmentShader={`
            varying float vAlpha;
            void main(){
              float r = length(gl_PointCoord - vec2(0.5));
              if(r > 0.9) discard;
              float glow = pow(1.0 - r*1.6, 3.0);
              vec3 color = vec3(1.0, 0.95, 0.85);
              gl_FragColor = vec4(color, glow * vAlpha);
            }
          `}
        />
      </points>
    </>
  );
};

export default ParticleBackground;