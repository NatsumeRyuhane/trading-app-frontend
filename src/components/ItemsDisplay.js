import { Button, Divider, Layout, Space, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import dummyItems from "./dummyItems";
import {
  rateSellerButton,
  editButton,
  reportButton,
  deleteButton,
} from "./Buttons";

function ItemsDisplay({ pageName }) {
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setItems(dummyItems);
    };
    fetchData();
  }, [items]);

  const itemsForTable = formatItemForTable(dummyItems);

  function formatItemForTable(items) {
    const table = items.map((item) => ({
      key: item.id,
      image: item.imgSrc,
      ItemName: item.title,
      status: item.status,
      category: item.category,
      description: item.description,
      price: item.price,
    }));
    return table;
  }
  const navigate = useNavigate();
  function handleCardClick(itemId) {
    navigate(`/item/${itemId}`);
  }

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      render: (imgSrc) => (
        <img
          alt={imgSrc}
          src={imgSrc}
          style={{
            width: "225px",
            height: "166px",
            objectFit: "cover",
            borderRadius: 10,
          }}
        />
      ),
    },
    {
      title: "Title",
      dataIndex: "ItemName",
      render: (ItemName) => (
        <div style={{ fontSize: 20, fontWeight: "bold" }}>{ItemName}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => <div style={{ fontWeight: 600 }}>{status}</div>,
    },
    {
      title: "Category",
      dataIndex: "category",
    },
    {
      title: "Description",
      dataIndex: "description",
      width: "30%",
    },
    {
      title: "Price",
      dataIndex: "price",
      render: (price) => (
        <div style={{ fontSize: 20, fontWeight: "bold" }}>${price}</div>
      ),
    },
    {
      title: "Action",
      dataIndex: "action",
      render: () => (
        <Space size="middle">
          {pageName === "trade" ? editButton : rateSellerButton}
          {pageName === "trade" ? deleteButton : reportButton}
        </Space>
      ),
    },
  ];
  return (
    <Layout
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "30px",
      }}
    >
      <div style={{ minWidth: "300px" }}>
        <Button className="buttonWithoutBorder" style={{ color: "#1479FB" }}>
          Select all Items
        </Button>
        <Button className="buttonWithoutBorder" style={{ color: "#d10000" }}>
          Delete all Items
        </Button>
      </div>
      <Divider style={{ marginTop: 0, minWidth: "1022px" }} />
      <Table
        columns={columns}
        dataSource={itemsForTable}
        onRow={(record) => {
          return {
            onClick: () => {
              handleCardClick(record.key);
            },
          };
        }}
      />
    </Layout>
  );
}

export default ItemsDisplay;
