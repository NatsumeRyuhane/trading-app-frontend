import React, { useEffect, useState } from "react";
import { Button, Layout, message } from "antd";
import ItemsDisplay from "./ItemsDisplay";
import { useNavigate } from "react-router-dom";
import { fetchItemsOfCurrentUser, deleteItem, fetchItemById } from "../utils";
import Cookies from "js-cookie";

const { Content } = Layout;

function TradeMyItems() {
  const status = {
    onSale: "On Sale",
    inStock: "Unpublished",
    sold: "Sold",
    ongoingTrade: "Ongoing Trade",
  };

  const [items, setItems] = useState([]);
  const [allItems, setAllItems] = useState([]);
  const [onSaleItems, setOnSaleItems] = useState([]);
  const [inStockItems, setInStockItems] = useState([]);
  const [soldItems, setSoldItems] = useState([]);
  const [ongoingTradeItems, setOngoingTradeItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const refetch = async () => {
    setLoading(true);
    try {
      const curItems = await fetchItemsOfCurrentUser();
      formateStatusApiName(curItems);
      setAllItems(curItems);
      setOnSaleItems(filterItemStatus(curItems, status.onSale));
      setInStockItems(filterItemStatus(curItems, status.inStock));
      setSoldItems(filterItemStatus(curItems, status.sold));
      setOngoingTradeItems(filterItemStatus(curItems, status.ongoingTrade));
      setItems(curItems);
    } catch (error) {
      message.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    refetch();
  }, []);

  function formateStatusApiName(itemsFromBackend) {
    itemsFromBackend.map((item) => {
      if (item.status === "AVAILABLE") {
        item.status = "On Sale";
      } else if (item.status === "UNPUBLISHED") {
        item.status = "Unpublished";
      } else if (item.status === "ONGOING_TRADE") {
        item.status = "Ongoing Trade";
      } else if (item.status === "SOLD") {
        item.status = "Sold";
      }
    });
  }

  function filterItemStatus(items, status) {
    let filteredItems = [];
    if (!status) {
      filteredItems = allItems;
    } else {
      filteredItems = items.filter((item) => item.status === status);
    }
    return filteredItems;
  }

  function handleStatusClick(status) {
    setItems(filterItemStatus(allItems, status));
  }

  function handleDelete(key) {
    setLoading(true);
    deleteItem(key)
      .then(() => refetch())
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
  }

  const handleEdit = async (key) => {
    try {
      const itemData = await fetchItemById(key);
      navigate("/UpdateItems", { state: { itemData } });
    } catch (error) {
      message.error(error.message);
    } finally {
    }
    setLoading(false);
  };

  //TODO : finish multiple delete

  function handleMultipleDeletion(key) {
    setLoading(true);
    deleteItem(key)
      .then(() => refetch())
      .catch((error) => {
        message.error(error.message);
      })
      .finally(() => {
        setLoading(false);
      });
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
              soldItems={soldItems}
              ongoingTradeItems={ongoingTradeItems}
            />
          </div>
          <div>
            <MyUploadedItems
              status={status}
              handleStatusClick={handleStatusClick}
              handleDelete={handleDelete}
              handleEdit={handleEdit}
              setItems={setItems}
              items={items}
              allItems={allItems}
              refetch={refetch}
            />
          </div>
        </Content>
      </Layout>
    </div>
  );
}

function ItemsSummary({
  soldItems,
  onSaleItems,
  inStockItems,
  allItems,
  ongoingTradeItems,
}) {
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
        <div style={{ fontSize: "20px", fontWeight: "bold" }}>
          Hi, {Cookies.get("username")}!
        </div>
        <div style={{ fontSize: "24px" }}>
          You have uploaded {allItems.length} Items for trade in the past!
        </div>
        <div style={{ fontSize: "16px" }}>
          {onSaleItems.length} Items On Sale, {inStockItems.length} Items In
          Stock, {soldItems.length} Items Sold, {ongoingTradeItems.length} Items
          Ongoing Trade
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

function MyUploadedItems({
  status,
  handleStatusClick,
  setItems,
  items,
  allItems,
  handleDelete,
  handleEdit,
  refetch,
}) {
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
        <div style={{ minWidth: "240px" }}>
          <Button
            className="buttonTab"
            onClick={() => handleStatusClick()}
            style={{
              borderTopRightRadius: 0,
              borderBottomRightRadius: 0,
              borderRight: 0,
            }}
          >
            All
          </Button>
          <Button
            className="buttonTab"
            onClick={() => handleStatusClick(status.onSale)}
            style={{ borderRadius: 0 }}
          >
            On Sale
          </Button>
          <Button
            className="buttonTab"
            onClick={() => handleStatusClick(status.inStock)}
            style={{ borderRadius: 0, borderLeft: 0, borderRight: 0 }}
          >
            Unpublished
          </Button>
          <Button
            className="buttonTab"
            onClick={() => handleStatusClick(status.sold)}
            style={{ borderRadius: 0, borderRight: 0 }}
          >
            Sold
          </Button>
          <Button
            className="buttonTab"
            onClick={() => handleStatusClick(status.ongoingTrade)}
            style={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
          >
            Ongoing Trade
          </Button>
        </div>
      </div>
      <ItemsDisplay
        pageName="trade"
        items={items}
        status={status}
        handleDelete={handleDelete}
        handleEdit={handleEdit}
        refetch={refetch}
      />
    </div>
  );
}

export default TradeMyItems;
