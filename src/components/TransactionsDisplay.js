import { Button, Divider, Layout, Space, Table } from "antd";
import React, { useState } from "react";
import { RateSellerButton, ConfirmTradeButton, CancelButton } from "./Buttons";

function TransactionsDisplay({ pageName, orders }) {
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const itemsForTable = formatItemForTable(orders);

  function formatItemForTable(orders) {
    const table = orders.map((order) => ({
      key: order.id,
      image: order.item.media_urls ? order.item.media_urls[0] : null,
      itemName: order.item.name,
      status: order.status,
      sellerContact: order.seller.phone_number,
      price: order.item.price,
      rating: order.buyer_to_seller_rating,
    }));
    return table;
  }

  const formatStatus = (status) => {
    switch (status) {
      case "IN_PROGRESS":
        return "Trade in Progress";
      case "CONFIRMED":
        return "Trade Complete";
      case "CANCELED":
        return "Trade Canceled";
      default:
        return status;
    }
  };

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
      title: "Name",
      dataIndex: "itemName",
      width: "15%",
      render: (itemName) => (
        <div style={{ fontSize: 20, fontWeight: "bold" }}>{itemName}</div>
      ),
    },
    {
      title: "Status",
      dataIndex: "status",
      render: (status) => (
        <div style={{ fontWeight: 600 }}>{formatStatus(status)}</div>
      ),
    },
    {
      title: "Seller Contact",
      dataIndex: "sellerContact",
      width: "15%",
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
      render: (_, record) => (
        <Space size="middle">
          {record.status === "CONFIRMED" && !record.rating && (
            <RateSellerButton transactionId={record.key} />
          )}
          {record.status !== "CONFIRMED" && record.status !== "CANCELED" && (
            <div>
              <ConfirmTradeButton transactionId={record.key} />
              <CancelButton transactionId={record.key} />
            </div>
          )}
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
      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        <Button onClick={start} loading={loading}></Button>
      </div>
      <Divider style={{ margin: 0, minWidth: "1022px" }} />
      <Table columns={columns} dataSource={itemsForTable} />
    </Layout>
  );
}

export default TransactionsDisplay;
