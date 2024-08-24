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
import React, { useState } from "react";
import { PlusOutlined } from "@ant-design/icons";
import { uploadItem } from "../utils";
import { useNavigate } from "react-router-dom";

function UploadItems() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (values) => {
    console.log(values);
    const formData = new FormData();

    formData.append("name", values.name);
    formData.append("category", values.category);
    formData.append("price", values.price);
    formData.append("description", values.description);

    if (values.image.fileList.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }

    for (let i = 0; i < values.image.fileList.length; i++) {
      formData.append("images", values.image.fileList[i]);
    }

    setLoading(true);

    try {
      // await uploadItem(formData);
      navigate("/uploadSeccess");
      // for (const [key, value] of formData) {
      //   console.log(key, value);
      // }
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <div
        className="h1"
        style={{
          display: "flex",
          justifyContent: "center",
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
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          name="uploadItem"
          className="textBold"
          style={{
            width: 600,
          }}
          onFinish={handleSubmit}
        >
          <Form.Item name="name" label="Item Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item multiple={true} name="image" label="Upload Product Image">
            <Upload listType="picture-card" multiple={true}>
              <div style={{ marginTop: 8 }}>Upload</div>
            </Upload>
          </Form.Item>
          <div
            style={{
              fontSize: 14,
              fontWeight: 400,
              display: "flex",
              justifyContent: "center",
              marginBottom: 20,
            }}
          >
            Max file size 10MB.
          </div>
          <Form.Item
            name="category"
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
            name="price"
            label="Set Price"
            rules={[{ required: true }]}
          >
            <InputNumber />
          </Form.Item>
          <Form.Item
            name="description"
            label="Add Product Description"
            rules={[{ required: true }]}
          >
            <TextArea rows={4} />
          </Form.Item>
          <div>
            <Checkbox>List the product for sale once it is approved</Checkbox>
          </div>

          <div
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              marginTop: "30px",
            }}
          >
            <Button
              htmlType="submit"
              loading={loading}
              className="buttonBlue"
              style={{ fontSize: 20, fontWeight: 500, width: 196, height: 50 }}
            >
              Upload Item
            </Button>
            <Button
              danger
              style={{ marginLeft: 30, border: "none", fontSize: 20 }}
            >
              Cancel and Return
            </Button>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default UploadItems;
