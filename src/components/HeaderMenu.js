import { Button, Layout, Menu } from "antd";
import { Link, useNavigate } from "react-router-dom";
import Search from "antd/lib/input/Search";
import { searchItems } from "../utils";
import {
  ShoppingCartOutlined,
  ShoppingOutlined,
  SwapOutlined,
} from "@ant-design/icons";
import Logout from "./Logout";
import React from "react";


const { Header } = Layout;

const HeaderMenu = ({
  isLoggedIn,
  selectedMenu,
  handleLogout,
  setSearchResults,
  setSearchQuery,
}) => {
  const navigate = useNavigate();

  return (
    <Header
      style={{
        position: "fixed", // Make the header fixed
        zIndex: 1, // Ensure it stays on top
        width: "100%", // Full width of the window
        backgroundColor: "#3a00e5",
        paddingLeft: 80,
        paddingRight: 80,
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ flex: 1, display: "flex", alignItems: "center" }}>
          <Menu
            mode="horizontal"
            selectedKeys={[selectedMenu]}
            style={{
              display: "flex",
              width: "100%",
              justifyContent: "space-between",
              alignItems: "center",
              backgroundColor: "#3a00e5",
              borderBottom: "none",
              color: "white",
            }}
          >
            <Menu.Item
              key={"home"} // FIXME
              style={{
                fontSize: "25px",
                marginLeft: 0,
                fontWeight: "700",
              }}
            >
              <Link
                to="/"
                style={{
                  color: "white", // menu item icon color, not button text color
                }}
              >
                Second-Hand Trading
              </Link>
            </Menu.Item>

            <Menu.Item key="search" style={{ color: "white" }}>
              <Search
                style={{ width: "100%", paddingTop: "16px" }}
                placeholder="Search..."
                allowClear
                onSearch={(query) => {
                  // Set query state with entered query so search results page can use it to search
                  setSearchQuery(query);

                  // Navigate to search page on search
                  navigate("/search");
                }}
              />
            </Menu.Item>

            {/*<Menu.Item key="buy" icon={<ShoppingOutlined />}>*/}
            {/*  <Link*/}
            {/*    to="/search"*/}
            {/*    style={{*/}
            {/*      color: "white",*/}
            {/*      font: "Arial",*/}
            {/*      fontSize: 16,*/}
            {/*      fontWeight: "500",*/}
            {/*    }}*/}
            {/*  >*/}
            {/*    Buy*/}
            {/*  </Link>*/}
            {/*</Menu.Item>*/}

            <Menu.Item key="trade" icon={<SwapOutlined />}>
              <Link
                to="/trade"
                style={{
                  color: "white",
                  font: "Arial",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                Trade My Items
              </Link>
            </Menu.Item>
            <Menu.Item key="myOrdered" icon={<ShoppingOutlined />}>
              <Link
                to="/myOrdered"
                style={{
                  color: "white",
                  font: "Arial",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                My Purchased
              </Link>
            </Menu.Item>
            <Menu.Item key="MyCart" icon={<ShoppingCartOutlined />}>
              <Link
                to="/MyCart"
                style={{
                  color: "white",
                  font: "Arial",
                  fontSize: 16,
                  fontWeight: "500",
                }}
              >
                MyCart
              </Link>
            </Menu.Item>

            {!isLoggedIn && (
              <Menu.Item key="loginAndRegister">
                <Button
                  className="loginButton"
                  style={{
                    backgroundColor: "#FFE100",
                    borderRadius: "10px",
                    color: "black",
                  }}
                >
                  <Link to="/login">Login / Register</Link>
                </Button>
              </Menu.Item>
            )}
            {isLoggedIn && (
              <Menu.Item key="logout">
                <Logout onLogout={handleLogout} />
              </Menu.Item>
            )}
          </Menu>
        </div>
      </div>
    </Header>
  );
};

export default HeaderMenu;
