import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Button, Layout, Menu, Typography } from "antd";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";

import {
  ShoppingCartOutlined,
  SwapOutlined,
  ShoppingOutlined,
  SearchOutlined,
} from "@ant-design/icons";
import Search from "antd/lib/input/Search";
import Login from "./components/Login";
import Logout from "./components/Logout";
import Homepage from "./components/Homepage";
import TradeMyItems from "./components/TradeMyItems";
import MyOrderedItems from "./components/MyOrderedItemPage";
import SearchResult from "./components/SearchResult";
import ItemInformation from "./components/ItemInformation";

const { Header, Content } = Layout;
const HOME_PAGE_STATE = "home";

function App() {
  const [selectedMenu, setSelectedMenu] = useState(HOME_PAGE_STATE);
  const [isLoggedIn, setIsLoggedIn] = useState(True); // set Login to True initially, easier for testing

  // Check session on initial load
  useEffect(() => {
    const session = Cookies.get("sessionToken");
    setIsLoggedIn(!!session);

    // Update selected menu based on the current path
    const path = window.location.pathname;

    if (path === "/") setSelectedMenu(HOME_PAGE_STATE);
    else if (path === "/buy") setSelectedMenu("buy");
    else if (path === "/myOrdered") setSelectedMenu("myOrdered");
    else if (path === "/trade") setSelectedMenu("trade");
    else if (path === "/login") setSelectedMenu("login");
  }, []);

  useEffect(() => {
    // Update selected menu when path changes

    const path = window.location.pathname;

    if (path === "/") setSelectedMenu(HOME_PAGE_STATE);
    else if (path === "/buy") setSelectedMenu("buy");
    else if (path === "/myOrdered") setSelectedMenu("myOrdered");
    else if (path === "/trade") setSelectedMenu("trade");
    else if (path === "/login") setSelectedMenu("login");
  }, [window.location.pathname]);

  const handleLoginSuccess = (sessionToken) => {
    Cookies.set("sessionToken", sessionToken);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    Cookies.remove("sessionToken");
    setIsLoggedIn(false);
  };

  const renderContent = () => {
    return (
      <Routes>
        <Route
          path="/"
          element={<Homepage isLoggedIn={isLoggedIn} onLogout={handleLogout} />}
        />
        <Route
          path="/login"
          element={<Login onSuccess={handleLoginSuccess} />}
        />
        <Route
          path="/trade"
          element={
            isLoggedIn ? (
              <TradeMyItems />
            ) : (
              <Login onSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route
          path="/myOrdered"
          element={
            isLoggedIn ? (
              <MyOrderedItems />
            ) : (
              <Login onSuccess={handleLoginSuccess} />
            )
          }
        />
        <Route path="/search" element={<SearchResult />} />
        <Route path="/item/:itemId" element={<ItemInformation />} />
      </Routes>
    );
  };

  return (
    <Router>
      <Layout>
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
                  key={HOME_PAGE_STATE}
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
                    onSearch={() => {
                      // Navigate to search page on search
                      window.location.href = "/search"; // Adjusted to direct navigation
                    }}
                  />
                </Menu.Item>

                <Menu.Item key="buy" icon={<ShoppingOutlined />}>
                  <Link
                    to="/search"
                    style={{
                      color: "white",
                      font: "Arial",
                      fontSize: 16,
                      fontWeight: "500",
                    }}
                  >
                    Buy
                  </Link>
                </Menu.Item>

                <Menu.Item key="myOrdered" icon={<ShoppingCartOutlined />}>
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

        <div
          style={{
            width: "100%",
            height: "50px", // Set the same height as the nav bar
            backgroundColor: "#FFE100",
            position: "fixed",
            top: "64px", // Below the header
            zIndex: 999, // Make sure the banner is below the header but above the content
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <span
            style={{
              color: "black",
              fontSize: "20px",
              fontFamily: "Inter",
              fontWeight: "600",
              letterSpacing: "0.20px",
            }}
          >
            Order Now and Save 30% off!
          </span>
        </div>

        <Layout style={{ padding: "24px", marginTop: "114px" }}>
          <Content
            className="site-layout-background"
            style={{
              padding: 24,
              margin: 0,
              height: "100vh - 114px",
            }}
          >
            {renderContent()}
          </Content>
        </Layout>
      </Layout>
    </Router> // End of Router
  );
}

export default App;
