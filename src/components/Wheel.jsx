import { useState, useEffect } from "react";
import "../App.css";

const SPIN_DURATION = 4000;

export default function Wheel({ options = [], onResult }) {
  const [rotation, setRotation] = useState(0);
  const [spinning, setSpinning] = useState(false);

  const colors = [
    "#fde68a",
    "#bfdbfe",
    "#fecaca",
    "#bbf7d0",
    "#e9d5ff",
    "#fbcfe8",
    "#a7f3d0",
    "#ddd6fe",
    "#fed7aa",
    "#bae6fd"
  ];

  useEffect(() => {
    setRotation(0);
    setSpinning(false);
  }, [options]);

  const spin = () => {
    if (spinning || options.length === 0) return;

    setSpinning(true);

    const sliceAngle = 360 / options.length;
    const index = Math.floor(Math.random() * options.length);

    const extraTurns = 5 * 360;
    const landing = 360 - index * sliceAngle - sliceAngle / 2;

    setRotation(prev => prev + extraTurns + landing);

    setTimeout(() => {
      onResult?.(options[index]);
      setSpinning(false);
    }, SPIN_DURATION);
  };

  const sliceAngle = 360 / options.length;

  return (
    <div className="wheel-wrapper">
      <div className="pointer" />

      <div
        className="wheel"
        style={{
          transform: `rotate(${rotation}deg)`,
          transition: `transform ${SPIN_DURATION}ms cubic-bezier(.17,.67,.13,.99)`
        }}
      >
        {options.map((opt, i) => (
          <div
            key={opt}
            className="slice"
            style={{
              transform: `rotate(${i * sliceAngle}deg)`,
              background: colors[i % colors.length]
            }}
          >
            <div className="slice-text">
              {opt}
            </div>
          </div>
        ))}
      </div>

      <button onClick={spin} disabled={spinning}>
        {spinning ? "Spinning..." : "Spin"}
      </button>
    </div>
  );
}