


import { useState, useRef } from "react";

export default function Todo() {
  const inputRef = useRef();
  const [items, setItems] = useState([]);

  function addItem() {
    const value = inputRef.current.value;

    if (value.trim() === "") return; 

    setItems((prev) => [...prev, value]); 
    inputRef.current.value = ""; 
  }

  return (
    <>
      <input ref={inputRef} placeholder="Enter something..." />
      <button onClick={addItem}>Add</button>

      <div style={{ marginTop: "1rem" }}>
        {items.map((item, index) => (
          <p key={index}>{item}</p>
        ))}
      </div>
    </>
  );
}
