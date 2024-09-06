import React, { useState, useEffect } from "react";
import {
  Layout,
  List,
  Divider,
  message,
  Card,
  Col,
  Row,
  Typography,
} from "antd";
import { ItemCard } from "./ItemCard";
import { searchItems } from "../utils";

const { Content, Sider } = Layout;
const { Title } = Typography;

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
      {/*<Sider*/}
      {/*  width={200}*/}
      {/*  theme="light"*/}
      {/*  style={{*/}
      {/*    background: "#f0f2f5",*/}
      {/*    position: "fixed",*/}
      {/*    height: "60vh",*/}
      {/*    overflow: "auto",*/}
      {/*    borderRight: "1px solid #E0E0E0",*/}
      {/*  }}*/}
      {/*>*/}
      {/*  /!* Add filter options here *!/*/}
      {/*  <div>Filter Options</div>*/}
      {/*  /!* Filters can be added here *!/*/}
      {/*</Sider>*/}

      {/* Vertical Divider Line separate Filter and Scrollable Search Result */}
      {/*<Divider*/}
      {/*  type="vertical"*/}
      {/*  style={{*/}
      {/*    //   marginTop: "114px",*/}
      {/*    position: "fixed",*/}
      {/*    left: "248px",*/}
      {/*    height: "100vh",*/}
      {/*    backgroundColor: "#E0E0E0",*/}
      {/*    width: "1.5px",*/}
      {/*  }}*/}
      {/*/>*/}

      <Content style={{ padding: "0 24px", minHeight: 280 }}>
        {/* responsive & scrollable List of Search Result */}
        {/*<List*/}
        {/*  grid={{*/}
        {/*    gutter: "16px",*/}
        {/*    // Calculate columns (#items per row in the list) based on window width*/}
        {/*    column: itemsPerRow,*/}
        {/*  }}*/}
        {/*  loading={isLoading}*/}
        {/*  dataSource={items}*/}
        {/*  renderItem={(item) => {*/}
        {/*    return (*/}
        {/*      <List.Item>*/}
        {/*        <Card hoverable className="card-hover-effect">*/}
        {/*          <ItemCard*/}
        {/*            layout="vertical" // Specify the layout here*/}
        {/*            item={item}*/}
        {/*          />*/}
        {/*        </Card>*/}
        {/*      </List.Item>*/}
        {/*    );*/}
        {/*  }}*/}
        {/*/>*/}
        <Row
          justify="space-between"
          align="middle"
          style={{ marginBottom: "16px" }}
        >
          <Col>
            <Title
              level={3}
              style={{ margin: 0, fontWeight: "bold", fontSize: "30px" }}
            >
              Search results for "{query}":
            </Title>
          </Col>
        </Row>
        <Row gutter={[16, 16]} style={{ paddingTop: "16px" }}>
          {items.map((item) => (
            <Col span={6} key={item.id}>
              <Card hoverable className="card-hover-effect">
                <ItemCard layout="vertical" item={item} />
              </Card>
            </Col>
          ))}
        </Row>
      </Content>
    </Layout>
  );
};

export default SearchResult;
