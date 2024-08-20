import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { StarFilled } from "@ant-design/icons";
import dummyItems from "./dummyItems";

function ItemInformation() {
  const { itemId } = useParams(); // Get the itemId from the URL
  const [item, setItem] = useState([]);

  useEffect(() => {
    // Fetch item details based on itemId
    const fetchItemDetails = async () => {
      try {
        // Replace with actual API call later
        // const response = await fetch(`/api/items/${itemId}`);
        // const data = await response.json();
        // setItem(data);

        // Simulate fetching item details based on itemId
        const foundItem = dummyItems.find(
          (item) => item.id === parseInt(itemId)
        );
        setItem(foundItem); // Set item to the found item
      } catch (error) {
        console.error("Error fetching item details:", error);
      }
    };

    fetchItemDetails();
  }, [itemId]); // Fetch item details when itemId changes

  // Display loading message while item data is being fetched
  if (!item) return <div>Loading...</div>;

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
          <img
            style={{
              width: 400,
              height: 300,
              borderRadius: 20,
              objectFit: "cover",
              background: "linear-gradient(0deg, #E0E0E0 0%, #E0E0E0 100%)",
            }}
            src={item.imgSrc || "https://via.placeholder.com/400x300"}
            alt={item.title}
          />
          <div
            style={{
              flexDirection: "column",
              justifyContent: "flex-start",
              alignItems: "flex-start",
              //   gap: 20,
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
                  alignSelf: "stretch",
                  color: "black",
                  fontSize: 24,
                  fontFamily: "Inter",
                  fontWeight: "700",
                }}
              >
                This Seller’s Rating:
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
                  {item.rating || "4.5"}
                </div>

                <div
                  style={{
                    alignSelf: "stretch",
                    color: "#7A7A7A",
                    fontSize: 18,
                    fontFamily: "Inter",
                    fontWeight: "500",
                    letterSpacing: 0.16,
                  }}
                >
                  (based on {item.ratingCount || "16"} ratings)
                </div>
              </div>
            </div>
            <div
              style={{
                alignSelf: "stretch",
                height: 96,
                flexDirection: "column",
                justifyContent: "flex-start",
                alignItems: "flex-start",
                gap: 10,
                display: "flex",
              }}
            >
              <div
                style={{
                  alignSelf: "stretch",
                  color: "black",
                  fontSize: 20,
                  fontFamily: "Inter",
                  fontWeight: "600",
                  letterSpacing: 0.16,
                }}
              >
                Share your rating with other customers
              </div>
              <div
                style={{
                  alignSelf: "stretch",
                  color: "#7A7A7A",
                  fontSize: 18,
                  fontFamily: "Inter",
                  fontWeight: "400",
                  letterSpacing: 0.16,
                  wordWrap: "break-word",
                }}
              >
                only purchased users can rate this seller
              </div>

              {/* Rate this Seller Button */}
              <div
                style={{
                  borderRadius: 30,
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  display: "inline-flex",
                }}
              >
                <div
                  style={{
                    padding: "12px 20px",
                    background: "#FFE100",
                    borderRadius: 30,
                    justifyContent: "center",
                  }}
                >
                  <div
                    style={{
                      color: "black",
                      fontSize: 16,
                      fontFamily: "Arial",
                      fontWeight: "600",
                      letterSpacing: 0.14,
                    }}
                    onClick={() => handleRateThisSeller(item.itemId)}
                  >
                    Rate this Seller
                  </div>
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
              fontSize: 20,
              fontFamily: "Inter",
              fontWeight: "600",
              letterSpacing: 0.2,
              wordWrap: "break-word",
            }}
          >
            Item Description:
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
          <div
            style={{
              width: 364,
              color: "#7A7A7A",
              fontSize: 18,
              fontFamily: "Inter",
              fontWeight: "400",
              letterSpacing: 0.16,
            }}
          >
            estimated tax to be collected: ${item.tax || "2.58"}
          </div>
          <div
            style={{
              padding: "10px 30px",
              background: "#3A00E5",
              borderRadius: 30,
              justifyContent: "center",
              alignItems: "center",
              display: "inline-flex",
            }}
          >
            <div
              style={{
                color: "white",
                fontSize: 20,
                fontFamily: "Arial",
                fontWeight: "550",
                letterSpacing: 0.2,
              }}
            >
              Checkout
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItemInformation;
