
import { useState, useRef } from "react";

export default function App() {
  const inputRef = useRef();
  const [items, setItems] = useState([]);
  const [editingIndex, setEditingIndex] = useState(null); // tracks which item is being edited
  const [editValue, setEditValue] = useState("");         // temporary value while editing

  // Add new item
  function addItem() {
    const value = inputRef.current.value;
    if (value.trim() === "") return;
    setItems(prev => [...prev, value]);
    inputRef.current.value = "";
  }

  // Delete an item
  function deleteItem(indexToDelete) {
    setItems(prev => prev.filter((_, i) => i !== indexToDelete));
  }

  // Start editing an item
  function startEditing(index) {
    setEditingIndex(index);
    setEditValue(items[index]);
  }

  // Save the edited item
  function saveEdit(index) {
    if (editValue.trim() === "") return; // prevent empty edits
    setItems(prev => prev.map((item, i) => (i === index ? editValue : item)));
    setEditingIndex(null);  // exit edit mode
    setEditValue("");       // clear temporary input
  }

  return (
    <>
      <input ref={inputRef} placeholder="Enter something..." />
      <button onClick={addItem}>Add</button>

      <div style={{ marginTop: "1rem" }}>
        {items.map((item, index) => (
          <p key={index}>
            {editingIndex === index ? (
              <>
                <input
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(index)}>Save</button>
              </>
            ) : (
              <>
                {item}{" "}
                <button onClick={() => startEditing(index)}>Edit</button>
                <button onClick={() => deleteItem(index)}>Delete</button>
              </>
            )}
          </p>
        ))}
      </div>
    </>
  );
}
