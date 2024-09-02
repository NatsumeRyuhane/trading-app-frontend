import { Button, Form, Input, message, Modal } from "antd";
import React, { useState } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";
import Register from "./Register";
import { useNavigate } from "react-router-dom";

function Login({ onSuccess }) {
  const [displayModal, setDisplayModal] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const signinOnClick = () => {
    setDisplayModal(true);
  };

  const onFinish = (data) => {
    login(data)
      .then((resp) => {
        setDisplayModal(false);
        message.success(`Welcome back`);
        onSuccess(resp.token, resp.username);
        navigate("/");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
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
            marginBottom: 20, // Add some space between the button and the text below
          }}
        >
          Login
        </Button>

        {/* register draft */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <span style={{ marginRight: 10 }}>No account?</span>
          <Register />
        </div>
      </div>

      <Modal
        title="Log in"
        open={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
        bodyStyle={{ padding: 0 }} // Remove outer padding
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            padding: "20px",
            borderRadius: 20, // Add border radius here
            background: "#f0f2f5",
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: 400,
              padding: "20px",
              background: "#f0f2f5",
              borderRadius: 8,
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          >
            <h2 style={{ textAlign: "center", marginBottom: 20 }}>
              Login to your Second-hand Trading Account
            </h2>
            <Form name="normal_login" onFinish={onFinish} preserve={false}>
              <Form.Item
                name="username"
                rules={[
                  { required: true, message: "Please input your Username!" },
                ]}
              >
                <Input prefix={<UserOutlined />} placeholder="Username" />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  { required: true, message: "Please input your Password!" },
                ]}
              >
                <Input.Password
                  prefix={<LockOutlined />}
                  placeholder="Password"
                />
              </Form.Item>
              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  style={{
                    width: "100%",
                    height: 40,
                    background: "#3A00E5",
                    borderRadius: 20,
                    color: "white",
                    border: "none",
                    marginBottom: 10,
                  }}
                >
                  Login
                </Button>
              </Form.Item>
            </Form>
          </div>
        </div>
      </Modal>
    </>
  );
}

export default Login;
