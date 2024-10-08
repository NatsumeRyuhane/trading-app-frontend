import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Layout } from "antd";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";

import Login from "./components/Login";
import Homepage from "./components/Homepage";
import TradeMyItems from "./components/TradeMyItems";
import MyOrderedItems from "./components/MyOrderedItemPage";
import SearchResult from "./components/SearchResult";
import ItemInformation from "./components/ItemInformation";
import UploadItems from "./components/UpLoadItemsPage";
import UpdateItems from "./components/UpdateItemsPage";
import UploadSuccessPage from "./components/UploadSuccessPage";
import HeaderMenu from "./components/HeaderMenu";
import MyCart from "./components/MyCart";
import ItemDisplayByCategory from "./components/ItemDisplayByCategory";
import Register from "./components/Register";
import RateSellerPage from "./components/RateSellerPage";

const { Content } = Layout;
const HOME_PAGE_STATE = "home";

function App() {
  const [selectedMenu, setSelectedMenu] = useState(HOME_PAGE_STATE);
  const [isLoggedIn, setIsLoggedIn] = useState(true); // set Login to True initially, easier for testing
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  // Check session on initial load
  useEffect(() => {
    // Get session token from cookies to check login state
    const session = Cookies.get("sessionToken");
    setIsLoggedIn(!!session);

    // Update selected menu based on the current path
    // const path = window.location.pathname;
    //
    // if (path === "/") setSelectedMenu(HOME_PAGE_STATE);
    // else if (path === "/buy") setSelectedMenu("buy");
    // else if (path === "/myOrdered") setSelectedMenu("myOrdered");
    // else if (path === "/trade") setSelectedMenu("trade");
    // else if (path === "/login") setSelectedMenu("login");
  }, []);

  // useEffect(() => {
  //   // Update selected menu when path changes
  //
  //   const path = window.location.pathname;
  //
  //   if (path === "/") setSelectedMenu(HOME_PAGE_STATE);
  //   else if (path === "/buy") setSelectedMenu("buy");
  //   else if (path === "/myOrdered") setSelectedMenu("myOrdered");
  //   else if (path === "/trade") setSelectedMenu("trade");
  //   else if (path === "/login") setSelectedMenu("login");
  // }, [window.location.pathname]);

  const handleLoginSuccess = (sessionToken, username) => {
    Cookies.set("sessionToken", sessionToken);
    Cookies.set("username", username);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    Cookies.remove("sessionToken");
    Cookies.remove("username");
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
        <Route path="/trade" element={<TradeMyItems />} />
        <Route path="/orders" element={<MyOrderedItems />} />
        <Route
          path="/search"
          element={<SearchResult items={searchResults} query={searchQuery} />}
        />
        <Route
          path="/item/:itemId"
          element={<ItemInformation isLoggedIn={isLoggedIn} />}
        />
        <Route path="/uploadItems" element={<UploadItems />} />
        <Route path="/updateItems" element={<UpdateItems />} />
        <Route path="/uploadSeccess" element={<UploadSuccessPage />} />
        <Route path="/cart" element={<MyCart />} />
        <Route path="/byCategory" element={<ItemDisplayByCategory />} />
        <Route path="/register" element={<Register />} />
        <Route path="/rating" element={<RateSellerPage />} />
      </Routes>
    );
  };

  return (
    <Router>
      <Layout>
        <HeaderMenu
          selectedMenu={selectedMenu}
          isLoggedIn={isLoggedIn}
          handleLogout={handleLogout}
          setSearchResults={setSearchResults}
          setSearchQuery={setSearchQuery}
        />

        {/*<DiscountPromo />*/}

        <Layout style={{ padding: "24px", marginTop: "80px" }}>
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
