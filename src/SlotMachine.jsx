import { useState, useMemo } from "react";

const ITEM_HEIGHT = 72;
const SPIN_TIME = 2200;

export default function SlotMachine({ categories }) {
  const wheelKeys = Object.keys(categories);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [spinning, setSpinning] = useState(false);
  const [offset, setOffset] = useState(0);
  const [winner, setWinner] = useState(null);
  const [results, setResults] = useState([]);
  const [pendingWinner, setPendingWinner] = useState(null);

  const [notes, setNotes] = useState("");
  const [characterName, setCharacterName] = useState("");

  const isComplete = currentIndex >= wheelKeys.length;

  const currentWheel = !isComplete
    ? categories[wheelKeys[currentIndex]]
    : null;

  const options = currentWheel?.options || [];

  const displayList = useMemo(
    () => Array(10).fill(options).flat(),
    [options]
  );

  const totalHeight = options.length * ITEM_HEIGHT;

  function spin() {
    if (spinning || options.length === 0) return;

    setSpinning(true);
    setPendingWinner(null);

    const index = Math.floor(Math.random() * options.length);
    const loops = options.length * 8;
    const finalOffset = (loops + index) * ITEM_HEIGHT;

    setOffset(finalOffset);

    setTimeout(() => {
      const result = options[index];
      setPendingWinner(result);
      setSpinning(false);
      setOffset(finalOffset % totalHeight + totalHeight * 4);
    }, SPIN_TIME);
  }

  /* ✅ NEW — reroll same category */
  function reroll() {
    if (spinning) return;
    setPendingWinner(null);
    spin();
  }

  function confirmResult() {
    if (!currentWheel || !pendingWinner) return;

    setResults(prev => [
      ...prev,
      { label: currentWheel.label, value: pendingWinner }
    ]);

    setWinner(pendingWinner);
    setPendingWinner(null);
    setCurrentIndex(i => i + 1);
    setOffset(0);
  }

  function handlePrint() {
    window.print();
  }

  return (
    <div className="slot-wrapper">
      {isComplete ? (
        <div className="complete-screen">

          <h2>Character Complete!</h2>

          <input
            className="character-name"
            placeholder="Character name..."
            value={characterName}
            onChange={e => setCharacterName(e.target.value)}
          />

          <div className="character-summary">
            {results.map((r, i) => (
              <div key={i} className="summary-row">
                <strong>{r.label}:</strong> {r.value}
              </div>
            ))}
          </div>

          <textarea
            className="notes-box"
            placeholder="Add any additional details..."
            value={notes}
            onChange={e => setNotes(e.target.value)}
          />

          <div className="export-actions">
            <button onClick={handlePrint}>
              Print / Export PDF
            </button>
          </div>

        </div>
      ) : (
        <>
          <h2 className="category-title">
            {currentWheel.label}
          </h2>

          <div className={`slot-window ${pendingWinner ? "winner-glow" : ""}`}>
            <div
              className="slot-track"
              style={{
                transform: `translateY(-${offset}px)`,
                transition: spinning
                  ? `transform ${SPIN_TIME}ms cubic-bezier(.15,.8,.25,1)`
                  : "none"
              }}
            >
              {displayList.map((opt, i) => (
                <div key={i} className="slot-item">
                  {opt}
                </div>
              ))}
            </div>
          </div>

          {!pendingWinner && (
            <button onClick={spin} disabled={spinning}>
              {spinning ? "Rolling..." : "Spin"}
            </button>
          )}

          {pendingWinner && (
            <div className="result-actions">
              <button className="reroll-btn" onClick={reroll}>
                Reroll
              </button>

              <button onClick={confirmResult}>
                Next
              </button>
            </div>
          )}

          <div className="results-list">
            {results.map((r, i) => (
              <div key={i}>
                {r.label}: {r.value}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}