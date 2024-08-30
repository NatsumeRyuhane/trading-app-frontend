import { Button, Typography } from "antd";
import React from "react";

const {Title} = Typography

const Promotion = ({ isLoggedIn }) => {
  return (
    <div
      style={{
        marginBottom: "24px",
        textAlign: "center",
        padding: "24px",
        backgroundColor: "#e0f7fa",
        borderRadius: "8px",
      }}
    >
      <img
        src="https://for-sale.used-secondhand.co.uk/media/used/secondhand/images/53206/wanted-9m-x-21m-lining-leg-extensions-stake-puller/1200/marquees-wanted-685.jpg"
        alt="Main Promo"
        style={{
          maxWidth: "45%",
          marginBottom: "24px",
          borderRadius: "10px",
        }}
      />
      <Title level={2} style={{color: "#3A00E5", fontWeight: "bold"}}>
        Limited Deal Offer!
      </Title>
      <p style={{color: "#4a4a4a", fontSize: "16px", lineHeight: "1.5"}}>
        Get started today and join our vibrant & diverse community who make
        shopping and selling simple, social, and sustainable!
      </p>
      {isLoggedIn && (
        <div style={{display: "flex", justifyContent: "center"}}>
          <Button
            type="primary"
            size="large"
            style={{
              height: 40,
              padding: "10px 25px", // Top/bottom: 10px, left/right: 25px
              background: "#3A00E5",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center", // Center text vertically
              display: "flex",
              color: "white",
              border: "none",
            }}
          >
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default Promotion;