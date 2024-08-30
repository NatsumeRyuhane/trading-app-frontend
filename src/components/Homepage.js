import React from "react";
import {Typography, Row, Col, Card} from "antd";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Promotion from "./Promotion";
import LightningDeal from "./LightningDeal";

const { Title } = Typography;

function Homepage({ isLoggedIn, onLogout }) {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div style={{ padding: "24px" }}>
      {/* Promotion Section */}
      <Promotion isLoggedIn={isLoggedIn} />

      {/* Lightening Deal Section */}
      <LightningDeal isLoggedIn={isLoggedIn} />

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
