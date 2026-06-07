import { useRef, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { CAMERA_PATH, TOTAL_DURATION } from './CameraPath';
import { useVisualizerStore } from '../../store/useVisualizerStore';

export default function WalkthroughCamera() {
  const { isWalkthroughPlaying, walkthroughSpeed, setWalkthroughProgress } = useVisualizerStore();
  const { camera } = useThree();
  const elapsedRef = useRef(0);
  const targetVec = useRef(new THREE.Vector3());
  const posVec = useRef(new THREE.Vector3());

  useFrame((_, delta) => {
    if (!isWalkthroughPlaying) return;

    elapsedRef.current += delta * walkthroughSpeed;
    // Loop
    if (elapsedRef.current > TOTAL_DURATION) elapsedRef.current = 0;

    const progress = elapsedRef.current / TOTAL_DURATION;
    setWalkthroughProgress(progress);

    // Find current segment
    let accumulated = 0;
    let segIndex = 0;
    for (let i = 0; i < CAMERA_PATH.length - 1; i++) {
      if (elapsedRef.current < accumulated + CAMERA_PATH[i].duration) {
        segIndex = i;
        break;
      }
      accumulated += CAMERA_PATH[i].duration;
      segIndex = i + 1;
    }

    const from = CAMERA_PATH[segIndex];
    const to = CAMERA_PATH[Math.min(segIndex + 1, CAMERA_PATH.length - 1)];
    const segT = Math.max(0, Math.min(1,
      (elapsedRef.current - accumulated) / (from.duration || 1)
    ));
    // Smooth step easing
    const t = segT * segT * (3 - 2 * segT);

    posVec.current.set(...from.position).lerp(
      new THREE.Vector3(...to.position), t
    );
    targetVec.current.set(...from.target).lerp(
      new THREE.Vector3(...to.target), t
    );

    camera.position.copy(posVec.current);
    camera.lookAt(targetVec.current);
  });

  // On mount reset
  useEffect(() => {
    if (!isWalkthroughPlaying) {
      elapsedRef.current = 0;
    }
  }, [isWalkthroughPlaying]);

  return null;
}
