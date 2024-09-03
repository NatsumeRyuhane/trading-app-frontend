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
  PublishButton,
  CancelButton,
} from "./Buttons";
import { fetchItemById } from "../utils";

function ItemsDisplay({ pageName, items }) {
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
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  const itemsForTable = formatItemForTable(items);
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

  // function handleCardClick(itemId) {
  //   navigate(`/item/${itemId}`);
  // }

  //TODO complete action buttons by status
  function changeActionByStatus(status) {
    if (status === "On Sale") {
      return (
        <div>
          {/* <EditButton /> */}
          <DeleteButton />
        </div>
      );
    } else if (status === "In Stock") {
      return (
        <div>
          <PublishButton />
          <DeleteButton />
        </div>
      );
    } else if (status === "Ongoing Trade") {
      return (
        <div>
          <CancelButton />
          <DeleteButton />
        </div>
      );
    }
  }

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
      render: (_, record) => (
        <Space size="middle">
          {changeActionByStatus(record.status)}

          {/* {pageName === "trade" ? (
            <EditButton
              onEditClick={(e) => {
                handleEdit(record.key);
              }}
            />
          ) : (
            RateSellerButton
          )} */}
          {/* {pageName === "trade" ? DeleteButton : ReportButton} */}
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

export default ItemsDisplay;
