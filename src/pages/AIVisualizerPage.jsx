import { useState, useEffect } from "react";
import { supabase } from "../shared/api/supabase";

export default function AIVisualizer() {
  const [roomImage, setRoomImage] = useState(null);
  const [roomImageUrl, setRoomImageUrl] = useState(null);
  const [selectedTile, setSelectedTile] = useState("");
  const [selectedTileImage, setSelectedTileImage] = useState(null);
  const [tiles, setTiles] = useState([]);
  const [tilesLoading, setTilesLoading] = useState(true);
  const [tilesError, setTilesError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showPreview, setShowPreview] = useState(false);

  // Fetch tiles from Supabase on component mount
  useEffect(() => {
    fetchTiles();
  }, []);

  const fetchTiles = async () => {
    try {
      setTilesLoading(true);
      setTilesError(null);
      
      const { data, error } = await supabase
        .from('products')
        .select('id, name, image_url')
        .order('name', { ascending: true });

      if (error) {
        console.error('Error fetching tiles:', error);
        setTilesError('Failed to load tiles');
        return;
      }

      setTiles(data || []);
    } catch (err) {
      console.error('Unexpected error fetching tiles:', err);
      setTilesError('An unexpected error occurred');
    } finally {
      setTilesLoading(false);
    }
  };

  const handleRoomImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setRoomImage(file);
      // Create a URL for the uploaded file
      const url = URL.createObjectURL(file);
      setRoomImageUrl(url);
      console.log("Room image uploaded, URL created");
    }
  };

  const handleTileChange = (e) => {
    const tileId = e.target.value;
    console.log("Tile selected with ID:", tileId, "Type:", typeof tileId);
    setSelectedTile(tileId);
    
    // Find the selected tile and get its image_url
    const tile = tiles.find(t => String(t.id) === tileId);
    console.log("Found tile:", tile);
    
    if (tile && tile.image_url) {
      setSelectedTileImage(tile.image_url);
      console.log("Selected tile image URL:", tile.image_url);
    } else {
      console.warn("Tile not found or missing image_url");
      setSelectedTileImage(null);
    }
  };

  const handleGeneratePreview = () => {
    console.log("handleGeneratePreview called");
    console.log("Current roomImage:", roomImage);
    console.log("Current selectedTile state:", selectedTile);
    console.log("Current selectedTileImage state:", selectedTileImage);
    
    if (!roomImage) {
      console.warn("No room image uploaded");
      alert("Please upload a room image first");
      return;
    }
    
    if (!selectedTile) {
      console.warn("No tile selected");
      alert("Please select a tile");
      return;
    }
    
    if (!selectedTileImage) {
      console.warn("No tile image available");
      alert("Selected tile has no image. Please choose another tile.");
      return;
    }

    console.log("Generating preview with room image and tile:", selectedTile);
    setLoading(true);
    setShowPreview(true);
    setLoading(false);
  };
  return (
    <div className="p-6 bg-violet-100">
      <h1 className="text-3xl font-bold mb-6">
        AI Tile Visualizer
      </h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Upload Room Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={handleRoomImageUpload}
          className="border p-2 w-full border-black"
        />
        {roomImageUrl && <p className="text-sm text-green-600 mt-1">✓ Room image uploaded</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-2">Select Tile</label>
        <select
          className="border p-2 w-full"
          onChange={handleTileChange}
          value={selectedTile}
          disabled={tilesLoading}
        >
          <option value="">
            {tilesLoading ? "Loading tiles..." : "Select Tile"}
          </option>
          {tiles.map((tile) => (
            <option key={tile.id} value={String(tile.id)}>
              {tile.name}
            </option>
          ))}
        </select>
        {selectedTile && <p className="text-sm text-gray-600 mt-1">Selected Tile: {selectedTile}</p>}
      </div>

      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
        onClick={handleGeneratePreview}
        disabled={loading || tilesLoading}
      >
        {loading ? "Generating Preview..." : "Generate Preview"}
      </button>

      {tilesError && (
        <p className="text-red-600 mt-4">{tilesError}</p>
      )}

      {showPreview && roomImageUrl && selectedTileImage && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Preview</h2>
          <div className="relative inline-block rounded-lg overflow-hidden shadow-lg">
            {/* Base Room Image */}
            <img
              src={roomImageUrl}
              alt="Room"
              className="block"
              style={{ maxWidth: "600px", width: "100%", height: "auto" }}
            />

            {/* Tile Overlay with 35% opacity */}
            <img
              src={selectedTileImage}
              alt="Tile Overlay"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                opacity: 0.35,
                objectFit: "cover",
                pointerEvents: "none"
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}