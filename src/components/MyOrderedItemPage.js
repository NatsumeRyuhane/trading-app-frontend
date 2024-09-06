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
      <div className="h1">{`My Ordered (${orders.length})`}</div>
      <TransactionsDisplay pageName="myOrdered" orders={orders} />
    </Layout>
  );
}

export default MyOrderedItems;
