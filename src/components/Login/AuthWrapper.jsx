import React from "react";
import loginBg from "../../assets/Login_img/login_bg.svg";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    backgroundImage: `url(${loginBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  box: {
    width: "100%",
    maxWidth: "400px",
    backgroundColor: "white",
    padding: "32px",
    borderRadius: "12px",
    boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    position: "relative",
  },
};

const AuthWrapper = ({ children }) => {
  return (
    <div style={styles.container}>
      <div style={styles.box}>{children}</div>
    </div>
  );
};

export default AuthWrapper;
