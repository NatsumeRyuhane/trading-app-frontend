import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { fetchItemsByCategory } from "../utils";
import { Card, Col, message, Row, Typography } from "antd";
import ItemCard from "./ItemCard"; // Update the path as necessary

const { Title } = Typography;

const ItemDisplayByCategory = () => {
  const location = useLocation();
  const CATEGORY = location.state.category;
  const [items, setItems] = useState([]);

  const fetchData = async () => {
    try {
      const categoryItems = await fetchItemsByCategory(CATEGORY);
      setItems(categoryItems);
    } catch (error) {
      message.error(error.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
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
            {CATEGORY}
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
    </div>
  );
};

export default ItemDisplayByCategory;
