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

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSnowPreset(engine);
  }, []);

  return (
    <>
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
                area: 800,
              },
            },
            color: {
              value: particleColor,
            },
            shape: {
              type: "circle",
            },
            opacity: {
              value: { min: 0.3, max: 0.8 },
            },
            size: {
              value: { min: 1, max: particleSize },
            },
            move: {
              enable: true,
              speed: fallSpeed,
              direction: "bottom",
              random: true,
              straight: false,
              outModes: {
                default: "out",
              },
            },
            wobble: {
              enable: true,
              distance: 10,
              speed: 10,
            },
          },
        }}
      />
      <div style={{
        position: "relative",
        zIndex: 1,
        color: "white",
        padding: "50px 20px",
      }}>
        <h1 style={{ textAlign: "center", marginBottom: "30px" }}>ViSnowlizer</h1>
        
        <div style={{
          maxWidth: "600px",
          margin: "0 auto",
          background: "rgba(0, 0, 0, 0.6)",
          padding: "30px",
          borderRadius: "10px",
          backdropFilter: "blur(10px)",
        }}>
          <h2 style={{ marginBottom: "20px", fontSize: "1.5em" }}>Snow Controls</h2>
          
          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Particle Count: {particleCount}
            </label>
            <input
              type="range"
              min="10"
              max="200"
              value={particleCount}
              onChange={(e) => setParticleCount(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Fall Speed: {fallSpeed}
            </label>
            <input
              type="range"
              min="1"
              max="10"
              step="0.5"
              value={fallSpeed}
              onChange={(e) => setFallSpeed(Number(e.target.value))}
              style={{ width: "100%" }}
            />
          </div>

          <div style={{ marginBottom: "20px" }}>
            <label style={{ display: "block", marginBottom: "8px" }}>
              Particle Size: {particleSize}
            </label>
            <input
              type="range"
              min="5"
              max="30"
              value={particleSize}
              onChange={(e) => setParticleSize(Number(e.target.value))}
              style={{ width: "100%" }}
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
        </div>
      </div>
    </>
  );
}

export default App;
