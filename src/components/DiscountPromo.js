import React from "react";

const DiscountPromo = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "50px", // Set the same height as the nav bar
        backgroundColor: "#FFE100",
        position: "fixed",
        top: "64px", // Below the header
        zIndex: 999, // Make sure the banner is below the header but above the content
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          color: "black",
          fontSize: "20px",
          fontFamily: "Inter",
          fontWeight: "600",
          letterSpacing: "0.20px",
        }}
      >
        Order Now and Save 30% off!
      </span>
    </div>
  );
};

export default DiscountPromo;
