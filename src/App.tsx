import { useCallback } from "react";
import Particles from "react-tsparticles";
import type { Engine } from "tsparticles-engine";
import { loadSnowPreset } from "tsparticles-preset-snow";

function App() {
  const particlesInit = useCallback(async (engine: Engine) => {
    // Load the snow preset
    await loadSnowPreset(engine);
  }, []);

  return (
    <>
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          preset: "snow",
          background: {
            color: {
              value: "#0d1117",
            },
          },
        }}
      />
      <div style={{
        position: "relative",
        zIndex: 1,
        color: "white",
        textAlign: "center",
        paddingTop: "50px",
      }}>
        <h1>ViSnowlizer</h1>
        <p>Welcome to the snow visualization!</p>
      </div>
    </>
  );
}

export default App;
