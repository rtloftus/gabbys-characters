import { useState } from "react";
import SlotMachine from "./SlotMachine";
import Settings from "./components/Settings";
import { wheels as initialWheels } from "./data/wheels";
import "./App.css";

export default function App() {
  /* -------------------------
     MODE CONTROL
  ------------------------- */
  const [mode, setMode] = useState("setup"); // "setup" | "play"

  /* -------------------------
     SETUP DATA (editable)
  ------------------------- */
  const [editableWheels, setEditableWheels] =
    useState(initialWheels);

  /* -------------------------
     LOCKED GAME DATA
  ------------------------- */
  const [gameWheels, setGameWheels] = useState(null);
  const [currentWheel, setCurrentWheel] = useState(null);

  /* -------------------------
     GAME STATE
  ------------------------- */
  const [revealedResult, setRevealedResult] = useState(null);
  const [history, setHistory] = useState([]);

  const wheel = gameWheels?.[currentWheel];

  /* =========================
     START GAME (LOCK DATA)
  ========================= */
  const startGame = () => {
    const snapshot = structuredClone(editableWheels);

    setGameWheels(snapshot);
    setCurrentWheel(Object.keys(snapshot)[0]);
    setHistory([]);
    setRevealedResult(null);
    setMode("play");
  };

  /* =========================
     RESULT HANDLING
  ========================= */
  const handleResult = (result) => {
    setRevealedResult(result);
  };

  const continueFlow = () => {
    if (!wheel) return;

    // add to growing results list
    setHistory(prev => [
      ...prev,
      {
        label: wheel.label,
        value: revealedResult
      }
    ]);

    const next = wheel.next || null;
    setCurrentWheel(next);
    setRevealedResult(null);
  };

  /* =========================
     RESET BACK TO SETUP
  ========================= */
  const restart = () => {
    setMode("setup");
    setGameWheels(null);
    setCurrentWheel(null);
    setHistory([]);
    setRevealedResult(null);
  };

  /* =====================================================
     SETUP MODE
  ===================================================== */
  if (mode === "setup") {
    return (
      <div className="page">
        <header className="app-header">
          <img
            className="logo-image"
            src="/gabby-logo.png"
            alt="Gabby's Logo"
          />
          <h1 className="title">Character Inspirations</h1>
        </header>

        <main className="main setup">
          <Settings
            wheels={editableWheels}
            setWheels={setEditableWheels}
          />

          <button className="start-btn" onClick={startGame}>
            Start
          </button>
        </main>
      </div>
    );
  }

  /* =====================================================
     PLAY MODE
  ===================================================== */

  // finished all categories
  if (!wheel) {
    return (
      <div className="page">
        <header className="app-header">
          <img
            className="logo-image"
            src="/gabby-logo.png"
            alt="Gabby's Logo"
          />
          <h1 className="title">Character Inspirations</h1>
        </header>

        <main className="main">
          <h2>Character Complete</h2>

          <div className="results-history">
            {history.map((item, i) => (
              <div key={i} className="story-item">
                <strong>{item.label}:</strong> {item.value}
              </div>
            ))}
          </div>

          <button onClick={restart}>
            Edit Setup
          </button>
        </main>
      </div>
    );
  }

  return (
    <div className="page">
      {/* HEADER */}
      <header className="app-header">
        <img
          className="logo-image"
          src="/gabby-logo.png"
          alt="Gabby's Logo"
        />
        <h1 className="title">Character Inspirations</h1>
      </header>

      {/* MAIN CENTER */}
      <main className="main">
        <h2 className="category-title">
          {wheel.label}
        </h2>

        {!revealedResult && (
          <SlotMachine
            options={wheel.options}
            onResult={handleResult}
          />
        )}

        {revealedResult && (
          <div className="result-card">
            <h2>{revealedResult}</h2>
            <button onClick={continueFlow}>
              Next
            </button>
          </div>
        )}

        {/* Growing results list */}
        <div className="results-history">
          {history.map((item, i) => (
            <div key={i} className="story-item">
              <strong>{item.label}:</strong> {item.value}
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}