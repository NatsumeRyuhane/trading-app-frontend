import { Button, Input, Layout } from "antd";
import React from "react";
import ItemsDisplay from "./ItemsDisplay";
import { SearchOutlined } from "@ant-design/icons";
import { Content } from "antd/lib/layout/layout";
import dummyItems from "./dummyItems";

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
      </Content>
      <ItemsDisplay pageName="myOrdered" items={dummyItems} />
    </Layout>
  );
}

export default MyOrderedItems;
