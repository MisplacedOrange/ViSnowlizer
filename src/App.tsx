import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSnowPreset } from "tsparticles-preset-snow";

function App() {
  const [particleCount, setParticleCount] = useState(50);
  const [fallSpeed, setFallSpeed] = useState(3);
  const [particleColor, setParticleColor] = useState("#ffffff");
  const [particleSize, setParticleSize] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState("#0d1117");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [opacityMin, setOpacityMin] = useState(0.3);
  const [opacityMax, setOpacityMax] = useState(0.8);
  const [wobbleDistance, setWobbleDistance] = useState(10);
  const [wobbleSpeed, setWobbleSpeed] = useState(10);
  const [densityArea, setDensityArea] = useState(800);
  const [direction, setDirection] = useState("bottom");

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSnowPreset(engine);
  }, []);

  return (
    <div style={{ display: "flex", width: "100%", height: "100vh" }}>
      <div style={{ flex: 1, position: "relative", overflow: "hidden" }}>
        <Particles
          id="tsparticles"
          init={particlesInit}
          options={{
            background: {
              color: {
                value: backgroundColor,
              },
            },
            particles: {
              number: {
                value: particleCount,
                density: {
                  enable: true,
                  area: densityArea,
                },
              },
              color: {
                value: particleColor,
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: { min: opacityMin, max: opacityMax },
              },
              size: {
                value: { min: 1, max: particleSize },
              },
              move: {
                enable: true,
                speed: fallSpeed,
                direction: direction as any,
                random: true,
                straight: false,
                outModes: {
                  default: "out",
                },
              },
              wobble: {
                enable: true,
                distance: wobbleDistance,
                speed: wobbleSpeed,
              },
            },
          }}
          style={{ position: "absolute", inset: 0 }}
        />
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          style={{
            position: "absolute",
            top: "20px",
            right: "20px",
            zIndex: 10,
            padding: "12px 20px",
            background: "rgba(0, 0, 0, 0.7)",
            color: "white",
            border: "2px solid rgba(255, 255, 255, 0.3)",
            borderRadius: "8px",
            cursor: "pointer",
            fontSize: "16px",
            backdropFilter: "blur(10px)",
          }}
        >
          {sidebarOpen ? "Hide Controls" : "Show Controls"}
        </button>
      </div>
      <div
        style={{
          width: sidebarOpen ? "350px" : "0",
          position: "relative",
          zIndex: 1,
          color: "white",
          padding: sidebarOpen ? "30px 20px" : "0",
          background: "rgba(0, 0, 0, 0.6)",
          backdropFilter: "blur(8px)",
          overflowY: "auto",
          overflowX: "hidden",
          transition: "width 0.3s ease, padding 0.3s ease",
        }}
      >
        {sidebarOpen && (
          <>
            <h1 style={{ marginBottom: "20px" }}>ViSnowlizer</h1>
            <h2 style={{ marginBottom: "20px", fontSize: "1.25em" }}>Snow Controls</h2>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Particle Count
          </label>
          <input
            type="number"
            min="10"
            max="200"
            value={particleCount}
            onChange={(e) => setParticleCount(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Fall Speed
          </label>
          <input
            type="number"
            min="1"
            max="10"
            step="0.5"
            value={fallSpeed}
            onChange={(e) => setFallSpeed(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Particle Size
          </label>
          <input
            type="number"
            min="5"
            max="30"
            value={particleSize}
            onChange={(e) => setParticleSize(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Particle Color
          </label>
          <input
            type="color"
            value={particleColor}
            onChange={(e) => setParticleColor(e.target.value)}
            style={{ width: "100%", height: "40px", cursor: "pointer" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Background Color
          </label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            style={{ width: "100%", height: "40px", cursor: "pointer" }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Opacity Min
          </label>
          <input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={opacityMin}
            onChange={(e) => setOpacityMin(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Opacity Max
          </label>
          <input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={opacityMax}
            onChange={(e) => setOpacityMax(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Wobble Distance
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={wobbleDistance}
            onChange={(e) => setWobbleDistance(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Wobble Speed
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={wobbleSpeed}
            onChange={(e) => setWobbleSpeed(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Density Area
          </label>
          <input
            type="number"
            min="100"
            max="2000"
            step="100"
            value={densityArea}
            onChange={(e) => setDensityArea(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "white",
              fontSize: "16px"
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ display: "block", marginBottom: "8px" }}>
            Direction
          </label>
          <select
            value={direction}
            onChange={(e) => setDirection(e.target.value)}
            style={{ 
              width: "100%",
              padding: "8px",
              background: "rgba(255, 255, 255, 0.1)",
              border: "1px solid rgba(255, 255, 255, 0.3)",
              borderRadius: "4px",
              color: "white",
              fontSize: "16px",
              cursor: "pointer"
            }}
          >
            <option value="bottom" style={{ background: "#1a1a1a" }}>Bottom</option>
            <option value="top" style={{ background: "#1a1a1a" }}>Top</option>
            <option value="left" style={{ background: "#1a1a1a" }}>Left</option>
            <option value="right" style={{ background: "#1a1a1a" }}>Right</option>
            <option value="none" style={{ background: "#1a1a1a" }}>Random</option>
          </select>
        </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
