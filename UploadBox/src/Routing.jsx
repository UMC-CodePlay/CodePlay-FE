import App from "./App";
import { BrowserRouter as Routes, Route } from "react-router-dom";
import HarmonyPage from "./pages/HarmonyPage";
import ScorePage from "./pages/ScorePage";
import SessionPage from "./pages/SessionPage";

function Routing() {
  return (
    <>
      <App>
        <Routes>
          <Route path="/harmony" element={<HarmonyPage />} />
          <Route path="/score" element={<ScorePage />} />
          <Route path="/session" element={<SessionPage />} />
        </Routes>
      </App>
    </>
  );
}

export default Routing;
