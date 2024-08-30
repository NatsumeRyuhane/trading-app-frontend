import React, { useState, useEffect } from "react";
import {
  Layout,
  List,
  Divider,
  Slider,
  InputNumber,
  Row,
  Col,
  Rate,
  Dropdown,
  Button,
  Menu,
} from "antd";
import { ItemCard } from "./ItemCard";
import dummyItems from "./dummyItems"; // Import dummy items
import { searchItems } from "../utils"; // APIs from backend

const { Content, Sider } = Layout;

const SearchResult = () => {
  const [items, setItems] = useState([]); // State to store search results
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [filters, setFilters] = useState({
    price: [0, 1000],
    distance: 0,
    rating: 0,
    uploadTime: "all time",
  }); // State to store filter options

  // Fetch search results and set state
  useEffect(() => {
    // calculate the number of items per row in list of search result based on the windowWidth
    const updateItemsPerRow = () => {
      // console.log("This is a message" + window.innerWidth);
      setItemsPerRow(
        Math.floor((window.innerWidth - 48 * 3 - 220) / (273 + 10))
      );
    };

    // Initial calculation
    updateItemsPerRow();

    const fetchData = async () => {
      // setItems(dummyItems);

      try {
        const searchParams = ""; // You may replace this with actual search query parameters

        const data = await searchItems(searchParams);

        setItems(data); // Update items state with the search results
      } catch (error) {
        console.error("Failed to fetch search results:", error);
      }
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
    setFilters((prevFilters) => ({
      ...prevFilters,

      ...newFilters,
    }));
  };

  const applyFilters = () => {
    // Implement the filtering logic based on the filters state

    const filteredItems = items.filter((item) => {
      return (
        item.price >= filters.price[0] &&
        item.price <= filters.price[1] &&
        item.distance <= filters.distance &&
        item.rating >= filters.rating &&
        (filters.uploadTime === "all time" ||
          (filters.uploadTime === "recently uploaded" &&
            item.uploadTime <= 1) ||
          (filters.uploadTime === "uploaded within the past month" &&
            item.uploadTime <= 30) ||
          (filters.uploadTime === "uploaded within the past 4 months" &&
            item.uploadTime <= 120))
      );
    });

    setItems(filteredItems);
  };

  const menu = (
    <Menu
      onClick={({ key }) => handleFilterChange({ uploadTime: key })}
      items={[
        { key: "recently uploaded", label: "Recently Uploaded" },

        {
          key: "uploaded within the past month",
          label: "Uploaded within the past month",
        },

        {
          key: "uploaded within the past 4 months",
          label: "Uploaded within the past 4 months",
        },

        { key: "all time", label: "All Time" },
      ]}
    />
  );

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
        <div>Filter Results</div>

        <div>
          <div>Price</div>

          <Slider
            range={{
              draggableTrack: true,
            }}
            defaultValue={filters.price}
            min={0}
            max={1000}
            onChange={(value) => handleFilterChange({ price: value })}
          />
        </div>

        <div>
          <div>Pickup Distance</div>

          <Row>
            <Col span={12}>
              <Slider
                min={0}
                max={20}
                value={filters.distance}
                onChange={(value) => handleFilterChange({ distance: value })}
              />
            </Col>

            <Col span={4}>
              <InputNumber
                min={0}
                max={20}
                style={{ margin: "0 16px" }}
                value={filters.distance}
                onChange={(value) => handleFilterChange({ distance: value })}
              />
            </Col>

            <Col span={8}>miles</Col>
          </Row>
        </div>

        <div>
          <div>Seller's Rating</div>

          <Rate
            value={filters.rating}
            onChange={(value) => handleFilterChange({ rating: value })}
          />
        </div>

        <div>
          <div>Uploaded Time</div>

          <Dropdown overlay={menu}>
            <Button>
              {filters.uploadTime.charAt(0).toUpperCase() +
                filters.uploadTime.slice(1)}
            </Button>
          </Dropdown>
        </div>

        <Button type="primary" onClick={applyFilters}>
          Apply Filters
        </Button>
      </Sider>

      {/* Vertical Divider Line separate Filter and Scrollable Search Result */}
      <Divider
        type="vertical"
        style={{
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
            <List.Item
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }} // Ensure minimum width for each item
            >
              <ItemCard
                key={item.id}
                itemId={item.id}
                layout="vertical"
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
