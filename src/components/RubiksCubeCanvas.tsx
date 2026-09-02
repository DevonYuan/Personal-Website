import { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FACE = {
  px: '#E63946',
  nx: '#F4A261',
  py: '#F1FAEE',
  ny: '#E9C46A',
  pz: '#457B9D',
  nz: '#2A9D8F',
};
const CORE = '#0d0d0d';
const AXIS = ['x', 'y', 'z'] as const;
const MOVE_DURATION = 0.38;

const easeInOutCubic = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

const rotPos = ([x, y, z]: [number, number, number], axis: number, dir: number): [number, number, number] => {
  if (axis === 0) return dir === 1 ? [x, -z, y] : [x, z, -y];
  if (axis === 1) return dir === 1 ? [z, y, -x] : [-z, y, x];
  return dir === 1 ? [-y, x, z] : [y, -x, z];
};

const axisQuat = (axis: number, dir: number): [number, number, number, number] => {
  const v = [0, 0, 0];
  v[axis] = dir * Math.SQRT1_2;
  return [v[0], v[1], v[2], Math.SQRT1_2];
};

const quatMul = (a: [number, number, number, number], b: [number, number, number, number]): [number, number, number, number] => {
  const [ax, ay, az, aw] = a;
  const [bx, by, bz, bw] = b;
  return [
    aw * bx + ax * bw + ay * bz - az * by,
    aw * by - ax * bz + ay * bw + az * bx,
    aw * bz + ax * by - ay * bx + az * bw,
    aw * bw - ax * bx - ay * by - az * bz,
  ];
};

const makeCubies = () => {
  const out: Array<{
    id: string;
    pos: [number, number, number];
    quat: [number, number, number, number];
    colors: string[];
  }> = [];
  for (let x = -1; x <= 1; x++) {
    for (let y = -1; y <= 1; y++) {
      for (let z = -1; z <= 1; z++) {
        out.push({
          id: `${x}${y}${z}`,
          pos: [x, y, z],
          quat: [0, 0, 0, 1],
          colors: [
            x === 1 ? FACE.px : CORE,
            x === -1 ? FACE.nx : CORE,
            y === 1 ? FACE.py : CORE,
            y === -1 ? FACE.ny : CORE,
            z === 1 ? FACE.pz : CORE,
            z === -1 ? FACE.nz : CORE,
          ],
        });
      }
    }
  }
  return out;
};

const randomScramble = (n: number) => {
  const moves: Array<{ axis: number; layer: number; dir: number }> = [];
  let last: { axis: number; layer: number } | null = null;
  while (moves.length < n) {
    const m = {
      axis: Math.floor(Math.random() * 3),
      layer: Math.floor(Math.random() * 3) - 1,
      dir: Math.random() > 0.5 ? 1 : -1,
    };
    if (last && m.axis === last.axis && m.layer === last.layer) continue;
    moves.push(m);
    last = m;
  }
  return moves;
};

const Cubie = ({ c }: { c: ReturnType<typeof makeCubies>[0] }) => (
  <mesh position={c.pos} quaternion={c.quat}>
    <boxGeometry args={[0.93, 0.93, 0.93]} />
    {c.colors.map((col, i) => (
      <meshStandardMaterial key={i} attach={`material-${i}`} color={col} roughness={0.32} metalness={0.15} />
    ))}
  </mesh>
);

const CubeGroup = () => {
  const group = useRef<THREE.Group>(null);
  const pivot = useRef<THREE.Group>(null);
  const [cubies, setCubies] = useState(makeCubies());
  const [activeMove, setActiveMove] = useState<{ axis: number; layer: number; dir: number } | null>(null);
  const moveRef = useRef<{ axis: number; layer: number; dir: number; start: number } | null>(null);
  const queueRef = useRef<Array<{ axis: number; layer: number; dir: number }>>([]);
  const historyRef = useRef<Array<{ axis: number; layer: number; dir: number }>>([]);
  const phaseRef = useRef({ mode: 'wait' as 'wait' | 'scrambling' | 'hold' | 'solving', until: 4 });

  useFrame((state, delta) => {
    const now = state.clock.getElapsedTime();
    if (group.current) {
      group.current.rotation.y += delta * 0.22;
      group.current.rotation.x = 0.45 + Math.sin(now * 0.25) * 0.12;
      group.current.position.y = 0.55 + Math.sin(now * 0.5) * 0.15;
    }

    const mv = moveRef.current;
    if (mv) {
      const t = Math.min((now - mv.start) / MOVE_DURATION, 1);
      if (pivot.current) {
        pivot.current.rotation[AXIS[mv.axis]] = mv.dir * (Math.PI / 2) * easeInOutCubic(t);
      }
      if (t >= 1) {
        if (pivot.current) pivot.current.rotation.set(0, 0, 0);
        setCubies((prev) =>
          prev.map((c) =>
            c.pos[mv.axis] === mv.layer
              ? {
                  ...c,
                  pos: rotPos(c.pos, mv.axis, mv.dir),
                  quat: quatMul(axisQuat(mv.axis, mv.dir), c.quat),
                }
              : c
          )
        );
        setActiveMove(null);
        moveRef.current = null;
      }
      return;
    }

    if (queueRef.current.length) {
      const m = queueRef.current.shift()!;
      moveRef.current = { ...m, start: now };
      setActiveMove(m);
      return;
    }

    const ph = phaseRef.current;
    if (ph.mode === 'wait' && now >= ph.until) {
      const moves = randomScramble(9);
      historyRef.current = moves;
      queueRef.current = [...moves];
      ph.mode = 'scrambling';
    } else if (ph.mode === 'scrambling') {
      ph.mode = 'hold';
      ph.until = now + 1.4;
    } else if (ph.mode === 'hold' && now >= ph.until) {
      queueRef.current = [...historyRef.current].reverse().map((m) => ({ ...m, dir: -m.dir }));
      ph.mode = 'solving';
    } else if (ph.mode === 'solving') {
      ph.mode = 'wait';
      ph.until = now + 3.5;
    }
  });

  const inLayer = (c: typeof cubies[0]) => activeMove && c.pos[activeMove.axis] === activeMove.layer;

  return (
    <group ref={group} rotation={[0.45, 0.6, 0]} scale={0.92}>
      {cubies.filter((c) => !inLayer(c)).map((c) => <Cubie key={c.id} c={c} />)}
      <group ref={pivot}>
        {cubies.filter(inLayer).map((c) => <Cubie key={c.id} c={c} />)}
      </group>
    </group>
  );
};

export default function RubiksCubeCanvas() {
  return (
    <Canvas
      data-testid="rubiks-cube-canvas"
      camera={{ position: [0, 0, 12], fov: 38 }}
      dpr={[1, 2]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 6, 5]} intensity={1.5} />
      <directionalLight position={[-5, -3, -4]} intensity={0.4} />
      <CubeGroup />
    </Canvas>
  );
}