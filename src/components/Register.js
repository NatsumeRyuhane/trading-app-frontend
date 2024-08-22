import { Button, Form, Input, message, Modal } from 'antd';
import React, { useState } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import { register } from '../utils';


function Register() {
  const [displayModal, setDisplayModal] = useState(false)


  const handleCancel = () => {
    setDisplayModal(false)
  }


  const signupOnClick = () => {
    setDisplayModal(true)
  }


  const onFinish = (data) => {
    register(data)
      .then(() => {
        setDisplayModal(false)
        message.success('Successfully signed up');
      }).catch((err) => {
        message.error(err.message);
      })
  }


  return (
    <>
      <Button shape="round" type="primary" onClick={signupOnClick} style={{
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
        Register</Button>
      <Modal
        title="Register"
        open={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <Form
          name="normal_register"
          initialValues={{ remember: true }}
          onFinish={onFinish}
          preserve={false}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: 'Please input your Username!' }]}
          >
            <Input prefix={<UserOutlined />} placeholder="Username" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: 'Please input your Password!' }]}
          >
            <Input.Password
              prefix={<LockOutlined />}
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item
            name="first_name"
            rules={[{ required: true, message: 'Please input your Firstname!' }]}
          >
            <Input
              placeholder="firstname"
            />
          </Form.Item>
          <Form.Item
            name="last_name"
            rules={[{ required: true, message: 'Please input your Lastname!' }]}
          >
            <Input
              placeholder="lastname"
            />
          </Form.Item>
          <Form.Item
            name="address"
            rules={[{ required: true, message: 'Please input your Address!' }]}
          >
            <Input
              placeholder="Address"
            />
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
              Register
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </>


  )
}


export default Register;
