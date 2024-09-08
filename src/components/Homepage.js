import React from "react";
import { Typography, Row, Col, Card } from "antd";
import { useNavigate } from "react-router-dom";
import "./Homepage.css";
import Deals from "./Deals";

const { Title } = Typography;

function Homepage({ isLoggedIn, onLogout }) {
  const navigate = useNavigate(); // Initialize useNavigate

  return (
    <div style={{ padding: "24px" }}>
      <Deals isLoggedIn={isLoggedIn} />

      {/* Categories Section */}
      <div style={{ marginTop: "48px" }}>
        <Title
          level={3}
          style={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: "24px",
          }}
        >
          Buy what you want
        </Title>
        <Row gutter={[16, 16]} justify="center">
          {/* Each Col should take up 8 spans (1/3 of 24) to fit three items per row */}
          <Col xs={24} sm={12} md={8}>
            <Card
              hoverable
              className="category-card"
              onClick={() => {
                navigate("/byCategory", { state: { category: "KITCHEN" } });
              }}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://www.loveandoliveoil.com/wp-content/uploads/2017/09/kitchen-essentialsH.jpg"
                alt="Kitchen Essentials"
                style={{
                  width: "70%",
                  height: "80%",
                  objectFit: "cover",
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
              onClick={() => {
                navigate("/byCategory", { state: { category: "FURNITURE" } });
              }}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://www.sleepcheapmattresses.com/wp-content/uploads/2023/02/Coaster-Bedroom-Furniture-1.jpeg"
                alt="Furniture"
                style={{
                  width: "58%",
                  height: "80%",
                  objectFit: "cover",
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
              onClick={() => {
                navigate("/byCategory", { state: { category: "ELECTRONICS" } });
              }}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://miro.medium.com/v2/resize:fit:1400/0*_blifjWSbYNhsLqY"
                alt="Electronics"
                style={{
                  width: "88%",
                  height: "100%",
                  objectFit: "cover",
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
              onClick={() => {
                navigate("/byCategory", {
                  state: { category: "LIGHTING" },
                });
              }}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://images.herzindagi.info/image/2018/Nov/lights-decor-wedding.jpg"
                alt="Lighting & Decor"
                style={{
                  width: "70%",
                  height: "100%",
                  objectFit: "cover",
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
              onClick={() => {
                navigate("/byCategory", { state: { category: "BEDDING" } });
              }}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://img.fruugo.com/product/1/30/716586301_max.jpg"
                alt="Bedding"
                style={{
                  width: "57%",
                  height: "60%",
                  objectFit: "cover",
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
              onClick={() => {
                navigate("/byCategory", {
                  state: { category: "ORGANIZING" },
                });
              }}
              style={{ textAlign: "center" }}
            >
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRd9iYQX7Nc3SGxqvBvsuz9FvOIDH4TdFDetA&s"
                alt="Home Organizing"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
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
