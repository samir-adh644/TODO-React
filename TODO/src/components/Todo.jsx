import "./Todo.css"
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
      <h1>TODO List</h1>
    <div className="Box">
      
    <input ref={inputRef} placeholder="Enter your task:"  id="taskInput"/>
      <button onClick={addItem} id="btnAdd">Add</button>

      <div style={{ marginTop: "1rem" }}>
        {items.map((item, index) => (
          <p key={index} id="dataDisp">
            {editingIndex === index ? (
              <>
                <input
                id="taskEdit"
                  value={editValue}
                  onChange={(e) => setEditValue(e.target.value)}
                />
                <button onClick={() => saveEdit(index)} id="btnSave">Save</button>
              </>
            ) : (
              <>
                {index+1}{") "}{item}{" "}
                <button onClick={() => startEditing(index)} id="btnEdit">Edit</button>
                <button onClick={() => deleteItem(index)} id="btnDelete">Delete</button>
              </>
            )}
          </p>
        ))}

    </div>
     
   </div>
    </>
  );
}
