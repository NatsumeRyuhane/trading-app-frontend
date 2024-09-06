import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  LeftCircleFilled,
  RightCircleFilled,
  StarFilled,
  UserOutlined,
} from "@ant-design/icons";

import { fetchItemById, getUserRating } from "../utils";
import { Carousel, message, Image,Button } from "antd";
import { CheckoutButton , AddToCartButton } from "./Buttons";


function ItemInformation({ isLoggedIn }) {
  const { itemId } = useParams(); // Get the itemId from the URL
  const [item, setItem] = useState(null);
  const [ratingData, setRatingData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // Fetch item details based on itemId
  const loadData = async () => {
    setIsLoading(true);

    try {
      const fetchedItem = await fetchItemById(itemId);
      setItem(fetchedItem);
      setRatingData(await getUserRating(fetchedItem.owner.id));
    } catch (e) {
      message.error(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []); // Fetch item details when itemId changes

  // Display loading message while item data is being fetched
  if (!item || !ratingData) return <div>Loading...</div>;

  // rate the seller after "Rate this Seller" button is clicked
  function handleRateThisSeller(itemId) {}

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        padding: "0 80px",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "start",
        display: "inline-flex",
      }}
    >
      <div
        style={{
          alignSelf: "stretch",
          justifyContent: "flex-start",
          padding: "0 20px",
          gap: 120,
          display: "inline-flex",
        }}
      >
        {/* Left content Layout */}
        <div
          style={{
            width: 400,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 30,
            display: "inline-flex",
          }}
        >
          <Carousel
            style={{
              width: 400,
              height: 300,
              // objectFit: "cover",
            }}
            dots={true}
            arrows
            prevArrow={<LeftCircleFilled />}
            nextArrow={<RightCircleFilled />}
          >
            {item.media_urls.map((url, index) => (
              <div key={index}>
                <Image
                  src={url}
                  width="100%"
                  style={{
                    width: 400,
                    height: 300,
                    borderRadius: 20,
                    objectFit: "cover",
                  }}
                />
              </div>
            ))}
          </Carousel>
          <div
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              // gap: 20,
              display: "flex",
            }}
          >
            <div
              style={{
                height: 107,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 10,
                display: "flex",
              }}
            >
              <div
                style={{
                  display: "flex",
                  columnGap: "15px",
                  alignSelf: "stretch",
                  color: "black",
                  fontSize: 24,
                  fontFamily: "Inter",
                  fontWeight: "700",
                }}
              >
                <UserOutlined className="site-form-item-icon" />
                {item.owner.username}
              </div>

              <div
                style={{
                  justifyContent: "flex-start",
                  alignItems: "center",
                  gap: 10,
                  display: "inline-flex",
                }}
              >
                <StarFilled style={{ fontSize: 30, color: "#FFE100" }} />
                <div
                  style={{
                    color: "black",
                    fontSize: 32,
                    fontFamily: "Inter",
                    fontWeight: "600",
                  }}
                >
                  {ratingData.rating > 0
                    ? ratingData.rating.toFixed(1)
                    : "No ratings yet"}
                </div>

                <div
                  style={{
                    color: "#7A7A7A",
                    fontSize: 18,
                    fontFamily: "Inter",
                    fontWeight: "500",
                    letterSpacing: 0.16,
                  }}
                >
                  {ratingData.num_ratings > 0 &&
                    `(based on ${ratingData.num_ratings} ratings)`}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right content Layout */}
        <div
          style={{
            width: 600,
            flexDirection: "column",
            justifyContent: "flex-start",
            alignItems: "flex-start",
            gap: 30,
            display: "inline-flex",
          }}
        >
          <div
            style={{
              alignSelf: "stretch",
              color: "black",
              fontSize: 32,
              fontFamily: "Inter",
              fontWeight: "600",
              wordWrap: "break-word",
            }}
          >
            {item.title}
          </div>
          <div>
            <span
              style={{
                color: "black",
                fontSize: 20,
                fontFamily: "Inter",
                fontWeight: "400",
                letterSpacing: 0.2,
                wordWrap: "break-word",
              }}
            >
              Category:
            </span>
            <span
              style={{
                color: "#3a00e5",
                fontSize: 24,
                fontFamily: "Inter",
                fontWeight: "600",
              }}
            >
              "{item.category}"
            </span>
          </div>
          <div
            style={{
              color: "black",
              fontSize: 50,
              fontFamily: "Inter",
              fontWeight: "600",
              letterSpacing: 0.2,
              wordWrap: "break-word",
            }}
          >
            {item.name}
          </div>
          <div
            style={{
              width: 550,
              color: "black",
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: "400",
              letterSpacing: 0.2,
            }}
          >
            {item.description}
          </div>
          <div
            style={{
              alignSelf: "stretch",
              height: 0,
              border: "1px #B3B3B3 solid",
            }}
          ></div>
          <div
            style={{
              width: 364,
              color: "black",
              fontSize: 32,
              fontFamily: "Inter",
              fontWeight: "600",
            }}
          >
            ${item.price}
          </div>
          <div>
            <AddToCartButton item={item} isLoggedIn={isLoggedIn} />
            <CheckoutButton item={item} isLoggedIn={isLoggedIn} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemInformation;
