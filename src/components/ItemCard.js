import React from "react";
import { Button, Card, Row } from "antd";
import { Navigate, useNavigate } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";

export function ItemCard({
  layout,
  itemId,
  imgSrc,
  title,
  category,
  rating,
  price,
  distance,
  description,
}) {
  const navigate = useNavigate();

  // Reusable handler for navigation
  function handleCardClick(itemId) {
    navigate(`/item/${itemId}`);
  }

  // handle checkout to Stripe
  const handleCheckout = async () => {
    try {
      // Make an API call to your backend to create a Stripe checkout session
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          price: price,
          title: title,
        }),
      });
      const sessionId = await response.json();

      // Redirect to Stripe Checkout
      const stripe = window.Stripe("your-publishable-key"); // Replace with your Stripe publishable key
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        console.error("Error redirecting to Stripe Checkout:", error);
      }
    } catch (error) {
      console.error("Error creating checkout session:", error);
    }
  };

  // Function to create a vertical item card
  function createVerticalItemCard() {
    return (
      <Card
        hoverable
        style={{
          width: "273px",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "20px",
          display: "inline-flex",
          margin: "20px",
          cursor: "pointer", // Change cursor to indicate clickable area
        }}
        onClick={() => handleCardClick(itemId)}
      >
        <img
          style={{
            width: 225, // Fixed width
            height: 166, // Fixed height
            position: "relative",
            background: "linear-gradient(0deg, #E0E0E0 0%, #E0E0E0 100%)", // Empty image background
            objectFit: "cover", // Ensures the image covers the area without distortion
            borderRadius: 10, // Adds rounded corners
          }}
          src={imgSrc}
          alt={title}
        />

        <Row
          style={{
            color: "#3a00e5",
            marginTop: "5px",
            fontSize: 16,
            fontFamily: "Arial",
            fontWeight: "550",
          }}
        >
          @ {category}
        </Row>

        <div
          style={{
            alignSelf: "stretch",
            color: "black",
            fontSize: 24,
            fontFamily: "Arial",
            fontWeight: "bold",
          }}
        >
          {title}
        </div>

        <div>
          <Row>
            <StarFilled style={{ fontSize: 26, color: "#FFE100" }} />
            <div
              style={{
                marginLeft: "5px",
                color: "black",
                fontSize: 16,
                fontFamily: "Arial",
                fontWeight: "550",
              }}
            >
              {rating}
            </div>
          </Row>
        </div>

        <div
          style={{
            width: 225,
            color: "#7A7A7A",
            fontSize: 16,
            fontFamily: "Inter",
            fontWeight: "400",
            letterSpacing: 0.16,
          }}
        >
          {description}
        </div>

        <div
          style={{
            alignSelf: "stretch",
            color: "black",
            fontSize: 24,
            fontFamily: "Arial",
            fontWeight: "bold",
          }}
        >
          ${price}
        </div>

        <div style={{ marginBottom: "10px", width: 225 }}>
          <Row>
            <div
              style={{
                color: "#3a00e5",
                display: "flex",
                alignItems: "center",
                fontWeight: "normal",
              }}
            >
              Available for pickup within {distance} miles
            </div>
          </Row>
        </div>

        <div
          style={{
            // Checkout button style
            height: 40,
            padding: "10px 25px", // Top/bottom: 10px, left/right: 25px
            background: "#3A00E5",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center", // Center text vertically
            display: "flex",
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating to parent div
            // Dummy code for redirecting to Stripe payment page
            // window.location.href = 'https://your-stripe-payment-page-url.com';
          }}
        >
          <Button
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
              fontSize: 16,
              fontFamily: "Arial",
              fontWeight: "600",
            }}
            // connect to Stripe payment page related to this item
            // onClick={() => handleCheckout(itemId)}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    );
  }

  // Other functions for different layouts

  // Function to create a vertical item card
  function createHeroVerticalItemCard() {
    return (
      <Card
        hoverable
        style={{
          width: "308px",
          height: "100%",
          flexDirection: "column",
          justifyContent: "flex-start",
          alignItems: "flex-start",
          gap: "20px",
          display: "inline-flex",
          margin: "20px",
          cursor: "pointer", // Change cursor to indicate clickable area
        }}
        onClick={() => handleCardClick(itemId)}
      >
        <img
          style={{
            width: 260, // Fixed width
            height: 200, // Fixed height
            position: "relative",
            background: "linear-gradient(0deg, #E0E0E0 0%, #E0E0E0 100%)", // Empty image background
            objectFit: "cover", // Ensures the image covers the area without distortion
            borderRadius: 10, // Adds rounded corners
          }}
          src={imgSrc}
          alt={title}
        />

        <div
          style={{
            alignSelf: "stretch",
            color: "black",
            fontSize: 24,
            fontFamily: "Arial",
            fontWeight: "bold",
          }}
        >
          {title}
        </div>

        <div
          style={{
            width: 260,
            color: "#7A7A7A",
            fontSize: 16,
            fontFamily: "Inter",
            fontWeight: "400",
            letterSpacing: 0.16,
          }}
        >
          {description}
        </div>

        <div
          style={{
            alignSelf: "stretch",
            color: "black",
            fontSize: 24,
            fontFamily: "Arial",
            fontWeight: "bold",
          }}
        >
          ${price}
        </div>

        <div
          style={{
            // Checkout button style
            height: 40,
            padding: "10px 25px", // Top/bottom: 10px, left/right: 25px
            background: "#3A00E5",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center", // Center text vertically
            display: "flex",
          }}
          onClick={(e) => {
            e.stopPropagation(); // Prevent click from propagating to parent div
            // Dummy code for redirecting to Stripe payment page
            // window.location.href = 'https://your-stripe-payment-page-url.com';
          }}
        >
          <Button
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
            // connect to Stripe payment page related to this item
            // onClick={() => handleCheckout(itemId)}
          >
            Add to Cart
          </Button>
        </div>
      </Card>
    );
  }

  // function createHorizontalItemCard() {}

  // Conditional rendering based on layout
  if (layout === "vertical") {
    return createVerticalItemCard();
  }
  if (layout === "heroVertical") {
    return createHeroVerticalItemCard();
  }
}

export default ItemCard;
