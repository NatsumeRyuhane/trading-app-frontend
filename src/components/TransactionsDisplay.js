import { Button, Divider, Layout, message, Space, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import dummyItems from "./dummyItems";
import {
  RateSellerButton,
  EditButton,
  ReportButton,
  DeleteButton,
  ConfirmTradeButton,
  CancelButton,
} from "./Buttons";
import { fetchItemById } from "../utils";

function TransactionsDisplay({ pageName, orders }) {
  // const [items, setItems] = useState([]);
  // useEffect(() => {
  //   const fetchData = async () => {
  //     setItems(dummyItems);
  //   };
  //   fetchData();

  // }, [items]);

  const navigate = useNavigate();

  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const start = () => {
    setLoading(true);
    setTimeout(() => {
      setSelectedRowKeys([]);
      setLoading(false);
    }, 1000);
  };

  const onSelectChange = (newSelectedRowKeys) => {
    console.log("selectedRowKeys changed: ", newSelectedRowKeys);
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const itemsForTable = formatItemForTable(orders);

  function formatItemForTable(orders) {
    const table = orders.map((order) => ({
      key: order.id,
      image: order.item.media_urls ? order.item.media_urls[0] : null,
      itemName: order.item.name,
      status: order.status,
      sellerContact: order.seller.username, // TODO: Replace this field with seller contact
      price: order.item.price,
    }));
    return table;
  }

  // function handleCardClick(itemId) {
  //   navigate(`/item/${itemId}`);
  // }

  const handleEdit = async (key, e) => {
    try {
      console.log(key);
      //TODO:navigate to upload item page with old item data in form
      await fetchItemById(key);
      navigate("/uploadItems");
    } catch (error) {
      message.error(error.message);
    } finally {
    }
    setLoading(false);
  };

  const formatStatus = (status) => {
    switch (status) {
      case "PENDING":
        return "Pending Seller Confirmation";
      case "APPROVED":
        return "Seller Confirmed";
      case "CONFIRMED":
        return "Trade Complete";
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
          {record.status === "CONFIRMED" && <RateSellerButton />}
          {record.status !== "CONFIRMED" && (
            <div>
              <ConfirmTradeButton itemInfo={record} />
              <CancelButton />
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
      {/* maybe we don't need these two button? */}
      {/* <div style={{ minWidth: "300px" }}>
      <Button className="buttonWithoutBorder" style={{ color: "#1479FB" }}>
          Select all Items
        </Button>
        <Button className="buttonWithoutBorder" style={{ color: "#d10000" }}>
          Delete all Items
        </Button>
      </div> */}

      <div
        style={{
          display: "flex",
          justifyContent: "flex-start",
          alignItems: "center",
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        <Button
          icon={<DeleteOutlined style={{ color: "#D10000" }} />}
          onClick={start}
          disabled={!hasSelected}
          loading={loading}
          style={
            hasSelected
              ? { display: "initial", marginLeft: 10, border: "none" }
              : { display: "none" }
          }
        ></Button>
      </div>
      <Divider style={{ margin: 0, minWidth: "1022px" }} />
      <Table
        rowSelection={{
          type: "checkbox",
          ...rowSelection,
        }}
        columns={columns}
        dataSource={itemsForTable}

        //disscuss about if we need this function :click row to get item detail
        // onRow={(record) => {
        //   return {
        //     onClick: () => {
        //       handleCardClick(record.key);
        //     },
        //   };
        // }}
      />
    </Layout>
  );
}

export default TransactionsDisplay;
