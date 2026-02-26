import { useEffect, useState, useCallback } from "react";

/**
 * Easter Eggs Component
 * 1. Type "devmode()" anywhere to activate neon theme for 2 minutes
 * 2. Random glowing pixel appears occasionally - clicking shows secret message
 */
const EasterEggs = () => {
  const [devMode, setDevMode] = useState(false);
  const [typedKeys, setTypedKeys] = useState("");
  const [pixel, setPixel] = useState<{ x: number; y: number; visible: boolean }>({
    x: 0,
    y: 0,
    visible: false,
  });
  const [pixelMessage, setPixelMessage] = useState(false);

  // Devmode keyboard listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setTypedKeys((prev) => {
        const next = (prev + e.key).slice(-9); // "devmode()" = 9 chars
        if (next === "devmode()") {
          setDevMode(true);
          setTimeout(() => setDevMode(false), 120000); // 2 minutes
          return "";
        }
        return next;
      });
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Apply devmode neon theme
  useEffect(() => {
    if (devMode) {
      document.documentElement.classList.add("devmode-neon");
    } else {
      document.documentElement.classList.remove("devmode-neon");
    }
  }, [devMode]);

  // Random glowing pixel
  useEffect(() => {
    const spawnPixel = () => {
      const x = Math.random() * (window.innerWidth - 20) + 10;
      const y = Math.random() * (window.innerHeight - 20) + 10;
      setPixel({ x, y, visible: true });

      // Hide after 8 seconds if not clicked
      setTimeout(() => {
        setPixel((p) => (p.x === x && p.y === y ? { ...p, visible: false } : p));
      }, 8000);
    };

    // Spawn every 30-60s
    const interval = setInterval(spawnPixel, 30000 + Math.random() * 30000);
    // First spawn after 15s
    const initialTimeout = setTimeout(spawnPixel, 15000);

    return () => {
      clearInterval(interval);
      clearTimeout(initialTimeout);
    };
  }, []);

  const handlePixelClick = useCallback(() => {
    setPixel((p) => ({ ...p, visible: false }));
    setPixelMessage(true);
    setTimeout(() => setPixelMessage(false), 3000);
  }, []);

  return (
    <>
      {/* Devmode notification */}
      {devMode && (
        <div
          className="fixed top-20 right-4 z-[100] px-4 py-2 rounded-xl text-xs font-mono"
          style={{
            background: "linear-gradient(135deg, #0f0 0%, #0ff 100%)",
            color: "#000",
            boxShadow: "0 0 20px #0f0, 0 0 40px #0ff",
            animation: "pulse 2s ease infinite",
          }}
        >
          🔓 DEV MODE ACTIVATED
        </div>
      )}

      {/* Glowing pixel */}
      {pixel.visible && (
        <div
          onClick={handlePixelClick}
          className="fixed z-[99] cursor-pointer"
          style={{
            left: pixel.x,
            top: pixel.y,
            width: 6,
            height: 6,
            borderRadius: "50%",
            background: "#4285F4",
            boxShadow: "0 0 6px 3px rgba(66,133,244,0.6), 0 0 12px 6px rgba(66,133,244,0.3)",
            animation: "pulse 1.5s ease infinite",
          }}
        />
      )}

      {/* Pixel clicked message */}
      {pixelMessage && (
        <div
          className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[100] px-6 py-4 rounded-2xl text-center"
          style={{
            background: "linear-gradient(135deg, rgba(66,133,244,0.95), rgba(52,168,83,0.95))",
            color: "#fff",
            boxShadow: "0 0 40px rgba(66,133,244,0.5)",
          }}
        >
          <p className="text-lg font-bold mb-1">🚀 Developer Mode Activated</p>
          <p className="text-sm opacity-80">You found the secret pixel!</p>
        </div>
      )}

      {/* Neon devmode styles */}
      {devMode && (
        <style>{`
          .devmode-neon {
            --primary: 142 70% 50% !important;
            --ring: 180 100% 50% !important;
          }
          .devmode-neon .glass-card,
          .devmode-neon .glass-card-hover {
            border-color: hsl(142 70% 50% / 0.3) !important;
            box-shadow: 0 0 15px hsl(142 70% 50% / 0.1), 0 0 30px hsl(180 100% 50% / 0.05) !important;
          }
          .devmode-neon .btn-google {
            background: linear-gradient(135deg, hsl(142 70% 50%), hsl(180 100% 50%)) !important;
            box-shadow: 0 0 20px hsl(142 70% 50% / 0.4) !important;
          }
          .devmode-neon .color-bar {
            background: linear-gradient(90deg, #0f0, #0ff, #f0f, #0f0) !important;
            box-shadow: 0 0 10px #0f0 !important;
          }
        `}</style>
      )}
    </>
  );
};

export default EasterEggs;
