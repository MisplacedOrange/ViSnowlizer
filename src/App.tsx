import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSnowPreset } from "tsparticles-preset-snow";
import "./App.css";

function App() {
  const [crystalDensity, setCrystalDensity] = useState(50);
  const [terminalVelocity, setTerminalVelocity] = useState(3);
  const [particleColor, setParticleColor] = useState("#ffffff");
  const [crystalDiameter, setCrystalDiameter] = useState(10);
  const [backgroundColor, setBackgroundColor] = useState("#0d1117");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [humidityMin, setHumidityMin] = useState(0.3);
  const [humidityMax, setHumidityMax] = useState(0.8);
  const [windTurbulence, setWindTurbulence] = useState(10);
  const [airResistance, setAirResistance] = useState(10);
  const [atmosphericFlow, setAtmosphericFlow] = useState("bottom");

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSnowPreset(engine);
  }, []);

  return (
    <div className="app-container">
      <div className="particles-container">
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
                value: crystalDensity,
                density: {
                  enable: true,
                },
              },
              color: {
                value: particleColor,
              },
              shape: {
                type: "circle",
              },
              opacity: {
                value: { min: humidityMin, max: humidityMax },
              },
              size: {
                value: { min: 1, max: crystalDiameter },
              },
              move: {
                enable: true,
                speed: terminalVelocity,
                direction: atmosphericFlow as any,
                random: true,
                straight: false,
                outModes: {
                  default: "out",
                },
              },
              wobble: {
                enable: true,
                distance: windTurbulence,
                speed: airResistance,
              },
            },
          }}
          className="particles-canvas"
        />
      </div>
      <div className={`sidebar-wrapper ${!sidebarOpen ? "hidden" : ""}`}>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="toggle-button"
        >
          {sidebarOpen ? "Hide Controls" : "Show Controls"}
        </button>
        <div className="sidebar">
          <div className="sidebar-header">
          <h1>ViSnowlizer</h1>
          <h2>Snow Crystal Controls</h2>
        </div>
        <div className="sidebar-content">
          <div className="control-group">
            <label>Crystal Density</label>
            <input
              type="number"
              value={crystalDensity}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCrystalDensity(Math.min(Math.max(val, 1), 500));
              }}
            />
          </div>

          <div className="control-group">
            <label>Terminal Velocity</label>
            <input
              type="number"
              step="0.5"
              value={terminalVelocity}
              onChange={(e) => {
                const val = Number(e.target.value);
                setTerminalVelocity(Math.min(Math.max(val, 1), 100));
              }}
            />
          </div>

          <div className="control-group">
            <label>Crystal Diameter</label>
            <input
              type="number"
              value={crystalDiameter}
              onChange={(e) => {
                const val = Number(e.target.value);
                setCrystalDiameter(Math.min(Math.max(val, 5), 30));
              }}
            />
          </div>

          <div className="control-group">
            <label>Particle Color</label>
            <input
              type="color"
              value={particleColor}
              onChange={(e) => setParticleColor(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>Background Color</label>
            <input
              type="color"
              value={backgroundColor}
              onChange={(e) => setBackgroundColor(e.target.value)}
            />
          </div>

          <div className="control-group">
            <label>Humidity (Min)</label>
            <input
              type="number"
              min="0"
              value={humidityMin}
              onChange={(e) => {
                const val = Number(e.target.value);
                setHumidityMin(Math.min(Math.max(val, 0), 1));
              }}
            />
          </div>

          <div className="control-group">
            <label>Humidity (Max)</label>
            <input
              type="number"
              step="0.1"
              value={humidityMax}
              onChange={(e) => {
                const val = Number(e.target.value);
                setHumidityMax(Math.min(Math.max(val, 0), 1));
              }}
            />
          </div>

          <div className="control-group">
            <label>Wind Turbulence</label>
            <input
              type="number"
              value={windTurbulence}
              onChange={(e) => {
                const val = Number(e.target.value);
                setWindTurbulence(Math.min(Math.max(val, 0), 50));
              }}
            />
          </div>

          <div className="control-group">
            <label>Air Resistance</label>
            <input
              type="number"
              value={airResistance}
              onChange={(e) => {
                const val = Number(e.target.value);
                setAirResistance(Math.min(Math.max(val, 1), 50));
              }}
            />
          </div>

          <div className="control-group">
            <label>Atmospheric Flow</label>
            <select
              value={atmosphericFlow}
              onChange={(e) => setAtmosphericFlow(e.target.value)}
            >
              <option value="bottom">Bottom</option>
              <option value="top">Top</option>
              <option value="left">Left</option>
              <option value="right">Right</option>
              <option value="none">Random</option>
            </select>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}

export default App;
