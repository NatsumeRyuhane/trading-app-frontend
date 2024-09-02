import React, {useEffect, useState} from "react";
import {Button, Layout} from "antd";
import ItemsDisplay from "./ItemsDisplay";
import {useNavigate} from "react-router-dom";
import {fetchItemsOfCurrentUser} from "../utils";
import Cookies from "js-cookie";

const { Content } = Layout;

function TradeMyItems() {
  const STATUS = ["AVAILABLE", "UNPUBLISHED", "SOLD"];
  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [onSaleItems, setOnSaleItems] = useState([]);
  const [inStockItems, setInStockItems] = useState([]);
  const [tradedItems, setTradedItems] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const curItems = await fetchItemsOfCurrentUser();
      setAllItems(curItems);
      setOnSaleItems(handleStatusFilter(STATUS[0]));
      setInStockItems(handleStatusFilter(STATUS[1]));
      setTradedItems(handleStatusFilter(STATUS[2]));
      setItems(allItems);
    };
    fetchData();
  }, []);

  function handleStatusFilter(status) {
    const filteredItems = allItems.filter((item) => item.status === status);
    setItems(filteredItems);
    return filteredItems;
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
              allItems={allItems}
              onSaleItems={onSaleItems}
              inStockItems={inStockItems}
              tradedItems={tradedItems}
            />
          </div>
          <div>
            <MyUploadedItems
              status={STATUS}
              handleStatusFilter={handleStatusFilter}
              setItems={setItems}
              items={items}
              allItems={allItems}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

function ItemsSummary({ tradedItems, onSaleItems, inStockItems, allItems }) {
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
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>Hi, {Cookies.get("username")}!</div>
        <div style={{ fontSize: "24px" }}>
          You have uploaded {allItems.length} Items for trade in the past!
        </div>
        <div style={{ fontSize: "16px" }}>
          {tradedItems.length} Items Traded, {onSaleItems.length} Items on Sale, {inStockItems.length} Items in Stock
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

function MyUploadedItems({ status, handleStatusFilter, setItems, items, allItems }) {
  return (
    <div>
      <div className="h1">My Uploaded Items ({allItems.length})</div>
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
        <div style={{ minWidth: "240px", display: "inline" }}>
          <Button
            className="buttonTab"
            onClick={() => setItems(allItems)}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            All
          </Button>
          <Button
            className="buttonTab"
            onClick={() => handleStatusFilter(status[0])}
            style={{ borderTopRightRadius: 0, borderBottomRightRadius: 0 }}
          >
            On Sale
          </Button>
          <Button
            className="buttonTab"
            onClick={() => handleStatusFilter(status[1])}
            style={{ borderRadius: 0, borderLeft: 0, borderRight: 0 }}
          >
            In Stock
          </Button>
          <Button
            className="buttonTab"
            onClick={() => handleStatusFilter(status[2])}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            Traded
          </Button>
        </div>
      </div>
      <ItemsDisplay pageName="trade" items={items} />
    </div>
  );
}

export default TradeMyItems;
