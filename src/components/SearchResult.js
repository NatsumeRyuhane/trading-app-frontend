import React, { useState, useEffect } from "react";
import {
  Layout,
  List,
  Divider,
  Slider,
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
  const [filteredItems, setFilteredItems] = useState([]);
  const [minMaxPrices, setminMaxPrices] = useState([0, 1000]); // storing the min and max prices of the search result
  const [itemsPerRow, setItemsPerRow] = useState(4);
  const [filters, setFilters] = useState({
    price: minMaxPrices,
    rating: 0, // min rating
    distance: "any distance", // pickup distance
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
      setItems(dummyItems);
      setFilteredItems(dummyItems);

      const prices = dummyItems.map((item) => item.price);
      const minPrice = Math.min(...prices);
      const maxPrice = Math.max(...prices);
      setminMaxPrices([minPrice, maxPrice]);

      // Update the filters state with the calculated min and max price
      setFilters((prevFilters) => ({
        ...prevFilters,
        price: [minPrice, maxPrice],
      }));

      // try {
      //   const searchParams = ""; // You may replace this with actual search query parameters

      //   const data = await searchItems(searchParams);

      //   setItems(data); // Update items state with the search results
      // } catch (error) {
      //   console.error("Failed to fetch search results:", error);
      // }
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

    const getfilteredItems = items.filter((item) => {
      return (
        item.price >= filters.price[0] &&
        item.price <= filters.price[1] &&
        item.rating >= filters.rating &&
        (filters.distance === "any distance" ||
          (filters.distance === "within 5 miles" && item.distance <= 5) ||
          (filters.distance === "within 10 miles" && item.distance <= 10) ||
          (filters.distance === "within 20 miles" && item.distance <= 20) ||
          (filters.distance === "within 30 miles" && item.distance <= 30))
      );
    });

    setFilteredItems(getfilteredItems);
  };

  const menu = (
    <Menu
      onClick={({ key }) => handleFilterChange({ distance: key })}
      items={[
        { key: "within 5 miles", label: "Within 5 Miles" },
        { key: "within 10 miles", label: "Within 10 Miles" },
        { key: "within 20 miles", label: "Within 20 Miles" },
        { key: "within 30 miles", label: "Within 30 Miles" },
        { key: "any distance", label: "Any Distance" },
      ]}
    />
  );

  return (
    <Layout>
      {/* search result filter on the left, fixed when scrolling */}
      <Sider
        width={200}
        style={{
          background: "transparent",
          position: "fixed",
          height: "60vh",
          overflow: "hidden", //disable scrolling
        }}
      >
        {/* Add filter options here */}
        <div
          style={{
            alignSelf: "stretch",
            color: "black",
            fontSize: 24,
            fontFamily: "Arial",
            fontWeight: "bold",
            marginBottom: "20px",
          }}
        >
          Filter Results
        </div>

        <div
          style={{
            alignSelf: "stretch",
            color: "black",
            fontSize: 20,
            fontFamily: "Arial",
            fontWeight: "normal",
            marginBottom: "10px",
          }}
        >
          <div>Price</div>

          <Slider
            style={{ width: "85%", marginLeft: "8px" }} // Set slider width to be slightly less than sider to avoid overflow
            trackStyle={[{ backgroundColor: "#3A00E5" }]} // Color of the selected range
            handleStyle={[
              { borderColor: "#3A00E5", backgroundColor: "#3A00E5" }, // Color of the handles
              { borderColor: "#3A00E5", backgroundColor: "#3A00E5" }, // Second handle (for range slider)
            ]}
            range={{
              draggableTrack: true,
            }}
            defaultValue={filters.price}
            min={minMaxPrices[0]}
            max={minMaxPrices[1]}
            onChange={(value) => handleFilterChange({ price: value })}
          />
        </div>

        <div>
          <div
            style={{
              alignSelf: "stretch",
              color: "black",
              fontSize: 20,
              fontFamily: "Arial",
              fontWeight: "normal",
              marginTop: "30px",
            }}
          >
            Seller's Rating
          </div>

          <Rate
            style={{
              fontSize: "26px", // star size
            }}
            value={filters.rating}
            onChange={(value) => handleFilterChange({ rating: value })}
          />
        </div>

        <div>
          <div
            style={{
              alignSelf: "stretch",
              color: "black",
              fontSize: 20,
              fontFamily: "Arial",
              fontWeight: "normal",
              marginTop: "30px",
            }}
          >
            Pickup Distance
          </div>

          <Dropdown overlay={menu}>
            <Button>
              {filters.distance.charAt(0).toUpperCase() +
                filters.distance.slice(1)}
            </Button>
          </Dropdown>
        </div>

        <Button
          type="primary"
          onClick={applyFilters}
          style={{
            marginTop: "60px",
            height: 40,
            padding: "22px 30px", // Top/bottom: 10px, left/right: 25px
            background: "#3A00E5",
            borderRadius: 30,
            justifyContent: "center",
            alignItems: "center", // Center text vertically
            display: "flex",
            color: "white",
            fontSize: 16,
            fontFamily: "Arial",
            fontWeight: "600",
            border: "none",
          }}
        >
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
          dataSource={filteredItems}
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
                rating={item.rating}
                distance={item.distance}
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
