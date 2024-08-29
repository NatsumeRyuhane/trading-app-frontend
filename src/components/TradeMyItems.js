import React, { useState, useEffect } from "react";
import { Layout, Button } from "antd";
import ItemsDisplay from "./ItemsDisplay";
import { useNavigate } from "react-router-dom";
import dummyItems from "./dummyItems";

const { Content } = Layout;

function TradeMyItems() {
  const status = ["On Sale", "In Stock", "Traded"];
  const [items, setItems] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      setItems(dummyItems);
    };
    fetchData();
  }, []);

  function handleStatusFilter(status) {
    const filteredItemList = dummyItems.filter(
      (item) => item.status === status
    );
    setItems(filteredItemList);
  }

  return (
    <div>
      <Layout style={{ margin: "0 60px " }}>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <div className="h1">Trade My Items</div>
        </div>
        <Content>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
            }}
          >
            <ItemsSummary
              status={status}
              handleStatusFilter={handleStatusFilter}
              items={items}
            />
          </div>
          <div>
            <MyUploadedItems
              status={status}
              handleStatusFilter={handleStatusFilter}
              items={items}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

function ItemsSummary({ status, handleStatusFilter, items }) {
  const navigate = useNavigate();

  const handleSellNewItem = () => {
    navigate("/uploadItems");
  };
  return (
    <div
      style={{
        padding: "2% 5%",
        backgroundColor: "#3A00E524",
        borderRadius: "20px",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        width: "80%",
        minWidth: "250px",
        maxWidth: "1400px",
        marginBottom: "5%",
        flexDirection: "row",
        flexWrap: "wrap",
      }}
    >
      <div style={{ textAlign: "left", marginBottom: "20px" }}>
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>Hi, user123!</div>
        <div style={{ fontSize: "24px" }}>
          You have uploaded {items.length} Items for trade in the past!
        </div>
        <div style={{ fontSize: "16px" }}>
          2 Items Traded, 2 Items on Sale, 1 Items in Stock
        </div>
      </div>
      <Button
        type="primary"
        className="buttonBlue"
        style={{
          fontSize: "20px",
          width: "50%",
          maxWidth: "230px",
          minWidth: "200px",
          height: "auto",
        }}
        onClick={handleSellNewItem}
      >
        Sell a new Item!
      </Button>
    </div>
  );
}

function MyUploadedItems({ status, handleStatusFilter, items }) {
  return (
    <div>
      <div className="h1">My Uploaded Items(5)</div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginTop: 20,
          minWidth: "520px",
          flexDirection: "row",
          flexWrap: "wrap",
        }}
      >
        <div stytle={{ minWidth: "240px", display: "inline" }}>
          <Button
            className="buttonTab"
            onClick={() => handleStatusFilter(status[0])}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            {status[0]}
          </Button>
          <Button
            className="buttonTab"
            onClick={() => handleStatusFilter(status[1])}
            style={{ borderRadius: 0, borderLeft: 0, borderRight: 0 }}
          >
            {status[1]}
          </Button>
          <Button
            className="buttonTab"
            onClick={() => handleStatusFilter(status[2])}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            {status[2]}
          </Button>
        </div>
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
            Delete All
          </Button>
        </div>
      </div>
      <ItemsDisplay pageName="trade" items={items} />
    </div>
  );
}

export default TradeMyItems;
