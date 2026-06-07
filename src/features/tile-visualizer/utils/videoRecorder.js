/**
 * Video recorder utility using the MediaRecorder API.
 * Captures a WebM video from a canvas element (the Three.js renderer).
 */

let mediaRecorder = null;
let recordedChunks = [];

export function startRecording(canvas) {
  if (!canvas) throw new Error('No canvas element provided');

  // Prefer VP9 codec for better quality, fallback to default
  const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
    ? 'video/webm;codecs=vp9'
    : MediaRecorder.isTypeSupported('video/webm;codecs=vp8')
    ? 'video/webm;codecs=vp8'
    : 'video/webm';

  const stream = canvas.captureStream(30); // 30 FPS
  recordedChunks = [];

  mediaRecorder = new MediaRecorder(stream, {
    mimeType,
    videoBitsPerSecond: 5_000_000, // 5 Mbps
  });

  mediaRecorder.ondataavailable = (e) => {
    if (e.data && e.data.size > 0) {
      recordedChunks.push(e.data);
    }
  };

  mediaRecorder.start(100); // collect in 100ms chunks
  return { mimeType };
}

export function stopRecording() {
  return new Promise((resolve) => {
    if (!mediaRecorder || mediaRecorder.state === 'inactive') {
      resolve(null);
      return;
    }

    mediaRecorder.onstop = () => {
      const mimeType = mediaRecorder?.mimeType || 'video/webm';
      const blob = new Blob(recordedChunks, { type: mimeType });
      const url = URL.createObjectURL(blob);
      recordedChunks = [];
      mediaRecorder = null;
      resolve({ url, blob, mimeType });
    };

    mediaRecorder.stop();
  });
}

export function downloadVideo(url, filename = 'quantum-tiles-walkthrough.webm') {
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  setTimeout(() => URL.revokeObjectURL(url), 10000);
}

export function isRecordingSupported() {
  return typeof MediaRecorder !== 'undefined' && typeof HTMLCanvasElement !== 'undefined'
    && HTMLCanvasElement.prototype.captureStream !== undefined;
}
