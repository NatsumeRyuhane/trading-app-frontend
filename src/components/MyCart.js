import { Button, Layout, Typography, message } from "antd";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyItems from "./dummyItems"; // Import your dummy items
import ItemsDisplay from "./ItemsDisplay";
import { fetchCartItems } from "../utils"; // Import the ItemsDisplay component

const { Content } = Layout;
const { Text } = Typography;

const MyCart = () => {
  const [cartData, setCartData] = useState([]);
  const [checking, setChecking] = useState(false);
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

  // FIXME
  const onCheckOut = () => {
    setChecking(true);
    // Simulate checkout process
    setTimeout(() => {
      setChecking(false);
      setCartData([]); // Clear cart after checkout
      message.success("Successfully checked out");
    }, 1000);
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
      <ItemsDisplay items={cartData} handleDelete={() => {}} />

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
          loading={checking}
          disabled={cartData.length === 0}
        >
          Checkout
        </Button>
      </div>
    </Layout>
  );
};

export default MyCart;
