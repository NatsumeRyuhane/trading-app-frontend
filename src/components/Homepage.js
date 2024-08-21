import React from "react";
import { Layout, Row, Col, Typography } from "antd";
import ItemsDisplay from "./ItemsDisplay";
import MyOrderedItemPage from "./MyOrderedItemPage";
import TradeMyItems from "./TradeMyItems";
import Logout from "./Logout";

const { Content } = Layout;
const { Title } = Typography;

const Homepage = ({
  isLoggedIn,
  onLogout
}) => {
  return (
    <Layout>
      <Content
        style={{
          padding: 24,
          margin: 0,
          minHeight: "100vh",
          backgroundColor: "#f0f2f5",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "auto" }}>
          {/* Logout Button */}
          <Row style={{ padding: "20px 0", textAlign: "center" }}>
            <Col span={24}>
              <Logout onLogout={onLogout} />
            </Col>
          </Row>

          {/* User Dashboard Content */}
          <Row gutter={[16, 16]} style={{ padding: "20px 0" }}>
            <Col span={24}>
              <Title level={3}>Your Dashboard</Title>

              {/* Display Items */}
              <ItemsDisplay />

              {/* My Ordered Items */}
              <MyOrderedItemPage />

              {/* Trade My Items */}
              <TradeMyItems />
            </Col>
          </Row>
        </div>
      </Content>
    </Layout>
  );
};

export default Homepage;