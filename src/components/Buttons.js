import React from "react";
import { Button, message } from "antd";
import { CloudUploadOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import {
  confirmTransaction,
  createTransaction,
  publishItem,
  addToCart,
} from "../utils";

export function RateSellerButton({ transactionId, setSelectedTransaction }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/rating", { state: { transactionId } });
  };

  return (
    <Button
      default
      style={{
        borderRadius: 20,
        backgroundColor: "#3a00e5",
        color: "white",
        width: 128,
        height: 38,
      }}
      onClick={handleClick}
    >
      Rate the seller
    </Button>
  );
}

export function PublishButton({ itemInfo, fetchData }) {
  return (
    <Button
      default
      style={{
        borderRadius: 20,
        border: "1.5px solid  #3a00e5",
        backgroundColor: "#3a00e5",
        color: "white",
        width: 90,
        height: 38,
        margin: 5,
      }}
      onClick={() => {
        try {
          publishItem(itemInfo.key);
          window.location.reload();
          // TODO: This message currently doesn't show because we refresh the page to reload items. Find better way to refresh items
          message.success("Item published! You can see it in the On Sale tab");
        } catch (error) {
          message.error(error.message);
        }
      }}
    >
      Publish
    </Button>
  );
}

export function ConfirmTradeButton({ transactionId }) {
  return (
    <Button
      default
      style={{
        borderRadius: 20,
        backgroundColor: "#3a00e5",
        color: "white",
        width: 128,
        height: 38,
      }}
      onClick={() => {
        try {
          confirmTransaction(transactionId);
          window.location.reload();
          message.success("Trade complete! Now give the seller a rating!");
        } catch (error) {
          message.error(error.message);
        }
      }}
    >
      Confirm Trade
    </Button>
  );
}

export function EditButton({ onEditClick }) {
  return (
    <Button
      onClick={onEditClick}
      style={{
        borderRadius: 20,
        backgroundColor: "white",
        fontWeight: "medium",
        width: 90,
        height: 38,
        margin: 5,
      }}
    >
      Edit
    </Button>
  );
}

export function ReportButton() {
  return (
    <Button
      type="text"
      style={{
        fontWeight: 400,
        fontSize: 14,
        width: 90,
        height: 38,
        margin: 5,
        color: "#D10000",
      }}
    >
      Report
    </Button>
  );
}

export function DeleteButton({ onDeleteClick }) {
  return (
    <Button
      onClick={onDeleteClick}
      style={{
        borderRadius: 20,
        border: "1.5px solid  #D10000",
        fontSize: 14,
        margin: 5,
        height: 38,
        width: 90,
        color: "#D10000",
      }}
    >
      Delete
    </Button>
  );
}

export function ClearCartButton({ onClearClick }) {
  return (
    <Button
      onClick={onClearClick}
      style={{
        borderRadius: 20,
        border: "1.5px solid  #D10000",
        fontSize: 14,
        margin: 5,
        height: 38,
        width: 90,
        color: "#D10000",
      }}
    >
      Clear Cart
    </Button>
  );
}

export function CancelButton() {
  return (
    <Button
      style={{
        borderRadius: 20,
        border: "1.5px solid  #D10000",
        fontSize: 14,
        margin: 5,
        height: 38,
        width: 90,
        color: "#D10000",
      }}
    >
      Cancel
    </Button>
  );
}

export const uploadButton = (
  <button style={{ border: 0, background: "none" }} type="button">
    <CloudUploadOutlined />
    <div style={{ marginTop: 8 }}>Upload</div>
  </button>
);

export const CheckoutButton = ({ item, isLoggedIn }) => {
  const navigate = useNavigate();

  const handleCheckout = async () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      try {
        await createTransaction(item);
        message.success("Order created!");
        navigate("/myOrdered");
      } catch (error) {
        message.error(error.message);
      }
    }
  };

  return (
    <Button
      type="primary"
      shape="round"
      size="large"
      style={{
        color: "white",
        background: "#3A00E5",
        justifyContent: "center",
        alignItems: "center",
        display: "inline-flex",
        fontSize: 18,
        fontFamily: "Arial",
        fontWeight: "550",
        letterSpacing: 0.2,
      }}
      onClick={handleCheckout}
    >
      Checkout
    </Button>
  );
};

export function AddToCartButton({ item, isLoggedIn }) {
  const navigate = useNavigate();

  const handleAddToCart = async () => {
    if (!isLoggedIn) {
      navigate("/login");
    } else {
      try {
        await addToCart(item);
        message.success("Order created!");
        navigate("/myCart");
      } catch (error) {
        message.error(error.message);
      }
    }
  };

  return (
    <Button
      type="default"
      shape="round"
      size="large"
      style={{
        display: "inline-flex",
        fontSize: 18,
        fontFamily: "Arial",
        fontWeight: "550",
        letterSpacing: 0.2,
        marginRight: 15,
        color: "#3A00E5",
        border: "2px solid #3A00E5",
      }}
      onClick={handleAddToCart}
    >
      Add to Cart
    </Button>
  );
}
