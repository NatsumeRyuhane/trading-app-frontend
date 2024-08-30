import { Button, Layout, Typography, message } from "antd";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import dummyItems from "./dummyItems"; // Import your dummy items
import ItemsDisplay from "./ItemsDisplay"; // Import the ItemsDisplay component

const { Content } = Layout;
const { Text } = Typography;

const MyCart = () => {
  const [cartData, setCartData] = useState(dummyItems);
  const [checking, setChecking] = useState(false);
  const navigate = useNavigate();

  // Calculate total price and other costs dynamically
  const totalItemsPrice = cartData.reduce((total, item) => total + item.price, 0);
  const shippingAndHandling = 2.99; // Example static shipping cost
  const estimatedTax = totalItemsPrice * 0.09; // Example tax calculation
  const orderTotal = totalItemsPrice + shippingAndHandling + estimatedTax;

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
      <ItemsDisplay items={cartData} />

      <div
        style={{
          marginTop: "16px",
          padding: "20px",
          backgroundColor: "white",
          borderRadius: 8,
        }}
      >
        <div style={{ marginBottom: 16 }}>
          <p>Items Total: ${totalItemsPrice.toFixed(2)}</p>
          <p>Shipping & Handling: ${shippingAndHandling.toFixed(2)}</p>
          <p>Estimated Tax: ${estimatedTax.toFixed(2)}</p>
        </div>
        <Text strong={true} style={{ fontSize: 18 }}>{`Order Total: $${orderTotal.toFixed(2)}`}</Text>
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
