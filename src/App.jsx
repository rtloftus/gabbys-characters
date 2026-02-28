import { useState } from "react";
import SetupScreen from "./SetupScreen";
import SlotMachine from "./SlotMachine";
import { wheels as initialWheels } from "./data/wheels";
import "./App.css";

export default function App() {
  const [phase, setPhase] = useState("setup"); // "setup" | "spin"
  const [spinConfig, setSpinConfig] = useState([]); // frozen snapshot for spin

  function handleStart(config) {
    // freeze configuration and pass to spinner
    const snapshot = Object.keys(config).reduce((acc, key) => {
      acc[key] = { ...config[key] };
      return acc;
    }, {});
    setSpinConfig(snapshot);
    setPhase("spin");
  }

  return (
    <div className="app">
      <header className="app-header">
    <img
      className="logo-image"
      src="/gabby-logo.png"
      alt="Gabby's Logo"
    />
    <h1 className="title">Character Inspirations</h1>
  </header>
      {phase === "setup" && (
        <SetupScreen
          onStart={handleStart}
          presets={initialWheels}
        />
      )}

      {phase === "spin" && spinConfig && (
        <SlotMachine categories={spinConfig} />
      )}
    </div>
  );
}