import React from "react";
import { Button } from "antd";

export const rateSellerButton = (
  <Button
    default
    style={{
      borderRadius: 20,
      backgroundColor: "#3a00e5",
      color: "white",
      width: 128,
      height: 38,
    }}
  >
    Rate the seller
  </Button>
);
export const editButton = (
  <Button
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
export const reportButton = (
  <Button
    style={{
      border: "none",
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
export const deleteButton = (
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
    Delete
  </Button>
);
