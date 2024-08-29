import React from "react";
import { Typography, Row, Col, Button, Card } from "antd";
import { useNavigate } from "react-router-dom"; // Import useNavigate for programmatic navigation
import ItemCard from "./ItemCard"; // For displaying item cards
import dummyItems from "./dummyItems"; // Import dummy item data

import "./Homepage.css";

const { Title } = Typography;

function Homepage({ isLoggedIn, onLogout }) {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div style={{ padding: "24px" }}>
      {/* Promotion Section */}
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
        <Title level={2} style={{ color: "#3A00E5", fontWeight: "bold" }}>
          Limited Deal Offer!
        </Title>
        <p style={{ color: "#4a4a4a", fontSize: "16px", lineHeight: "1.5" }}>
          Get started today and join our vibrant & diverse community who make
          shopping and selling simple, social, and sustainable!
        </p>
        {isLoggedIn && (
          <div style={{ display: "flex", justifyContent: "center" }}>
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

      {/* Lightening Deal Section */}
      <div>
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "16px" }}
        >
          <Col>
            <Title
              level={3}
              style={{ margin: 0, fontWeight: "bold", fontSize: "24px" }}
            >
              Lightening Deal
            </Title>
          </Col>
          <Col>
            <div
              style={{
                height: 40,
                padding: "10px 25px", // Top/bottom: 10px, left/right: 25px
                background: "#3A00E5",
                borderRadius: 20,
                justifyContent: "center",
                alignItems: "center", // Center text vertically
                display: "flex",
                color: "white",
                cursor: "pointer",
              }}
              onClick={() => window.location.reload()}
            >
              Refresh
            </div>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ paddingTop: "16px" }}>
          {dummyItems.slice(0, 4).map((item) => (
            <Col span={6} key={item.id}>
              <Card hoverable className="card-hover-effect">
                <ItemCard
                  layout="vertical"
                  itemId={item.id}
                  imgSrc={item.imgSrc}
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  showCheckout={isLoggedIn} // Pass isLoggedIn to control Checkout button
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Categories Section */}
      <div style={{ marginTop: "48px" }}>
        <Title level={3} style={{ textAlign: "center", fontWeight: "bold" }}>
          Buy what you want
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {/* Each Col should take up 8 spans (1/3 of 24) to fit three items per row */}
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="category-card"
              onClick={() => navigate("/search?category=Kitchen Essentials")}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://placekitten.com/200/200" // Replace with your category image
                alt="Kitchen Essentials"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Title level={4} style={{ marginBottom: 0 }}>
                Kitchen Essentials
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="category-card"
              onClick={() => navigate("/search?category=Furniture")}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://placekitten.com/200/201" // Replace with your category image
                alt="Furniture"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Title level={4} style={{ marginBottom: 0 }}>
                Furniture
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="category-card"
              onClick={() => navigate("/search?category=Electronics")}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://placekitten.com/200/202" // Replace with your category image
                alt="Electronics"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Title level={4} style={{ marginBottom: 0 }}>
                Electronics
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="category-card"
              onClick={() => navigate("/search?category=Lighting & Decor")}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://placekitten.com/200/203" // Replace with your category image
                alt="Lighting & Decor"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Title level={4} style={{ marginBottom: 0 }}>
                Lighting & Decor
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="category-card"
              onClick={() => navigate("/search?category=Bedding")}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://placekitten.com/200/204" // Replace with your category image
                alt="Bedding"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Title level={4} style={{ marginBottom: 0 }}>
                Bedding
              </Title>
            </Card>
          </Col>
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="category-card"
              onClick={() => navigate("/search?category=Home Organizing")}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://placekitten.com/200/205" // Replace with your category image
                alt="Home Organizing"
                style={{
                  width: "100%",
                  borderRadius: "10px",
                  marginBottom: "8px",
                }}
              />
              <Title level={4} style={{ marginBottom: 0 }}>
                Home Organizing
              </Title>
            </Card>
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default Homepage;
