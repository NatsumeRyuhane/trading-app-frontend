import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";
import Register from "./Register";

function Login({ onSuccess }) {
  const [displayModal, setDisplayModal] = useState(false);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const signinOnClick = () => {
    setDisplayModal(true);
  };

  const onFinish = (data) => {
    login(data)
      .then(() => {
        setDisplayModal(false);
        message.success(`Welcome back`);
        onSuccess();
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      <Button
        shape="round"
        type="primary"
        onClick={signinOnClick}
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
        Login
      </Button>
      <Modal
        title="Log in"
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form name="normal_login" onFinish={onFinish} preserve={false}>
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input.Password prefix={<LockOutlined />} placeholder="Password" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType="submit" style={{
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
              Login
            </Button>
          </Form.Item>
        </Form>
      </Modal>

      {/* register draft */}
      <div>
        no accout? <Register />
      </div>
    </>
  );
}

export default Login;
