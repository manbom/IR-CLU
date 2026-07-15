"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Line } from "@react-three/drei";
import * as THREE from "three";

const STOPS = ["#34d9e8", "#8b5cf6", "#fb7a3c"].map((hex) => new THREE.Color(hex));
const WHITE = new THREE.Color("#ffffff");

function gradientColor(t: number) {
  const clamped = Math.min(1, Math.max(0, t));
  const scaled = clamped * (STOPS.length - 1);
  const i = Math.min(STOPS.length - 2, Math.floor(scaled));
  return new THREE.Color().lerpColors(STOPS[i], STOPS[i + 1], scaled - i);
}

type NodeDef = { position: THREE.Vector3; t: number; size: number };

function buildPipeline(count: number, spread: number) {
  const nodes: NodeDef[] = [];
  const golden = 2.399963229728653; // golden angle, deterministic — no Math.random
  for (let i = 0; i < count; i++) {
    const t = count === 1 ? 0 : i / (count - 1);
    const angle = i * golden;
    const radius = 0.9 + Math.sin(i * 1.3) * 0.35;
    const x = Math.cos(angle) * radius;
    const y = (t - 0.5) * spread;
    const z = Math.sin(angle) * radius - 0.6;
    nodes.push({
      position: new THREE.Vector3(x, y, z),
      t,
      size: i === 0 ? 0.1 : 0.045 + (1 - t) * 0.03,
    });
  }
  const curves: THREE.CatmullRomCurve3[] = [];
  for (let i = 0; i < nodes.length - 1; i++) {
    const a = nodes[i].position;
    const b = nodes[i + 1].position;
    const mid = a.clone().lerp(b, 0.5).add(
      new THREE.Vector3(
        Math.sin(i * 2.1) * 0.4,
        0,
        Math.cos(i * 1.7) * 0.4,
      ),
    );
    curves.push(new THREE.CatmullRomCurve3([a, mid, b]));
  }
  return { nodes, curves };
}

function Pulse({
  curve,
  offset,
  speed,
  frozen,
  boosted,
}: {
  curve: THREE.CatmullRomCurve3;
  offset: number;
  speed: number;
  frozen: boolean;
  boosted: boolean;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const phase = useRef(offset);
  useFrame((state, delta) => {
    if (!ref.current || frozen) return;
    phase.current = (phase.current + delta * speed * (boosted ? 3 : 1)) % 1;
    const point = curve.getPointAt(phase.current);
    ref.current.position.copy(point);
    const s = (boosted ? 1.6 : 1) * (0.6 + Math.sin(phase.current * Math.PI) * 0.6);
    ref.current.scale.setScalar(s);
  });
  if (frozen) return null;
  return (
    <mesh ref={ref}>
      <sphereGeometry args={[0.032, 8, 8]} />
      <meshBasicMaterial color="#f5f6fa" toneMapped={false} />
    </mesh>
  );
}

function Node({
  node,
  index,
  hovered,
  interactive,
  onHover,
}: {
  node: NodeDef;
  index: number;
  hovered: boolean;
  interactive: boolean;
  onHover: (index: number | null) => void;
}) {
  const ref = useRef<THREE.Mesh>(null);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  const baseColor = useMemo(() => gradientColor(node.t), [node.t]);
  const brightColor = useMemo(() => baseColor.clone().lerp(WHITE, 0.55), [baseColor]);

  useFrame(() => {
    if (!ref.current) return;
    const targetScale = hovered ? 1.9 : 1;
    ref.current.scale.setScalar(THREE.MathUtils.lerp(ref.current.scale.x, targetScale, 0.18));
    if (matRef.current) {
      matRef.current.color.lerp(hovered ? brightColor : baseColor, 0.18);
    }
  });

  return (
    <mesh
      ref={ref}
      position={node.position}
      onPointerOver={
        interactive
          ? (e) => {
              e.stopPropagation();
              onHover(index);
            }
          : undefined
      }
      onPointerOut={
        interactive
          ? (e) => {
              e.stopPropagation();
              onHover(null);
            }
          : undefined
      }
    >
      <sphereGeometry args={[node.size, 16, 16]} />
      <meshBasicMaterial ref={matRef} color={baseColor} toneMapped={false} />
    </mesh>
  );
}

function Scene({
  nodeCount,
  interactive,
  frozen,
}: {
  nodeCount: number;
  interactive: boolean;
  frozen: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const { nodes, curves } = useMemo(() => buildPipeline(nodeCount, 5.2), [nodeCount]);
  const [hovered, setHovered] = useState<number | null>(null);

  useFrame((state) => {
    if (!group.current || frozen) return;
    group.current.rotation.y = state.clock.elapsedTime * 0.06;
    if (interactive) {
      const targetX = state.pointer.y * 0.15;
      const targetZ = state.pointer.x * 0.15;
      group.current.rotation.x += (targetX - group.current.rotation.x) * 0.04;
      group.current.rotation.z += (targetZ - group.current.rotation.z) * 0.04;
    }
  });

  return (
    <group
      ref={group}
      rotation={frozen ? [0.12, 0.4, 0] : undefined}
      onPointerMissed={() => setHovered(null)}
    >
      {curves.map((curve, i) => {
        const points = curve.getPoints(24);
        const color = gradientColor((nodes[i].t + nodes[i + 1].t) / 2);
        const isNear = hovered !== null && (i === hovered || i + 1 === hovered);
        return (
          <Line
            key={i}
            points={points}
            color={isNear ? color.clone().lerp(WHITE, 0.4) : color}
            transparent
            opacity={isNear ? 0.9 : 0.45}
            lineWidth={isNear ? 1.8 : 1}
          />
        );
      })}

      {!frozen &&
        curves.map((curve, i) => (
          <Pulse
            key={i}
            curve={curve}
            offset={(i * 0.37) % 1}
            speed={0.12 + (i % 3) * 0.04}
            frozen={frozen}
            boosted={hovered !== null && (i === hovered || i + 1 === hovered)}
          />
        ))}

      {nodes.map((node, i) => (
        <Node
          key={i}
          node={node}
          index={i}
          hovered={hovered === i}
          interactive={interactive}
          onHover={setHovered}
        />
      ))}
    </group>
  );
}

export function AutomationGraph({
  variant = "full",
  reducedMotion = false,
  className = "",
}: {
  variant?: "full" | "light";
  reducedMotion?: boolean;
  className?: string;
}) {
  const nodeCount = variant === "full" ? 16 : 9;

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        dpr={[1, variant === "full" ? 2 : 1.5]}
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={reducedMotion ? "demand" : "always"}
      >
        <Scene
          nodeCount={nodeCount}
          interactive={variant === "full" && !reducedMotion}
          frozen={reducedMotion}
        />
      </Canvas>
    </div>
  );
}
