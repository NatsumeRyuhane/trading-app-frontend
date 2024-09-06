import React, { useEffect, useState } from "react";
import { fetchTransactionById, rateSeller } from "../utils";
import { Button, Form, Input, message, Radio } from "antd";
import { LockOutlined, StarFilled, UserOutlined } from "@ant-design/icons";
import { useLocation, useNavigate } from "react-router-dom";

const RateSellerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [transaction, setTransaction] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [rating, setRating] = useState(null);
  const [hover, setHover] = useState(null);
  const [form] = Form.useForm();

  const loadTx = async () => {
    setIsLoading(true);

    try {
      setTransaction(await fetchTransactionById(location.state.transactionId));
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadTx();
  }, []);

  const displayRatingHints = (rating) => {
    switch (rating) {
      case 1:
        return "1 - Awful";
      case 2:
        return "2 - Not so good";
      case 3:
        return "3 - Okay";
      case 4:
        return "4 - Good";
      case 5:
        return "5 - Exceptional";
      default:
        return "Select your rating!";
    }
  };

  const onFinish = (data) => {
    try {
      rateSeller(transaction.id, data.rating);
      message.success("Thank you for your rating!");
      navigate("/myOrdered");
    } catch (e) {
      message.error(e.message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      {transaction && (
        <div className="h1">{`Rate your trading experience with ${transaction.seller.username}`}</div>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "40px",
          borderRadius: 20,
          backgroundColor: "#3A00E524",
          marginTop: 30,
        }}
      >
        <Form
          name="normal_login"
          onFinish={onFinish}
          preserve={false}
          style={{ alignItems: "center" }}
          form={form}
        >
          <Form.Item
            layout="vertical"
            name="rating"
            labelCol={{ span: 24 }}
            wrapperCol={{ span: 24 }}
            rules={[{ required: true, message: "Please give a rating!" }]}
          >
            <Radio.Group>
              {[...Array(5)].map((_, index) => {
                const curRating = index + 1;
                return (
                  <label>
                    <Radio
                      name="rating"
                      value={curRating}
                      onClick={() => {
                        setRating(curRating);
                        form.setFieldsValue({ rating: curRating });
                      }}
                      style={{ display: "none" }}
                    />
                    <StarFilled
                      className="star"
                      style={{
                        fontSize: "400%",
                        color:
                          curRating <= (hover || rating)
                            ? "#FFE100"
                            : "#fff6d4",
                      }}
                      onMouseEnter={() => setHover(curRating)}
                      onMouseLeave={() => setHover(null)}
                    />
                  </label>
                );
              })}
            </Radio.Group>
            <p
              style={{
                fontFamily: "Arial",
                fontWeight: "bold",
                fontSize: 18,
                marginTop: 18,
                textAlign: "center",
              }}
            >
              {displayRatingHints(rating)}
            </p>
          </Form.Item>
          <Form.Item>
            <Button
              type="primary"
              htmlType="submit"
              disabled={!rating}
              style={{
                width: "100%",
                height: 40,
                background: "#3A00E5",
                borderRadius: 20,
                color: "white",
                border: "none",
              }}
            >
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default RateSellerPage;
