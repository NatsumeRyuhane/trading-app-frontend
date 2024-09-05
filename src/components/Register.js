import { Button, Form, Input, message, Modal } from "antd";
import React from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { register } from "../utils";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const labelStyle = {
    layout: "vertical",
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  };

  const onFinish = (data) => {
    register(data)
      .then(() => {
        message.success("Successfully signed up");
        navigate("/login");
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
        }}
      >
        <div className="h1">Register to your Second-hand Trading Account</div>

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
          <Form
            name="normal_register"
            initialValues={{ remember: true }}
            onFinish={onFinish}
          >
            <Form.Item
              name="username"
              label="Username"
              {...labelStyle}
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
              name="password"
              label="Password"
              {...labelStyle}
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
            <Form.Item
              name="first_name"
              label="First Name"
              {...labelStyle}
              rules={[
                { required: true, message: "Please input your Firstname!" },
              ]}
            >
              <Input placeholder="Firstname" />
            </Form.Item>
            <Form.Item
              name="last_name"
              label="Last Name"
              {...labelStyle}
              rules={[
                { required: true, message: "Please input your Lastname!" },
              ]}
            >
              <Input placeholder="Lastname" />
            </Form.Item>
            <Form.Item
              name="address"
              label="Address"
              {...labelStyle}
              rules={[
                { required: true, message: "Please input your Address!" },
              ]}
            >
              <Input placeholder="Address" />
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
                Register
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}

export default Register;
