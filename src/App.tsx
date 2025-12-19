import { useCallback, useState } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSnowPreset } from "tsparticles-preset-snow";

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
  const [nucleationRate, setNucleationRate] = useState(800);
  const [atmosphericFlow, setAtmosphericFlow] = useState("bottom");

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
                value: crystalDensity,
                density: {
                  enable: true,
                  area: nucleationRate,
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
          style={{ position: "absolute", inset: 0 }}
        />
      </div>
      <div
        style={{
          width: sidebarOpen ? "350px" : "0",
          position: "relative",
          zIndex: 1,
          color: "white",
          padding: sidebarOpen ? "0" : "0",
          background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
          backdropFilter: "blur(20px)",
          borderLeft: sidebarOpen ? "1px solid rgba(148, 163, 184, 0.2)" : "none",
          boxShadow: sidebarOpen ? "-10px 0 40px rgba(0, 0, 0, 0.5)" : "none",
          overflowY: "auto",
          overflowX: "hidden",
          transition: "all 0.3s ease",
        }}
      >
        {!sidebarOpen && (
          <button
            onClick={() => setSidebarOpen(true)}
            style={{
              position: "fixed",
              top: "20px",
              right: "20px",
              zIndex: 10,
              padding: "12px 20px",
              background: "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)",
              color: "white",
              border: "1px solid rgba(148, 163, 184, 0.2)",
              borderRadius: "3px",
              cursor: "pointer",
              fontSize: "14px",
              backdropFilter: "blur(20px)",
              boxShadow: "0 4px 20px rgba(0, 0, 0, 0.3)",
              transition: "all 0.2s ease",
              fontWeight: "500",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(30, 41, 59, 0.95) 0%, rgba(51, 65, 85, 0.95) 100%)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "linear-gradient(135deg, rgba(15, 23, 42, 0.95) 0%, rgba(30, 41, 59, 0.95) 100%)";
            }}
          >
            Show Controls
          </button>
        )}
        {sidebarOpen && (
          <>
            <div style={{
              padding: "30px 20px 20px",
              borderBottom: "1px solid rgba(148, 163, 184, 0.2)",
              background: "rgba(0, 0, 0, 0.2)",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}>
              <div>
                <h1 style={{ 
                  marginBottom: "8px", 
                  fontSize: "1.8em",
                  background: "linear-gradient(135deg, #60a5fa 0%, #a78bfa 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                  fontWeight: "700",
                }}>ViSnowlizer</h1>
                <h2 style={{ 
                  marginBottom: "0", 
                  fontSize: "0.9em",
                  color: "rgba(148, 163, 184, 0.8)",
                  fontWeight: "400",
                  letterSpacing: "0.5px",
                }}>Snow Crystal Controls</h2>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                style={{
                  padding: "8px 12px",
                  background: "rgba(15, 23, 42, 0.6)",
                  color: "rgba(203, 213, 225, 0.9)",
                  border: "1px solid rgba(148, 163, 184, 0.3)",
                  borderRadius: "3px",
                  cursor: "pointer",
                  fontSize: "14px",
                  fontWeight: "500",
                  transition: "all 0.2s ease",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "rgba(30, 41, 59, 0.8)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "rgba(15, 23, 42, 0.6)";
                }}
              >
                Hide
              </button>
            </div>
            <div style={{ padding: "20px" }}>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Crystal Density
          </label>
          <input
            type="number"
            min="10"
            max="200"
            value={crystalDensity}
            onChange={(e) => setCrystalDensity(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
              color: "white",
              fontSize: "15px",
              transition: "all 0.2s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Terminal Velocity
          </label>
          <input
            type="number"
            min="1"
            max="10"
            step="0.5"
            value={terminalVelocity}
            onChange={(e) => setTerminalVelocity(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
              color: "white",
              fontSize: "15px",
              transition: "all 0.2s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Crystal Diameter
          </label>
          <input
            type="number"
            min="5"
            max="30"
            value={crystalDiameter}
            onChange={(e) => setCrystalDiameter(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
              color: "white",
              fontSize: "15px",
              transition: "all 0.2s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Particle Color
          </label>
          <input
            type="color"
            value={particleColor}
            onChange={(e) => setParticleColor(e.target.value)}
            style={{ 
              width: "100%", 
              height: "45px", 
              cursor: "pointer",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Background Color
          </label>
          <input
            type="color"
            value={backgroundColor}
            onChange={(e) => setBackgroundColor(e.target.value)}
            style={{ 
              width: "100%", 
              height: "45px", 
              cursor: "pointer",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Humidity (Min)
          </label>
          <input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={humidityMin}
            onChange={(e) => setHumidityMin(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
              color: "white",
              fontSize: "15px",
              transition: "all 0.2s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Humidity (Max)
          </label>
          <input
            type="number"
            min="0"
            max="1"
            step="0.1"
            value={humidityMax}
            onChange={(e) => setHumidityMax(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
              color: "white",
              fontSize: "15px",
              transition: "all 0.2s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Wind Turbulence
          </label>
          <input
            type="number"
            min="0"
            max="50"
            value={windTurbulence}
            onChange={(e) => setWindTurbulence(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
              color: "white",
              fontSize: "15px",
              transition: "all 0.2s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Air Resistance
          </label>
          <input
            type="number"
            min="1"
            max="50"
            value={airResistance}
            onChange={(e) => setAirResistance(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
              color: "white",
              fontSize: "15px",
              transition: "all 0.2s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Nucleation Rate
          </label>
          <input
            type="number"
            min="100"
            max="2000"
            step="100"
            value={nucleationRate}
            onChange={(e) => setNucleationRate(Number(e.target.value))}
            style={{ 
              width: "100%",
              padding: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
              color: "white",
              fontSize: "15px",
              transition: "all 0.2s ease",
            }}
          />
        </div>

        <div style={{ marginBottom: "20px" }}>
          <label style={{ 
            display: "block", 
            marginBottom: "8px",
            fontSize: "0.9em",
            color: "rgba(203, 213, 225, 0.9)",
            fontWeight: "500",
          }}>
            Atmospheric Flow
          </label>
          <select
            value={atmosphericFlow}
            onChange={(e) => setAtmosphericFlow(e.target.value)}
            style={{ 
              width: "100%",
              padding: "10px",
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(148, 163, 184, 0.3)",
              borderRadius: "3px",
              color: "white",
              fontSize: "15px",
              cursor: "pointer",
              transition: "all 0.2s ease",
            }}
          >
            <option value="bottom" style={{ background: "#1a1a1a" }}>Bottom</option>
            <option value="top" style={{ background: "#1a1a1a" }}>Top</option>
            <option value="left" style={{ background: "#1a1a1a" }}>Left</option>
            <option value="right" style={{ background: "#1a1a1a" }}>Right</option>
            <option value="none" style={{ background: "#1a1a1a" }}>Random</option>
          </select>
        </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
