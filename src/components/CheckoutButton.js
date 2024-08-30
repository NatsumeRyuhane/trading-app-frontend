import {Button, ConfigProvider} from "antd";

// TODO: fix button styles
const CheckoutButton = () => {
  return (
    <ConfigProvider
      theme={{
        components: {
          Button: {
            colorPrimary: "#3A00E5"
          }
        }
      }}
    >
      <Button
        //   style={{
        //   height: 40,
        //   padding: "10px 25px", // Top/bottom: 10px, left/right: 25px
        //   background: "#3A00E5",
        //   borderRadius: 20,
        //   justifyContent: "center",
        //   alignItems: "center", // Center text vertically
        //   display: "flex",
        //   color: "white",
        //   border: "none",
        // }}
        onClick={() => console.log("checkout item")}
        type="primary"
        shape="round"
      >
        Checkout
      </Button>
    </ConfigProvider>
  );
};

export default CheckoutButton;