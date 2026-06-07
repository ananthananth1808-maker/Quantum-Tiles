import { createContext, useContext, useReducer, useCallback } from 'react';
import { tilesCatalog, getDefaultFloorTile, getDefaultWallTile } from '../data/tilesCatalog';
import { roomTemplates } from '../data/roomTemplates';

const initialState = {
  activeRoom: roomTemplates[0],
  floorTile: getDefaultFloorTile(),
  wallTile: getDefaultWallTile(),
  activeZone: 'floor',     // 'floor' | 'wall'
  mode: '2d',              // '2d' | '3d' | 'walkthrough' | 'export' | 'ai'
  isWalkthroughPlaying: false,
  walkthroughProgress: 0,
  walkthroughSpeed: 1,
  uploadedRoomImage: null,
  aiRecommendations: [],
  isRecording: false,
  isFullscreen: false,
};

function reducer(state, action) {
  switch (action.type) {
    case 'SET_ROOM':
      return { ...state, activeRoom: action.payload };
    case 'SET_FLOOR_TILE':
      return { ...state, floorTile: action.payload };
    case 'SET_WALL_TILE':
      return { ...state, wallTile: action.payload };
    case 'SET_ACTIVE_ZONE':
      return { ...state, activeZone: action.payload };
    case 'APPLY_TILE': {
      const target = state.activeZone === 'floor' ? 'floorTile' : 'wallTile';
      return { ...state, [target]: action.payload };
    }
    case 'SET_MODE':
      return { ...state, mode: action.payload };
    case 'SET_WALKTHROUGH_PLAYING':
      return { ...state, isWalkthroughPlaying: action.payload };
    case 'SET_WALKTHROUGH_PROGRESS':
      return { ...state, walkthroughProgress: action.payload };
    case 'SET_WALKTHROUGH_SPEED':
      return { ...state, walkthroughSpeed: action.payload };
    case 'SET_UPLOADED_IMAGE':
      return { ...state, uploadedRoomImage: action.payload };
    case 'SET_AI_RECOMMENDATIONS':
      return { ...state, aiRecommendations: action.payload };
    case 'SET_RECORDING':
      return { ...state, isRecording: action.payload };
    case 'SET_FULLSCREEN':
      return { ...state, isFullscreen: action.payload };
    default:
      return state;
  }
}

const VisualizerContext = createContext(null);

export function VisualizerProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <VisualizerContext.Provider value={{ state, dispatch }}>
      {children}
    </VisualizerContext.Provider>
  );
}

export function useVisualizerStore() {
  const ctx = useContext(VisualizerContext);
  if (!ctx) throw new Error('useVisualizerStore must be used within VisualizerProvider');

  const { state, dispatch } = ctx;

  const setRoom = useCallback((room) => dispatch({ type: 'SET_ROOM', payload: room }), [dispatch]);
  const setFloorTile = useCallback((tile) => dispatch({ type: 'SET_FLOOR_TILE', payload: tile }), [dispatch]);
  const setWallTile = useCallback((tile) => dispatch({ type: 'SET_WALL_TILE', payload: tile }), [dispatch]);
  const setActiveZone = useCallback((zone) => dispatch({ type: 'SET_ACTIVE_ZONE', payload: zone }), [dispatch]);
  const applyTile = useCallback((tile) => dispatch({ type: 'APPLY_TILE', payload: tile }), [dispatch]);
  const setMode = useCallback((mode) => dispatch({ type: 'SET_MODE', payload: mode }), [dispatch]);
  const setWalkthroughPlaying = useCallback((v) => dispatch({ type: 'SET_WALKTHROUGH_PLAYING', payload: v }), [dispatch]);
  const setWalkthroughProgress = useCallback((v) => dispatch({ type: 'SET_WALKTHROUGH_PROGRESS', payload: v }), [dispatch]);
  const setWalkthroughSpeed = useCallback((v) => dispatch({ type: 'SET_WALKTHROUGH_SPEED', payload: v }), [dispatch]);
  const setUploadedImage = useCallback((img) => dispatch({ type: 'SET_UPLOADED_IMAGE', payload: img }), [dispatch]);
  const setAiRecommendations = useCallback((recs) => dispatch({ type: 'SET_AI_RECOMMENDATIONS', payload: recs }), [dispatch]);
  const setRecording = useCallback((v) => dispatch({ type: 'SET_RECORDING', payload: v }), [dispatch]);
  const setFullscreen = useCallback((v) => dispatch({ type: 'SET_FULLSCREEN', payload: v }), [dispatch]);

  // Mock AI recommendation generator
  const generateAiRecommendations = useCallback(() => {
    const shuffled = [...tilesCatalog].sort(() => Math.random() - 0.5);
    const recs = shuffled.slice(0, 4).map((tile, i) => ({
      ...tile,
      score: Math.floor(95 - i * 6 + Math.random() * 4),
      reason: ['Perfect color harmony', 'Ideal tone match', 'Great texture contrast', 'Complementary palette'][i],
    }));
    dispatch({ type: 'SET_AI_RECOMMENDATIONS', payload: recs });
  }, [dispatch]);

  return {
    ...state,
    setRoom,
    setFloorTile,
    setWallTile,
    setActiveZone,
    applyTile,
    setMode,
    setWalkthroughPlaying,
    setWalkthroughProgress,
    setWalkthroughSpeed,
    setUploadedImage,
    setAiRecommendations,
    setRecording,
    setFullscreen,
    generateAiRecommendations,
  };
}
