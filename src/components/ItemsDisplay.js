import { Button, Divider, List } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dummyItems from "./dummyItems";

function ItemsDisplay() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      setItems(dummyItems);
    };
    fetchData();
  }, []);

  return (
    <div>
      <div>
        <Button className="buttonWithoutBorder" style={{ color: "#1479FB" }}>
          Select all Items
        </Button>
        <Button className="buttonWithoutBorder" style={{ color: "#d10000" }}>
          Delete all Items
        </Button>
      </div>
      <Divider style={{ marginTop: 0 }} />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "20% 15% 9% 9% 20% 7% 20%",
          fontSize: "16px",
          fontWeight: 500,
          gap: "20px",
          marginBottom: "30px",
        }}
      >
        <div>Image</div>
        <div>Item Name</div>
        <div>Status</div>
        <div>Category</div>
        <div>Description</div>
        <div>Price</div>
        <div>Actions</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "30px" }}>
        <List
          dataSource={items}
          renderItem={(item) => (
            <ItemRow
              key={item.id}
              itemId={item.id}
              imgSrc={item.imgSrc}
              title={item.title}
              status={item.status}
              category={item.category}
              price={item.price}
              description={item.description}
            />
          )}
        />
      </div>
    </div>
  );
}

function ItemRow({
  itemId,
  imgSrc,
  title,
  status,
  category,
  price,
  description,
}) {
  const navigate = useNavigate();

  function handleCardClick(itemId) {
    navigate(`/item/${itemId}`);
  }

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "20% 15% 9% 9% 20% 7% 20%",
        alignItems: "center",
        fontSize: "16px",
        fontWeight: "bold",
        fontFamily: "Arial",
        height: 166,
        gap: "20px",
        marginBottom: "20px",
      }}
      onClick={() => handleCardClick(itemId)}
    >
      <img
        style={{
          width: "225px",
          height: "166px",
          cursor: "pointer",
        }}
        src={imgSrc}
        alt={title}
      />
      <div>{title}</div>
      <div>{status}</div>
      <div style={{ fontWeight: 400 }}>{category}</div>
      <div style={{ fontWeight: 400, fontFamily: "Inter" }}>{description}</div>
      <div>${price}</div>
      <div>
        <Button className="buttonSmall">Edit</Button>
        <Button
          danger
          style={{ borderRadius: 20, margin: 5, height: 38, width: 90 }}
        >
          Delete
        </Button>
      </div>
    </div>
  );
}

export default ItemsDisplay;
