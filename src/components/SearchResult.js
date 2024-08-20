import React, { useState, useEffect } from "react";
import { Layout, List, Divider } from "antd";
import { ItemCard } from "./ItemCard";
import dummyItems from "./dummyItems"; // Import dummy items
// import fetchDataBaseOnSearch from "../utils"; // Placeholder for backend communication

const { Content, Sider } = Layout;

const SearchResult = () => {
  const [items, setItems] = useState([]); // State to store search results
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [filters, setFilters] = useState({}); // State to store filter options

  // Fetch search results and set state
  useEffect(() => {
    // Example: utils.getSearchResults(searchQuery).then(data => setItems(data));

    // calculate the number of items per row in list of search result based on the windowWidth
    const updateItemsPerRow = () => {
      setItemsPerRow(Math.floor((window.innerWidth - 220 - 48) / 260));
    };

    // initial calculation
    updateItemsPerRow();

    const fetchData = async () => {
      // Implement fetch logic here and update the items state
      setItems(dummyItems);
    };

    fetchData();

    // Add event listener for window resize
    // number of items per row is recalculated dynamically as the window size changes
    window.addEventListener("resize", updateItemsPerRow);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", updateItemsPerRow);
    };
  }, []); // Empty dependency array ensures this runs only on mount and unmount

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
          dataSource={items}
          renderItem={(item) => (
            <List.Item>
              <ItemCard
                key={item.id}
                itemId={item.id}
                layout="vertical" // Specify the layout here
                imgSrc={item.imgSrc}
                title={item.title}
                price={item.price}
                description={item.description}
              />
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};

export default SearchResult;
