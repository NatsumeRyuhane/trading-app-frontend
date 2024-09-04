import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchItemsByCategory } from "../utils"; // Update the path as necessary

const ItemDisplayByCategory = () => {
  const location = useLocation();
  const CATEGORY = location.state.category;
  const [items, setItems] = useState([]);

  useEffect(() => {
    console.log("Fetching items for category:", CATEGORY);
    fetchItemsByCategory(CATEGORY)
      .then((data) => {
        console.log("Fetched items:", data);
        setItems(data);
      })
      .catch((error) => console.error("Error fetching items:", error));
  }, [CATEGORY]);

  return (
    <div>
      <h2>{CATEGORY}</h2>
      {Array.isArray(items) && items.length > 0 ? (
        <ul>
          {items.map((item) => (
            <li key={item.id}>{item.name}</li>
          ))}
        </ul>
      ) : (
        <p>No items found for this category.</p>
      )}
    </div>
  );
};

export default ItemDisplayByCategory;
