import { Button } from "antd";
import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function UploadSuccessPage() {
  const navigate = useNavigate();
  const location = useLocation();

  function handleGoBack() {
    navigate("/trade");
  }

  return (
    <div>
      <div
        style={{
          fontSize: 24,
          fontWeight: 700,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        Item successfully Uploaded!
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 30,
        }}
      >
        <img
          style={{
            width: "225px",
            height: "166px",
            borderRadius: 10,
          }}
          src={URL.createObjectURL(
            location.state.values.image.fileList[0].originFileObj
          )}
          alt={location.state.values.name}
        />
      </div>
      <div
        className="h1"
        style={{
          fontWeight: 400,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 20,
        }}
      >
        Once approved, you can find your item in
        <span style={{ fontWeight: 600 }}>Trade My Item</span> page.
      </div>
      <div
        style={{
          padding: "2% 5%",
          backgroundColor: "#3A00E524",
          borderRadius: "20px",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div style={{ fontSize: 16, fontweight: 500 }}>
          If you choose to not list your item for sale once approved, your item
          will be listed as “Status: In Stock” and won’t be visible to other
          users.
          <br />
          <br />
          To sell the item, edit the Item Status to “On Sale” in “Trade My Item”
          page.
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: 50,
        }}
      >
        Please wait for 5 business days for your items to be approved.
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Button
          className="buttonBlue"
          onClick={handleGoBack}
          style={{
            fontSize: 20,
            fontweight: 500,
            width: 326,
            height: 50,
          }}
        >
          Go back to Trade My Item
        </Button>
      </div>
    </div>
  );
}
