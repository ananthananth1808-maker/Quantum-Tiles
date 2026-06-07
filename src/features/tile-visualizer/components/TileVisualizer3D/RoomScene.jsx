import { useMemo, useEffect } from 'react';
import { useThree } from '@react-three/fiber';
import { useTexture, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';
import { useVisualizerStore } from '../../store/useVisualizerStore';

function TileSurface({ position, rotation, size, tileData, isWall }) {
  const textureUrl = tileData?.textureUrl || '';
  const color = tileData?.color || '#1e293b';

  const texture = useTexture(textureUrl || 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=512&q=80');

  useEffect(() => {
    if (texture) {
      texture.wrapS = THREE.RepeatWrapping;
      texture.wrapT = THREE.RepeatWrapping;
      // Repeat factor based on surface size
      const repeatX = size[0] / 1.5;
      const repeatY = size[1] / 1.5;
      texture.repeat.set(repeatX, repeatY);
      texture.needsUpdate = true;
    }
  }, [texture, size]);

  return (
    <mesh position={position} rotation={rotation} receiveShadow castShadow>
      <planeGeometry args={[size[0], size[1]]} />
      <meshStandardMaterial
        map={texture}
        color={color}
        roughness={tileData?.roughness ?? 0.5}
        metalness={tileData?.metalness ?? 0.0}
        envMapIntensity={0.8}
      />
    </mesh>
  );
}

function RoomShell({ floorTile, wallTile, roomTemplate }) {
  const W = roomTemplate.dimensions.width;
  const H = roomTemplate.dimensions.height;
  const D = roomTemplate.dimensions.depth;

  // Ceiling color
  const ceilColor = roomTemplate.ceilingColor || '#0a0f1a';

  return (
    <group>
      {/* Floor */}
      <TileSurface
        position={[0, -H / 2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
        size={[W, D]}
        tileData={floorTile}
        isWall={false}
      />

      {/* Back wall */}
      <TileSurface
        position={[0, 0, -D / 2]}
        rotation={[0, 0, 0]}
        size={[W, H]}
        tileData={wallTile}
        isWall={true}
      />

      {/* Left wall */}
      <TileSurface
        position={[-W / 2, 0, 0]}
        rotation={[0, Math.PI / 2, 0]}
        size={[D, H]}
        tileData={wallTile}
        isWall={true}
      />

      {/* Right wall */}
      <TileSurface
        position={[W / 2, 0, 0]}
        rotation={[0, -Math.PI / 2, 0]}
        size={[D, H]}
        tileData={wallTile}
        isWall={true}
      />

      {/* Ceiling (plain dark) */}
      <mesh position={[0, H / 2, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <planeGeometry args={[W, D]} />
        <meshStandardMaterial color={ceilColor} roughness={1} metalness={0} />
      </mesh>

      {/* Baseboard trim */}
      {[
        { pos: [0, -H / 2 + 0.08, -D / 2 + 0.02], rot: [0, 0, 0], len: W },
        { pos: [-W / 2 + 0.02, -H / 2 + 0.08, 0], rot: [0, Math.PI / 2, 0], len: D },
        { pos: [W / 2 - 0.02, -H / 2 + 0.08, 0], rot: [0, -Math.PI / 2, 0], len: D },
      ].map((trim, i) => (
        <mesh key={i} position={trim.pos} rotation={trim.rot}>
          <planeGeometry args={[trim.len, 0.16]} />
          <meshStandardMaterial color="#D4AF37" roughness={0.3} metalness={0.4} />
        </mesh>
      ))}
    </group>
  );
}

export default function RoomScene() {
  const { floorTile, wallTile, activeRoom } = useVisualizerStore();
  return (
    <>
      <RoomShell floorTile={floorTile} wallTile={wallTile} roomTemplate={activeRoom} />
    </>
  );
}
