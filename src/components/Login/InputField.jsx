import React from "react";

const styles = {
  input: {
    width: "100%",
    justifyContent: "center",
    padding: "12px",
    border: "1px solid #D1D5DB",
    borderRadius: "6px",
    fontSize: "16px",
    marginBottom: "10px",
  },
};

const InputField = ({ type, placeholder, value, onChange }) => {
  return <input type={type} placeholder={placeholder} value={value} onChange={onChange} style={styles.input} />;
};

export default InputField;
