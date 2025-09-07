import React, { useState } from "react";
import ItemCard from "./components/ItemCard";

function App() {
  const [items, setItems] = useState([
    { id: 1, name: "Tomates", expiry: "2025-09-10" },
    { id: 2, name: "Pain", expiry: "2025-09-08" },
    { id: 3, name: "Lait", expiry: "2025-09-12" }
  ]);

  return (
    <div style={{ fontFamily: "Arial", padding: "20px" }}>
      <h1>🥕 FoodChain AI</h1>
      <p>Réduisons ensemble le gaspillage alimentaire 🚀</p>
      <div style={{ display: "grid", gap: "10px" }}>
        {items.map((item) => (
          <ItemCard key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default App;
