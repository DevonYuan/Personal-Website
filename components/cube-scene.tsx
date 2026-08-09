'use client'

import { useMemo, useRef } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import type { Group } from 'three'

const FACE_COLORS = {
  right: '#3b5fe0', // +x blue
  left: '#1a8f4a', // -x green
  top: '#f2f2ea', // +y white
  bottom: '#f4b400', // -y yellow
  front: '#d94a2b', // +z red/orange
  back: '#f47b20', // -z orange
} as const

const INSET = '#161515'

function Cubie({ position }: { position: [number, number, number] }) {
  const [x, y, z] = position

  // Material order for BoxGeometry faces: +x, -x, +y, -y, +z, -z
  const colors = [
    x === 1 ? FACE_COLORS.right : INSET,
    x === -1 ? FACE_COLORS.left : INSET,
    y === 1 ? FACE_COLORS.top : INSET,
    y === -1 ? FACE_COLORS.bottom : INSET,
    z === 1 ? FACE_COLORS.front : INSET,
    z === -1 ? FACE_COLORS.back : INSET,
  ]

  return (
    <mesh position={[x * 1.03, y * 1.03, z * 1.03]} castShadow receiveShadow>
      <boxGeometry args={[0.96, 0.96, 0.96]} />
      {colors.map((color, i) => (
        <meshStandardMaterial key={i} attach={`material-${i}`} color={color} roughness={0.35} metalness={0.05} />
      ))}
    </mesh>
  )
}

function RubiksCube() {
  const group = useRef<Group>(null)

  const cubies = useMemo(() => {
    const positions: [number, number, number][] = []
    for (const x of [-1, 0, 1]) {
      for (const y of [-1, 0, 1]) {
        for (const z of [-1, 0, 1]) {
          positions.push([x, y, z])
        }
      }
    }
    return positions
  }, [])

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * 0.22
      group.current.rotation.x = 0.35 + Math.sin(Date.now() * 0.0002) * 0.08
    }
  })

  return (
    <group ref={group}>
      {cubies.map((pos, i) => (
        <Cubie key={i} position={pos} />
      ))}
    </group>
  )
}

export function CubeScene() {
  return (
    <div className="h-[320px] w-full sm:h-[420px] lg:h-[480px]" aria-hidden="true">
      <Canvas camera={{ position: [6.8, 5.4, 7.6], fov: 30 }} shadows dpr={[1, 1.5]}>
        <ambientLight intensity={0.65} />
        <directionalLight position={[4, 6, 4]} intensity={1.1} castShadow />
        <directionalLight position={[-4, -2, -3]} intensity={0.3} />
        <RubiksCube />
        <OrbitControls enableZoom={false} enablePan={false} autoRotate={false} rotateSpeed={0.6} />
      </Canvas>
    </div>
  )
}
