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
          backgroundColor: "#FFE100",
          borderRadius: "10px",
          color: "black",
        }}
      >
        Logout
      </Button>
      <Modal
        title="Logout"
        open={displayModal}
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
            Yes, Logout
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Logout;
