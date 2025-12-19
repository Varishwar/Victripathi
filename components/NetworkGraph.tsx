import React, { useRef, useMemo, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

interface Node {
  id: number;
  pos: THREE.Vector3;
}

interface Edge {
  a: number;
  b: number;
  len: number;
}

const GraphScene: React.FC = () => {
  const group = useRef<THREE.Group>(null!);
  const { size } = useThree();

  // Create nodes in a loose cloud
  const { nodes, edges, flows } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const flows: { edgeIndex: number; t: number; speed: number }[] = [];
    const N = 10;
      <group ref={group} dispose={null}>
        {/* Lines and nodes disabled — returning empty group to remove visual connectors */}
      </group>
    if (group.current) group.current.rotation.z = Math.sin(t * 0.08) * 0.06;
  });

  return (
    <group ref={group} dispose={null}>
      {/* Lines */}
      {edges.map((e, idx) => {
        const a = nodes[e.a].pos;
        const b = nodes[e.b].pos;
        const pts = [a.x, a.y, a.z, b.x, b.y, b.z];
        const geom = new THREE.BufferGeometry();
        geom.setAttribute('position', new THREE.Float32BufferAttribute(pts, 3));
        return (
          <line key={idx} geometry={geom}>
            <lineBasicMaterial attach="material" color={'#2dd4bf'} transparent opacity={0.18} linewidth={1} />
          </line>
        );
      })}

      {/* Flow particles along edges */}
      {flows.map((f, idx) => {
        const edge = edges[f.edgeIndex];
        const a = nodes[edge.a].pos;
        const b = nodes[edge.b].pos;
        return <FlowParticle key={idx} a={a} b={b} speed={f.speed} />;
      })}

      {/* Nodes intentionally hidden: rendering only connector lines to avoid filled dot markers */}

      {/* optional controls for debugging */}
      {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
    </group>
  );
};

// NodeSphere removed — keeping graph lines only to avoid visual filled nodes

const FlowParticle: React.FC<{ a: THREE.Vector3; b: THREE.Vector3; speed: number }> = ({ a, b, speed }) => {
  const ref = useRef<THREE.Mesh>(null!);
  const tRef = useRef(Math.random());
  useFrame((state) => {
    const dt = state.clock.getDelta();
    tRef.current += dt * speed * 0.25;
    if (tRef.current > 1) tRef.current = 0;
    const t = tRef.current;
    const x = THREE.MathUtils.lerp(a.x, b.x, t);
    const y = THREE.MathUtils.lerp(a.y, b.y, t);
    const z = THREE.MathUtils.lerp(a.z, b.z, t);
    if (ref.current) {
      ref.current.position.set(x, y, z);
      ref.current.rotation.y += dt * 1.0;
    }
  });
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.08, 8, 8]} />
      <meshBasicMaterial color="#7c3aed" transparent opacity={0.6} />
    </mesh>
  );
};

const NetworkGraph: React.FC = () => {
  return (
    <Canvas camera={{ position: [0, 0, 40], fov: 50 }} style={{ width: '100%', height: '100%' }}>
      <ambientLight intensity={0.6} />
      <spotLight position={[30, 30, 50]} angle={0.2} intensity={0.8} />
      <GraphScene />
    </Canvas>
  );
};

export default NetworkGraph;
