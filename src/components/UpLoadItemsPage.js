import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
  Select,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState, useRef } from "react";
import { PlusOutlined } from "@ant-design/icons";

function UploadItems() {
  const [loading, setLoading] = useState(false);

  const fileInputRef = useRef(null);

  const handleSubmit = async (values) => {
    // console.log("hi");
    const formData = new FormData();
    const { files } = fileInputRef.current;

    if (files.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }
  };

  return (
    <div>
      <div
        className="h1"
        style={{
          display: "flex",
          justifyContent: "center",
          //   alignItems: "center",
        }}
      >
        Upload a new Item for trade!
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Form
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          name="uploadItem"
          style={{
            width: 600,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item
            name="item_name"
            label="Item Name"
            rules={[{ required: true }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="upload_product_image"
            label="Upload Product Image"
            rules={[{ required: true }]}
          >
            <div>
              <Upload action="/upload.do" listType="picture-card">
                <button
                  style={{ border: 0, background: "none" }}
                  type="file"
                  accept="image/png, image/jpeg"
                  ref={fileInputRef}
                  multiple={true}
                >
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
              <div>Max file size 10MB</div>
            </div>
          </Form.Item>
          <Form.Item
            name="choose_a_category"
            label="Chose a Category"
            rules={[{ required: true }]}
          >
            <Select>
              <Select.Option value="kitchen">Kitchen</Select.Option>
              <Select.Option value="furniture">Furniture</Select.Option>
              <Select.Option value="electronics">Electronics</Select.Option>
              <Select.Option value="lighting">Lighting</Select.Option>
              <Select.Option value="bedding">Bedding</Select.Option>
              <Select.Option value="organizing">Organizing</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="set_price"
            label="Set Price"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="add_prodect_description"
            label="Add Product Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <div>
            <Checkbox>List the product for sale once it is approved</Checkbox>
          </div>
          <Form.Item
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <Button>Upload Item</Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default UploadItems;
