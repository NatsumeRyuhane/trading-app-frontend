import React from "react";
import { Typography, Row, Col, Button, Card } from "antd";
import ItemCard from "./ItemCard"; // For displaying item cards
import dummyItems from "./dummyItems"; // Import dummy item data
import Logout from "./Logout"; // Import the Logout component

const { Title } = Typography;

function Homepage({ isLoggedIn, onLogout }) {
  // Filter items by different categories
  const kitchenItems = dummyItems.filter((item) => item.category === "Kitchen");
  const furnitureItems = dummyItems.filter(
    (item) => item.category === "Furniture"
  );
  const beddingItems = dummyItems.filter((item) => item.category === "Bedding");
  const electronicsItems = dummyItems.filter(
    (item) => item.category === "Electronics"
  );

  return (
    <div style={{ padding: "24px" }}>
      {/* Promotion Section */}
      <div
        style={{
          marginBottom: "24px",
          textAlign: "center",
          padding: "24px",
          backgroundColor: "#f5f5f5",
          borderRadius: "8px",
        }}
      >
        <img
          src="https://via.placeholder.com/600x300"
          alt="Main Promo"
          style={{ maxWidth: "100%", marginBottom: "24px" }}
        />
        <Title level={2}>Limited Deal Offer!</Title>
        <p>
          Get started today and join our vibrant & diverse community who make
          shopping and selling simple, social, and sustainable!
        </p>
        {isLoggedIn && (
          <Button type="primary" size="large" style={{
            height: 40,
            padding: "10px 25px", // Top/bottom: 10px, left/right: 25px
            background: "#3A00E5",
            borderRadius: 20,
            justifyContent: "center",
            alignItems: "center", // Center text vertically
            display: "flex",
            color: "white",
            border: "none", 
          }}>
            Checkout
          </Button>
        )}
      </div>

      {/* Lightening Deal Section */}
      <div>
        <Row justify="space-between" align="middle">
          <Col>
            <Title level={3} style={{ margin: 0 }}>
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
          
        }}
        onClick={() => window.location.reload()}
      >
        Refresh
      </div>
    </Col>
        </Row>
        <Row gutter={[16, 16]}>
          {dummyItems.slice(0, 4).map((item) => (
            <Col span={6} key={item.id}>
              <Card hoverable>
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
        <Title level={3}>Buy what you want</Title>
        <Row gutter={[16, 16]}>
          <Col span={6}>
            <Title level={4}>Kitchen Essentials</Title>
            {kitchenItems.map((item) => (
              <Card hoverable style={{ marginBottom: "16px" }} key={item.id}>
                <ItemCard
                  layout="vertical"
                  itemId={item.id}
                  imgSrc={item.imgSrc}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  showCheckout={isLoggedIn} // Pass isLoggedIn to control Checkout button
                />
              </Card>
            ))}
          </Col>
          <Col span={6}>
            <Title level={4}>Furniture</Title>
            {furnitureItems.map((item) => (
              <Card hoverable style={{ marginBottom: "16px" }} key={item.id}>
                <ItemCard
                  layout="vertical"
                  itemId={item.id}
                  imgSrc={item.imgSrc}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  showCheckout={isLoggedIn} // Pass isLoggedIn to control Checkout button
                />
              </Card>
            ))}
          </Col>
          <Col span={6}>
            <Title level={4}>Bedding</Title>
            {beddingItems.map((item) => (
              <Card hoverable style={{ marginBottom: "16px" }} key={item.id}>
                <ItemCard
                  layout="vertical"
                  itemId={item.id}
                  imgSrc={item.imgSrc}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  showCheckout={isLoggedIn} // Pass isLoggedIn to control Checkout button
                />
              </Card>
            ))}
          </Col>
          <Col span={6}>
            <Title level={4}>Electronics</Title>
            {electronicsItems.map((item) => (
              <Card hoverable style={{ marginBottom: "16px" }} key={item.id}>
                <ItemCard
                  layout="vertical"
                  itemId={item.id}
                  imgSrc={item.imgSrc}
                  title={item.title}
                  price={item.price}
                  description={item.description}
                  showCheckout={isLoggedIn} // Pass isLoggedIn to control Checkout button
                />
              </Card>
            ))}
          </Col>
        </Row>
      </div>

      {/* Logout Button */}
      {isLoggedIn && (
        <div style={{
          height: 40,
          padding: "10px 25px", // Top/bottom: 10px, left/right: 25px
          background: "#3A00E5",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center", // Center text vertically
          display: "flex",
          color: "white",
          border: "none", 
        }}>
          <Logout onLogout={onLogout} />
        </div>
      )}
    </div>
  );
}

export default Homepage;
