// Cinematic camera keyframes for a room fly-through
// Each frame: { position: [x,y,z], target: [x,y,z], duration (seconds) }

export const CAMERA_PATH = [
  // Start outside the room, looking in
  { position: [0, 1.5, 6],    target: [0, 0, 0],     duration: 2.5 },
  // Pan left, slightly elevated
  { position: [-3, 2, 3],     target: [0, 0, -1],    duration: 3.5 },
  // Low angle, dramatic floor view
  { position: [-1, 0.3, 2],   target: [0, 0.5, -2],  duration: 3 },
  // Close-up on back wall
  { position: [0, 1, 1],      target: [0, 1, -3],    duration: 3 },
  // Sweep across right wall
  { position: [2, 1.5, 1],    target: [-1, 0.5, -2], duration: 3.5 },
  // High overhead bird's eye
  { position: [0, 4, 0.5],    target: [0, 0, 0],     duration: 3 },
  // Return to centre
  { position: [1.5, 1.2, 4],  target: [0, 0, 0],     duration: 3 },
  // Final hero shot
  { position: [0, 1.5, 6],    target: [0, 0, 0],     duration: 2.5 },
];

export const TOTAL_DURATION = CAMERA_PATH.reduce((sum, f) => sum + f.duration, 0);
