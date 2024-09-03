import { Button, Modal, message } from "antd";
import React, { useState } from "react";
import { logout } from "../utils";
import { useNavigate } from "react-router-dom";

function Logout({ onLogout }) {
  const [displayModal, setDisplayModal] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const logoutOnClick = () => {
    setDisplayModal(true);
  };

  const handleLogout = () => {
    message.success("You have been logged out");
    onLogout(); // Notify parent component about the logout
    setDisplayModal(false);

    if (window.location.pathname === "/") {
      window.location.reload(); // Reload if already on homepage when logging out
    } else {
      navigate("/"); // Go back to homepage after logout
    }
  };

  return (
    <>
      <Button
        className="loginButton"
        onClick={logoutOnClick}
        style={{
          height: 40,
          padding: "10px 25px", // Top/bottom: 10px, left/right: 25px
          background: "#3A00E5",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center", // Center text vertically
          display: "flex",
          color: "white",
          border: "none",
        }}
      >
        Log Out
      </Button>
      <Modal
        title="Log Out"
        visible={displayModal}
        onCancel={handleCancel}
        footer={null}
        destroyOnClose={true}
      >
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <p>Are you sure you want to log out?</p>
          <Button
            type="primary"
            shape="round"
            onClick={handleLogout}
            style={{ background: "#3A00E5" }}
          >
            Yes, Log Out
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Logout;
