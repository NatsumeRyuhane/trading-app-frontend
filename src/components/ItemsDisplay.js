import { Button, Divider, Layout, message, Space, Table } from "antd";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";
import {
  EditButton,
  DeleteButton,
  PublishButton,
  CancelButton,
  ConfirmTradeButton,
} from "./Buttons";
import { fetchItemById } from "../utils";

function ItemsDisplay({ items, handleDelete }) {
  const navigate = useNavigate();
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleMultipleDeletion = () => {
    setLoading(true);
    setSelectedRowKeys([]);
    setLoading(false);
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
      image: item.media_urls[0],
      ItemName: item.name,
      status: item.status,
      category: item.category,
      description: item.description,
      price: item.price,
    }));
    return table;
  }

  //TODO complete action buttons function
  function changeActionByStatus(record) {
    if (record.status === "On Sale") {
      return (
        <div>
          <EditButton onEditClick={() => handleEdit(record.key)} />
          <DeleteButton onDeleteClick={() => handleDelete(record.key)} />
        </div>
      );
    } else if (record.status === "In Stock") {
      return (
        <div>
          <PublishButton itemInfo={record} />
          <DeleteButton />
        </div>
      );
    } else if (record.status === "Ongoing Trade") {
      return (
        <div>
          <ConfirmTradeButton itemInfo={record} />
          <CancelButton />
        </div>
      );
    }
  }

  const handleEdit = async (key) => {
    try {
      //TODO:navigate to upload item page with old item data in form

      const itemData = await fetchItemById(key);
      navigate("/UpdateItems", { state: { itemData } });
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
      title: "Name",
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
          {/* {changeActionByStatus(record.status)} */}
          {changeActionByStatus(record.status, record)}
          {/* {pageName === "trade" ? (
            <EditButton
              onEditClick={(e) => {
                handleEdit(record.key);
              }}
            />
          ) : (
            RateSellerButton
          )} */}
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
          onClick={handleMultipleDeletion}
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
