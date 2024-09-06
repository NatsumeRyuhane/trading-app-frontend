import { Card, Col, message, Row, Typography } from "antd";
import ItemCard from "./ItemCard";
import React, { useEffect, useState } from "react";
import { getAllItems } from "../utils";
import Cookies from "js-cookie";

const { Title } = Typography;

const Deals = ({ isLoggedIn }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const loadItems = async () => {
    setIsLoading(true);
    const username = Cookies.get("username");

    try {
      const resp = await getAllItems();
      setItems(resp.filter((item) => item.owner.username !== username));
    } catch (e) {
      message.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
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
            Deals
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

export default Deals;
