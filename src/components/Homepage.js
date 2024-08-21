import React from "react";
import { Layout, Row, Col, Typography, Modal } from "antd";
import ItemsDisplay from "./ItemsDisplay";
import MyOrderedItemPage from "./MyOrderedItemPage";
import TradeMyItems from "./TradeMyItems";

const { Content } = Layout;
const { Title } = Typography;

const Homepage = ({
  isLoggedIn,
  onLogout,
  handleLogout,
  cancelLogout,
  showLogoutConfirm
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
              <button onClick={onLogout} style={{ color: "red", fontSize: "16px" }}>
                Log Out
              </button>
            </Col>
          </Row>

          {/* Logout Confirmation Modal */}
          <Modal
            title="Are you sure you want to log out?"
            visible={showLogoutConfirm}
            onOk={handleLogout}
            onCancel={cancelLogout}
            okText="Yes, log out"
            cancelText="No, stay logged in"
          >
            <p>If you log out, you will need to log in again to access your account.</p>
          </Modal>

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
