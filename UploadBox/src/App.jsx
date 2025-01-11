import SessionPage from "./pages/SessionPage";
import ScorePage from "./pages/ScorePage";
import HarmonyPage from "./pages/HarmonyPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/harmony" element={<HarmonyPage />} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/score" element={<ScorePage />} />
        </Routes>
    </Router>
  );
};

export default App;
