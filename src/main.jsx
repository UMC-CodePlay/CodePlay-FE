import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { AuthProvider } from "./context/AuthContext"; // ✅ AuthProvider import

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>  {/* ✅ 전체 앱을 AuthProvider로 감싸기 */}
      <App />
    </AuthProvider>
  </React.StrictMode>
);
