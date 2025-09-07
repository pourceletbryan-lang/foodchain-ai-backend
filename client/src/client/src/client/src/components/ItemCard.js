import React from "react";

function ItemCard({ item }) {
  return (
    <div style={{
      border: "1px solid #ccc",
      padding: "10px",
      borderRadius: "8px",
      background: "#f9f9f9"
    }}>
      <h3>{item.name}</h3>
      <p>Expiration : {item.expiry}</p>
      <button style={{
        padding: "5px 10px",
        background: "green",
        color: "white",
        border: "none",
        borderRadius: "5px"
      }}>
        Réserver
      </button>
    </div>
  );
}

export default ItemCard;
