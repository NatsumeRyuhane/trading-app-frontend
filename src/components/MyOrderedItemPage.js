import { Button, Input, Layout } from "antd";
import React from "react";
import ItemsDisplay from "./ItemsDisplay";
import { SearchOutlined } from "@ant-design/icons";
import { Content, Header } from "antd/lib/layout/layout";

function MyOrderedItems() {
  return (
    <Layout style={{ margin: "0 60px" }}>
      <div className="h1">My Ordered Items(5)</div>
      <Content
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Input
          prefix={<SearchOutlined />}
          placeholder="Search..."
          // onPressEnter={onSearch}
          style={{
            maxWidth: 300,
            minWidth: 240,
            height: 40,
            borderRadius: 10,
            margin: 10,
          }}
        />

        <div>
          <Button
            type="primary"
            className="buttonBlue"
            style={{ fontSize: 14, width: 130 }}
          >
            Edit All
          </Button>
          <Button
            danger
            style={{ fontSize: 14, width: 130, borderRadius: "10px" }}
          >
            Clear History
          </Button>
        </div>
      </Content>
      <ItemsDisplay />
    </Layout>
  );
}

export default MyOrderedItems;
