import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const FACE = {
  px: '#E63946',
  nx: '#F4A261',
  py: '#BBBBBB',  // Greyer white for better contrast against text
  ny: '#E9C46A',
  pz: '#457B9D',
  nz: '#2A9D8F',
};
const CORE = '#0d0d0d';
const AXIS = ['x', 'y', 'z'] as const;
const MOVE_DURATION = 0.38;

interface CubePosition {
  x: number;
  y: number;
  z: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  scale: number;
}

const DEFAULT_POSITION: CubePosition = {
  x: 0,
  y: 0,
  z: 0,
  rotationX: 0.45,
  rotationY: 0.6,
  rotationZ: 0,
  scale: 0.92,
};

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
  const [position, setPosition] = useState<CubePosition>(DEFAULT_POSITION);
  const moveRef = useRef<{ axis: number; layer: number; dir: number; start: number } | null>(null);
  const queueRef = useRef<Array<{ axis: number; layer: number; dir: number }>>([]);
  const historyRef = useRef<Array<{ axis: number; layer: number; dir: number }>>([]);
  const phaseRef = useRef({ mode: 'wait' as 'wait' | 'scrambling' | 'hold' | 'solving', until: 4 });

  // Keyboard controls for position adjustment
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const step = e.shiftKey ? 0.5 : 0.1;
      const rotStep = e.shiftKey ? 0.1 : 0.02;
      const scaleStep = e.shiftKey ? 0.1 : 0.02;
      
      setPosition(prev => {
        const next = { ...prev };
        switch (e.key.toLowerCase()) {
          case 'arrowleft':
          case 'a':
            next.x -= step;
            break;
          case 'arrowright':
          case 'd':
            next.x += step;
            break;
          case 'arrowup':
          case 'w':
            if (e.shiftKey) next.rotationX -= rotStep;
            else next.y += step;
            break;
          case 'arrowdown':
          case 's':
            if (e.shiftKey) next.rotationX += rotStep;
            else next.y -= step;
            break;
          case 'q':
            next.z += step;
            break;
          case 'e':
            next.z -= step;
            break;
          case 'z':
            next.rotationY -= rotStep;
            break;
          case 'x':
            next.rotationY += rotStep;
            break;
          case 'c':
            next.rotationZ -= rotStep;
            break;
          case 'v':
            next.rotationZ += rotStep;
            break;
          case '=':
          case '+':
            next.scale = Math.min(next.scale + scaleStep, 3);
            break;
          case '-':
          case '_':
            next.scale = Math.max(next.scale - scaleStep, 0.1);
            break;
          case 'r':
            return DEFAULT_POSITION;
          case 'p':
            console.log('Cube Position:', JSON.stringify(prev, null, 2));
            break;
        }
        return next;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useFrame((state) => {
    const now = state.clock.getElapsedTime();
    if (group.current) {
      // Apply user-controlled position with steady rotation (no floating)
      group.current.position.x = position.x;
      group.current.position.y = position.y;
      group.current.position.z = position.z;
      group.current.rotation.x = position.rotationX;
      group.current.rotation.y = position.rotationY + now * 0.4;  // Consistent, noticeable rotation
      group.current.rotation.z = position.rotationZ;
      group.current.scale.setScalar(position.scale);
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
    <group ref={group}>
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