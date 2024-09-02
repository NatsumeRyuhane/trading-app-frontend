import {
  Button,
  Checkbox,
  Form,
  Input,
  InputNumber,
  message,
  Upload,
  Select,
  Radio,
  Space,
} from "antd";
import TextArea from "antd/lib/input/TextArea";
import React, { useState } from "react";
import { uploadItem } from "../utils";
import { useNavigate } from "react-router-dom";
import { uploadButton } from "./Buttons";

function UploadItems() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState([]);
  const [value, setValue] = useState(1);
  const [address, setAddress] = useState("");

  function CancelUploadItem() {
    navigate("/trade");
  }

  const handleUploadChange = (eventObj) => {
    setFileList(eventObj.fileList);
  };

  const onRadioChange = (e) => {
    setValue(e.target.value);
  };

  const handleRadioInput = (e) => {
    setAddress(e.target.value);
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("name", values.name);

    formData.append("category", values.category.toUpperCase());

    formData.append("price", values.price);
    formData.append("description", values.description);

    if (values.isAvailable === true) {
      formData.append("status", "AVAILABLE");
    } else {
      formData.append("status", "UNPUBLISHED");
    }

    if (!values.useDefaultAddress) {
      formData.append("address", address);
    } else {
      setAddress("");
      formData.append("address", "");
    }

    if (fileList.length > 5) {
      message.error("You can at most upload 5 pictures.");
      return;
    }

    for (let i = 0; i < fileList.length; i++) {
      formData.append("media", fileList[i].originFileObj);
    }

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
            name="useDefaultAddress"
            label="Pick Up Location"
            rules={[{ required: true }]}
          >
            <Radio.Group onChange={onRadioChange} value={value}>
              <Space direction="vertical">
                <Radio value={true}> Your Address</Radio>
                <Radio value={false}>
                  Use Another Address
                  {!value ? (
                    <Input
                      onChange={handleRadioInput}
                      style={{ marginTop: "20px", width: "100%" }}
                    />
                  ) : null}
                </Radio>
              </Space>
            </Radio.Group>
          </Form.Item>

          <Form.Item
            name="isAvailable"
            valuePropName="checked"
            stytle={{ width: 1000 }}
          >
            <Checkbox>List the product for sale once it is approved</Checkbox>
          </Form.Item>
          <div style={{ fontSize: 16, fontWeight: 500, color: "#7A7A7A" }}>
            Uncheck this mark if you do not want to sell it immediately.
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
