import { Button, Layout, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ItemsDisplay from "./ItemsDisplay";
import {
  createTransactionsForMultipleItems,
  deleteCartItems,
  fetchCartItems,
} from "../utils";

const { Content } = Layout;

const MyCart = () => {
  const [cartData, setCartData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const cartItemEntries = await fetchCartItems();
      setCartData(cartItemEntries.map((entry) => entry.item));
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const onCheckOut = () => {
    setIsLoading(true);

    const idsToCheckout = new Set(selectedRowKeys);
    try {
      createTransactionsForMultipleItems(
        cartData.filter((item) => idsToCheckout.has(item.id)),
      ).then(() => {
        deleteCartItems(selectedRowKeys);
        setSelectedRowKeys([]);
      });
      message.success("Orders created!").then(navigate("/myOrdered"));
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout style={{ margin: "0 60px" }}>
      <div className="h1">Shopping Cart ({cartData.length} Items)</div>
      <Content
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <div>
          <Button
            type="primary"
            className="buttonBlue"
            style={{ fontSize: 14, width: 130 }}
          >
            Edit Cart
          </Button>
          <Button
            danger
            style={{ fontSize: 14, width: 130, borderRadius: "10px" }}
            onClick={() => setCartData([])}
          >
            Clear Cart
          </Button>
        </div>
      </Content>

      {/* Use ItemsDisplay to show cart items */}
      <ItemsDisplay
        items={cartData}
        handleDelete={() => {}}
        selectedRowKeys={selectedRowKeys}
        setSelectedRowKeys={setSelectedRowKeys}
      />

      <div
        style={{
          marginTop: "16px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: 8,
        }}
      >
        <Button
          onClick={onCheckOut}
          type="primary"
          style={{ marginTop: 20, width: "100%" }}
          loading={isLoading}
          disabled={cartData.length === 0}
        >
          Checkout
        </Button>
      </div>
    </Layout>
  );
};

export default MyCart;
