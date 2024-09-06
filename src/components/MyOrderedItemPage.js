import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import TransactionsDisplay from "./TransactionsDisplay";
import { fetchTransactionsAsBuyer } from "../utils";

function MyOrderedItems() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      const myOrders = await fetchTransactionsAsBuyer();
      setOrders(myOrders);
    };
    fetchOrders();
  }, []);

  return (
    <Layout style={{ margin: "0 60px" }}>
      <div className="h1">{`My Ordered Items (${orders.length})`}</div>
      {/*<Content*/}
      {/*  style={{*/}
      {/*    display: "flex",*/}
      {/*    justifyContent: "space-between",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  {// TODO: Implement search}*/}
      {/*  <Input*/}
      {/*    prefix={<SearchOutlined />}*/}
      {/*    placeholder="Search..."*/}
      {/*    // onPressEnter={onSearch}*/}
      {/*    style={{*/}
      {/*      maxWidth: 300,*/}
      {/*      minWidth: 240,*/}
      {/*      height: 40,*/}
      {/*      borderRadius: 10,*/}
      {/*      margin: 10,*/}
      {/*    }}*/}
      {/*  />*/}
      {/*</Content>*/}
      <TransactionsDisplay pageName="myOrdered" orders={orders} />
    </Layout>
  );
}

export default MyOrderedItems;
