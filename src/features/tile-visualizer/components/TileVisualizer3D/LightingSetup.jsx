import { Environment, ContactShadows, BakeShadows } from '@react-three/drei';

export default function LightingSetup({ ambientIntensity = 0.5 }) {
  return (
    <>
      {/* Ambient fill */}
      <ambientLight intensity={ambientIntensity} color="#e8d5b0" />

      {/* Primary sun-like directional light with shadows */}
      <directionalLight
        position={[3, 5, 3]}
        intensity={1.4}
        color="#fff8e8"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-camera-near={0.1}
        shadow-camera-far={30}
        shadow-camera-left={-8}
        shadow-camera-right={8}
        shadow-camera-top={8}
        shadow-camera-bottom={-8}
        shadow-bias={-0.0005}
      />

      {/* Warm fill from the left */}
      <pointLight position={[-4, 2, 2]} intensity={0.6} color="#ffcc77" distance={12} decay={2} />

      {/* Cool accent from ceiling */}
      <pointLight position={[0, 3, 0]} intensity={0.4} color="#aaccff" distance={10} decay={2} />

      {/* HDR environment */}
      <Environment preset="apartment" background={false} />

      {/* Contact shadows on floor */}
      <ContactShadows
        position={[0, -1.99, 0]}
        opacity={0.4}
        scale={10}
        blur={2.5}
        far={4}
        color="#000000"
      />
    </>
  );
}
