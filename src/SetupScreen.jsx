import { useState, useEffect } from "react";

export default function SetupScreen({ onStart, presets }) {
  const [categories, setCategories] = useState([]);
  const [openCat, setOpenCat] = useState(null); // which category dropdown is open

  useEffect(() => {
    const initial = Object.keys(presets).map(key => ({
      id: crypto.randomUUID(),
      key,
      name: presets[key].label,
      items: [...presets[key].options]
    }));
    setCategories(initial);
  }, [presets]);

  const toggleDropdown = id => setOpenCat(openCat === id ? null : id);

  const addCategory = () => {
    setCategories(prev => [
      ...prev,
      {
        id: crypto.randomUUID(),
        key: `custom${prev.length + 1}`,
        name: `Category ${prev.length + 1}`,
        items: ["Item 1", "Item 2"]
      }
    ]);
  };

  const deleteCategory = id => {
    setCategories(prev => prev.filter(c => c.id !== id));
    if (openCat === id) setOpenCat(null);
  };

  const addItem = id => {
    setCategories(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, items: [...c.items, `Item ${c.items.length + 1}`] }
          : c
      )
    );
  };

  const deleteItem = (id, index) => {
    setCategories(prev =>
      prev.map(c =>
        c.id === id
          ? { ...c, items: c.items.filter((_, i) => i !== index) }
          : c
      )
    );
  };

  const updateCategoryName = (id, value) => {
    setCategories(prev =>
      prev.map(c => (c.id === id ? { ...c, name: value } : c))
    );
  };

  const updateItemName = (id, index, value) => {
    setCategories(prev =>
      prev.map(c =>
        c.id === id
          ? {
              ...c,
              items: c.items.map((item, i) => (i === index ? value : item))
            }
          : c
      )
    );
  };

  return (
    <div className="setup-screen">
      <h1>First, customize your spins!</h1>

      {categories.map(cat => (
        <div key={cat.id} className="category-block">
          <div className="dropdown-button" onClick={() => toggleDropdown(cat.id)}>
            <input
              value={cat.name}
              onChange={e => updateCategoryName(cat.id, e.target.value)}
              className="category-input"
            />
            <button
              className="delete-btn"
              onClick={e => {
                e.stopPropagation();
                deleteCategory(cat.id);
              }}
            >
              ✕
            </button>
            <span className="dropdown-arrow">{openCat === cat.id ? "▲" : "▼"}</span>
          </div>

          {openCat === cat.id && (
            <div className="dropdown-content">
              {cat.items.map((item, i) => (
                <div key={i} className="item-row">
                  <input
                    value={item}
                    onChange={e => updateItemName(cat.id, i, e.target.value)}
                    className="item-input"
                  />
                  <button
                    className="delete-btn"
                    onClick={() => deleteItem(cat.id, i)}
                  >
                    🗑
                  </button>
                </div>
              ))}
              <button onClick={() => addItem(cat.id)} className="add-item-btn">
                + Add item
              </button>
            </div>
          )}
        </div>
      ))}

      <button onClick={addCategory} className="add-category-btn">
        + Add category
      </button>

      <button
        className="start-btn"
        onClick={() => onStart(
          categories.reduce((acc, c) => {
            acc[c.key] = { label: c.name, options: c.items };
            return acc;
          }, {})
        )}
      >
        I'm Ready!
      </button>
    </div>
  );
}