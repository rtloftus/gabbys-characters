import { useState } from "react";
import "../App.css";

export default function Settings({ wheels, setWheels, open, onClose }) {
  const [expanded, setExpanded] = useState(null);

  const toggleCategory = (key) => {
    setExpanded(prev => (prev === key ? null : key));
  };

  const addCategory = () => {
    const name = prompt("Category name?");
    if (!name?.trim()) return;

    setWheels(prev => ({
      ...prev,
      [name]: {
        label: name,
        options: ["Item 1", "Item 2"],
        next: null
      }
    }));

    setExpanded(name);
  };

  const deleteCategory = (key) => {
    setWheels(prev => {
      const copy = { ...prev };
      delete copy[key];
      return copy;
    });
  };

  const addOption = (key) => {
    const value = prompt("New item?");
    if (!value?.trim()) return;

    setWheels(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: [...prev[key].options, value]
      }
    }));
  };

  const deleteOption = (key, index) => {
    setWheels(prev => ({
      ...prev,
      [key]: {
        ...prev[key],
        options: prev[key].options.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className={`settings-drawer ${open ? "open" : ""}`}>

      <div className="settings-header">
        <button className="close-btn" onClick={onClose}>
          ➜
        </button>
        <h3>Settings</h3>
      </div>

      {Object.entries(wheels).map(([key, wheel]) => (
        <div key={key} className="settings-category">

        <div className="category-header">
  <button
    className="dropdown-button"
    onClick={() => toggleCategory(key)}
  >
    {expanded === key ? "▾" : "▸"} {wheel.label}
  </button>

  <button
    className="delete-btn"
    onClick={() => deleteCategory(key)}
  >
    ✕
  </button>
</div>

          {expanded === key && (
            <div className="category-options">
              {wheel.options.map((opt, i) => (
                <div key={i} className="option-row">
                  <span>{opt}</span>
                  <button
                    onClick={() => deleteOption(key, i)}
                    className="delete-btn"
                  >
                    ✕
                  </button>
                </div>
              ))}

              <button
                className="add-link"
                onClick={() => addOption(key)}
              >
                + Add item
              </button>
            </div>
          )}
        </div>
      ))}

      <button className="add-category" onClick={addCategory}>
        + Add Category
      </button>
    </div>
  );
}