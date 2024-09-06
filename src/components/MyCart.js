import { Button, Layout, message, Space, Table, Divider } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchCartItems, deleteCartItem } from "../utils"; // Import the ItemsDisplay component
import { DeleteOutlined } from "@ant-design/icons";
import { CartCheckoutButton, CheckoutButton, ClearCartButton } from "./Buttons";

const MyCart = () => {
  const [cartData, setCartData] = useState([]);
  const [checking, setChecking] = useState(false);
  const [itemsForTable, setItemsForTable] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const refetch = async () => {
    setLoading(true);
    try {
      const cartItemEntries = await fetchCartItems();
      setItemsForTable(formatItemForTable(cartItemEntries));
      setCartData(cartItemEntries.map((entry) => entry.item));
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  function handleRemoveCartItem(key) {
    setLoading(true);
    deleteCartItem(key)
      .then(() => refetch())
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  function formatItemForTable(items) {
    const table = items.map((item) => ({
      key: item.item.id,
      image: item.item.media_urls,
      ItemName: item.item.name,
      category: item.item.category.toLowerCase(),
      description: item.item.description,
      price: item.item.price,
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
      handleRemoveCartItem(key);
      setSelectedRowKeys([]);
    });
  }

  function clearCart() {
    const keys = itemsForTable.map((item) => item.key);
    console.log(itemsForTable);
    setItemsForTable([]);

    keys.forEach((key) => {
      handleRemoveCartItem(key);
    });
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
  ];

  return (
    <Layout style={{ margin: "0 60px" }}>
      <div className="h1">Shopping Cart ({cartData.length} Items)</div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <ClearCartButton onClearClick={() => clearCart()} />
      </div>

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
        />
      </Layout>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <CartCheckoutButton
          items={cartData}
          selectedRowKeys={selectedRowKeys}
          disabled={selectedRowKeys.length === 0}
        />
      </div>
    </Layout>
  );
};

export default MyCart;
