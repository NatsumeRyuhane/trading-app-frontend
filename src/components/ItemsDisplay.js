import { Button, Divider, Layout, Space, Table } from "antd";
import React, { useState } from "react";
import { DeleteOutlined } from "@ant-design/icons";

import {
  EditButton,
  DeleteButton,
  PublishButton,
  CancelButton,
  CancelOngoingTradeItemButton,
} from "./Buttons";
import { useNavigate } from "react-router-dom";

function ItemsDisplay({ items, handleDelete, handleEdit, refetch }) {
  const navigate = useNavigate();
  //table format setting
  const itemsForTable = formatItemForTable(items);

  function formatItemForTable(items) {
    const table = items.map((item) => ({
      key: item.id,
      image: item.media_urls[0],
      ItemName: item.name,
      status: item.status,
      category: item.category.toLowerCase(),
      description: item.description,
      price: item.price,
    }));
    return table;
  }

  //row selection
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const onSelectChange = (newSelectedRowKeys) => {
    setSelectedRowKeys(newSelectedRowKeys);
  };
  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };
  const hasSelected = selectedRowKeys.length > 0;

  function getMultipleToDelete() {
    selectedRowKeys.forEach((key) => {
      handleDelete(key);
      setSelectedRowKeys([]);
    });
  }

  // function handleCardClick(key) {
  //   navigate("/item/{key}");
  // }

  //TODO complete action buttons function
  function changeActionByStatus(record) {
    if (record.status === "On Sale") {
      return (
        <div>
          <EditButton onEditClick={() => handleEdit(record.key)} />
          <DeleteButton onDeleteClick={() => handleDelete(record.key)} />
        </div>
      );
    } else if (record.status === "Unpublished") {
      return (
        <div>
          <PublishButton itemInfo={record} />
          <EditButton onEditClick={() => handleEdit(record.key)} />
          <DeleteButton onDeleteClick={() => handleDelete(record.key)} />
        </div>
      );
    } else if (record.status === "Ongoing Trade") {
      return (
        <div>
          <CancelOngoingTradeItemButton itemId={record.key} refetch={refetch} />
        </div>
      );
    }
  }

  const columns = [
    {
      title: "Image",
      dataIndex: "image",
      width: "15%",
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
      width: "15%",
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
      width: "25%",
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
        <Space size="middle">{changeActionByStatus(record)}</Space>
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
          marginTop: 30,
        }}
      >
        {hasSelected ? `Selected ${selectedRowKeys.length} items` : null}
        <Button
          icon={<DeleteOutlined style={{ color: "#D10000" }} />}
          onClick={getMultipleToDelete}
          disabled={!hasSelected}
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
