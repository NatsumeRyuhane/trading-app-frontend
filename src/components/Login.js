import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { login } from "../utils";
import { useNavigate } from "react-router-dom";

function Login({ onSuccess }) {
  const navigate = useNavigate();

  const onFinish = (data) => {
    login(data)
      .then((resp) => {
        message.success(`Welcome back`);
        onSuccess(resp.token, resp.username);
        navigate("/");
      })
      .catch((err) => {
        message.error(err.message);
      });
  };

  const gotToRegister = () => {
    navigate("/register");
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div className="h1"> Login to your Second-hand Trading Account</div>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "40px",
            borderRadius: 20,
            backgroundColor: "#3A00E524",
            marginTop: 30,
          }}
        >
          <Form name="normal_login" onFinish={onFinish} preserve={false}>
            <Form.Item
              layout="vertical"
              label="Username"
              name="username"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please input your Username!" },
              ]}
            >
              <Input
                prefix={<UserOutlined />}
                placeholder="Username"
                style={{ borderRadius: "10px" }}
              />
            </Form.Item>
            <Form.Item
              layout="vertical"
              label="password"
              name="password"
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
              rules={[
                { required: true, message: "Please input your Password!" },
              ]}
            >
              <Input.Password
                prefix={<LockOutlined />}
                placeholder="Password"
                style={{ borderRadius: "10px" }}
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
                  marginTop: 20,
                }}
              >
                Login
              </Button>
            </Form.Item>
          </Form>
        </div>

        {/* register draft */}
        <div style={{ display: "flex", alignItems: "center", marginTop: 20 }}>
          <span style={{ marginRight: 10 }}>No account?</span>

          <Button
            shape="round"
            type="primary"
            onClick={gotToRegister}
            style={{
              height: 40,
              padding: "10px 25px",
              background: "#3A00E5",
              borderRadius: 20,
              justifyContent: "center",
              alignItems: "center",
              display: "flex",
              color: "white",
              border: "none",
            }}
          >
            Register
          </Button>
        </div>
      </div>
    </>
  );
}

export default Login;
