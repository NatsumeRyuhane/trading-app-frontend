import React, { useState, useEffect } from "react";
import { Layout, List, Divider, message } from "antd";
import { ItemCard } from "./ItemCard";
import { searchItems } from "../utils";

const { Content, Sider } = Layout;

const SearchResult = ({ query }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [filters, setFilters] = useState({}); // State to store filter options

  const loadItems = async () => {
    setIsLoading(true);

    try {
      const resp = await searchItems(query);
      setItems(resp);
    } catch (e) {
      message.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  // Fetch search results and set state
  useEffect(() => {
    // calculate the number of items per row in list of search result based on the windowWidth
    const updateItemsPerRow = () => {
      setItemsPerRow(Math.floor((window.innerWidth - 220 - 48) / 260));
    };

    // initial calculation
    updateItemsPerRow();

    // Add event listener for window resize
    // number of items per row is recalculated dynamically as the window size changes
    window.addEventListener("resize", updateItemsPerRow);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateItemsPerRow);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

  useEffect(() => {
    // Fetch search results
    if (query) {
      loadItems();
    } else {
      setItems([]);
    }
  }, [query]);

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    // Update search results based on filters
  };

  return (
    <Layout>
      {/* search result filter on the left, fixed when scrolling */}
      <Sider
        width={200}
        theme="light"
        style={{
          background: "#f0f2f5",
          position: "fixed",
          height: "60vh",
          overflow: "auto",
          borderRight: "1px solid #E0E0E0",
        }}
      >
        {/* Add filter options here */}
        <div>Filter Options</div>
        {/* Filters can be added here */}
      </Sider>

      {/* Vertical Divider Line separate Filter and Scrollable Search Result */}
      <Divider
        type="vertical"
        style={{
          //   marginTop: "114px",
          position: "fixed",
          left: "248px",
          height: "100vh",
          backgroundColor: "#E0E0E0",
          width: "1.5px",
        }}
      />

      <Content
        style={{ marginLeft: "220px", padding: "0 24px", minHeight: 280 }}
      >
        {/* responsive & scrollable List of Search Result */}
        <List
          grid={{
            gutter: "16px",
            // Calculate columns (#items per row in the list) based on window width
            column: itemsPerRow,
          }}
          loading={isLoading}
          dataSource={items}
          renderItem={(item) => {
            return (
              <List.Item>
                <ItemCard
                  key={item.id}
                  itemId={item.id}
                  layout="vertical" // Specify the layout here
                  imgSrc={item.imgSrc}
                  title={item.name}
                  price={item.price}
                  description={item.description}
                />
              </List.Item>
            );
          }}
        />
      </Content>
    </Layout>
  );
};

export default SearchResult;
