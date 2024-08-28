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
import { CloudUploadOutlined } from "@ant-design/icons";
import { uploadItem } from "../utils";
import { useNavigate } from "react-router-dom";

function UploadItems() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <CloudUploadOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  function CancelUploadItem() {
    navigate("/trade");
  }

  const handleUploadChange = (eventObj) => {
    setFileList(eventObj.fileList);
  };

  const handleSubmit = async (values) => {
    setLoading(true);

    const formData = new FormData();
    formData.append("name", values.name);

    //need to add category from backend APi request
    // formData.append("category", values.category);

    formData.append("price", values.price);
    formData.append("description", values.description);

    //need to discuss about status data 1,2,3... meaning
    formData.append("status", 1);
    // formData.append("isOnsale", values.isOnsale);

    //need to discuss about how to store image file ex: [image.name1, image.name2,... ] or [imagesrc1, imagesrc2,...]
    formData.append("media", []);

    //need to discuss about the need of type adress when upload item
    formData.append("address", "123");

    // if (values.image.fileList.length > 5) {
    //   message.error("You can at most upload 5 pictures.");
    //   return;
    // }

    // for (let i = 0; i < values.image.fileList.length; i++) {
    //   formData.append("images", values.image.fileList[i]);
    // }

    try {
      await uploadItem(formData);
      navigate("/uploadSeccess", { state: { values } });
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
          <Form.Item
            multiple={true}
            name="image"
            label="Upload Product Image"
            rules={[{ required: true }]}
          >
            <Upload
              listType="picture-card"
              multiple={true}
              onChange={handleUploadChange}
            >
              {fileList.length >= 5 ? null : uploadButton}
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
          <Form.Item
            name="isOnsale"
            valuePropName="checked"
            stytle={{ width: 1000 }}
          >
            <Checkbox>List the product for sale once it is approved</Checkbox>
          </Form.Item>

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
              onClick={CancelUploadItem}
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
