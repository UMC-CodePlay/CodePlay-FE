import React from "react";

const Dashboard = () => {
  return (
    <div style={styles.container}>
      <h1 style={styles.title}>🎉 대시보드 🎉</h1>
      <p style={styles.text}>회원가입이 완료되었습니다!</p>
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    height: "100vh",
    backgroundColor: "#f4f4f4",
  },
  title: {
    fontSize: "28px",
    fontWeight: "bold",
    color: "#6C63FF",
  },
  text: {
    fontSize: "18px",
    color: "#555",
    marginTop: "10px",
  },
};

export default Dashboard;
