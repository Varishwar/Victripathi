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
  const [hovered, setHovered] = useState<number | null>(null);

  // Create nodes in a loose cloud
  const { nodes, edges, flows } = useMemo(() => {
    const nodes: Node[] = [];
    const edges: Edge[] = [];
    const flows: { edgeIndex: number; t: number; speed: number }[] = [];
    const N = 10;
    for (let i = 0; i < N; i++) {
      const theta = Math.random() * Math.PI * 2;
      const r = 12 + Math.random() * 18;
      const z = (Math.random() - 0.5) * 8;
      nodes.push({ id: i, pos: new THREE.Vector3(Math.cos(theta) * r, Math.sin(theta) * r * 0.6, z) });
    }
    // connect nearest neighbors
    for (let i = 0; i < N; i++) {
      const dists: { j: number; d: number }[] = [];
      for (let j = 0; j < N; j++) if (i !== j) dists.push({ j, d: nodes[i].pos.distanceTo(nodes[j].pos) });
      dists.sort((a, b) => a.d - b.d);
      // connect to up to 3 nearest
      for (let k = 0; k < 3; k++) {
        const j = dists[k]?.j;
        if (j === undefined) continue;
        // avoid duplicates
        if (!edges.find(e => (e.a === i && e.b === j) || (e.a === j && e.b === i))) {
          const len = nodes[i].pos.distanceTo(nodes[j].pos);
          edges.push({ a: i, b: j, len });
          // add a flow particle for some edges
          if (Math.random() < 0.45) flows.push({ edgeIndex: edges.length - 1, t: Math.random(), speed: 0.2 + Math.random() * 0.6 });
        }
      }
    }
    // Disable flow particles for now to avoid tiny floating dots.
    return { nodes, edges, flows: [] };
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    // animate group rotation slowly
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

      {/* Nodes */}
      {nodes.map((n) => (
        <NodeSphere key={n.id} pos={n.pos} highlighted={hovered === n.id} onPointerOver={() => setHovered(n.id)} onPointerOut={() => setHovered(null)} />
      ))}

      {/* optional controls for debugging */}
      {/* <OrbitControls enableZoom={false} enablePan={false} /> */}
    </group>
  );
};

const NodeSphere: React.FC<{ pos: THREE.Vector3; highlighted?: boolean; onPointerOver?: () => void; onPointerOut?: () => void; }> = ({ pos, highlighted, onPointerOver, onPointerOut }) => {
  const ref = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (ref.current) {
      ref.current.scale.setScalar(1 + Math.sin(t * 2 + pos.x) * 0.07 + (highlighted ? 0.25 : 0));
    }
  });
  return (
    <mesh
      ref={ref}
      position={[pos.x, pos.y, pos.z]}
      onPointerOver={(e) => { e.stopPropagation(); onPointerOver && onPointerOver(); }}
      onPointerOut={(e) => { e.stopPropagation(); onPointerOut && onPointerOut(); }}
    >
      <sphereGeometry args={[0.9, 24, 24]} />
      <meshStandardMaterial emissive={new THREE.Color('#60a5fa')} emissiveIntensity={0.6} color={'#0f172a'} metalness={0.2} roughness={0.3} />
    </mesh>
  );
};

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
