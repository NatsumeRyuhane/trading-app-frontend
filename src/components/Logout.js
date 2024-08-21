import { Button, Modal, message } from "antd";
import React, { useState } from "react";
import { logout } from "../utils";

function Logout({ onLogout }) {
  const [displayModal, setDisplayModal] = useState(false);

  const handleCancel = () => {
    setDisplayModal(false);
  };

  const logoutOnClick = () => {
    setDisplayModal(true);
  };

  const handleLogout = () => {
    logout()
      .then(() => {
        message.success("You have been logged out");
        onLogout(); // Notify parent component about the logout
        setDisplayModal(false);
      })
      .catch(err => {
        message.error(err.message);
      });
  };

  return (
    <>
      <Button className="loginButton" onClick={logoutOnClick}>
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
          <Button type="primary" onClick={handleLogout}>
            Yes, Log Out
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default Logout;
