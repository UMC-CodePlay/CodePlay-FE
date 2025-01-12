import HarmonyPage from "./pages/HarmonyPage";
import ScorePage from "./pages/ScorePage";
import SessionPage from "./pages/SessionPage";
import ScorePage from "./pages/ScorePage";
import HarmonyPage from "./pages/HarmonyPage";
import HomePage from "./pages/HomePage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const App = () => {
  return (
<<<<<<< HEAD
    <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/harmony" element={<HarmonyPage />} />
          <Route path="/session" element={<SessionPage />} />
          <Route path="/score" element={<ScorePage />} />
        </Routes>
    </Router>
=======
    <div>
      <HarmonyPage />
      <SessionPage />
      <ScorePage />
    </div>
>>>>>>> origin/seokhoon
  );
};

export default App;
