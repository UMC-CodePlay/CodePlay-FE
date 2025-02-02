import React from "react";

const styles = {
  primaryButton: {
    width: "100%",
    backgroundColor: "#6F3DA1", // "다음으로 넘어가기" 버튼 (보라색)
    color: "white",
    padding: "12px",
    borderRadius: "999px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
  secondaryButton: {
    width: "100%",
    backgroundColor: "#C9C3CE", // "이전으로" 버튼 (회색)
    color: "white",
    padding: "12px",
    borderRadius: "999px",
    fontSize: "16px",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
};

const Button = ({ text, onClick, variant = "primary" }) => {
  const buttonStyle = variant === "primary" ? styles.primaryButton : styles.secondaryButton;

  return (
    <button onClick={onClick} style={buttonStyle}>
      {text}
    </button>
  );
};

export default Button;
