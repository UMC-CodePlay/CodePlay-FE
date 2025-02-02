import React from "react";

const wrapperStyle = {
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "20px",
};

const AuthWrapper = ({ children }) => {
  return <div style={wrapperStyle}>{children}</div>;
};

export default AuthWrapper;
