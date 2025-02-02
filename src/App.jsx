import SessionPage from "./pages/Main/SessionPage";
import HarmonyPage from "./pages/Main/HarmonyPage";
import HomePage from "./pages/Main/HomePage";
import Result_HarmonyPage from "./pages/Main/Result_HarmonyPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Result_SeesionPage from "./pages/Main/Result_SessionPage";
const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/harmony" element={<HarmonyPage />} />
        <Route
          path="/harmony/result_harmony"
          element={<Result_HarmonyPage />}
        />
        <Route path="/session" element={<SessionPage />} />
        <Route
          path="/session/result_session"
          element={<Result_SeesionPage />}
        />
      </Routes>
    </Router>
  );
};

export default App;


// import './App.css'
// import Mypagehold from'./pages/Mypage/Mypagehold.jsx';
// import MPYharmony from './pages/Mypage/MPYharmony.jsx';
// import MPYsession from './pages/Mypage/MPYsession.jsx';
// import MPYsearch from './pages/Mypage/MPYsearch.jsx'
// import MPYinfo from './pages/Mypage/MPYinfo.jsx';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


// function App() {

//   return (
//     <Router>
//         <Routes>
//           <Route path="/" element={<Mypagehold/>} />
//           <Route path="/mypageinfo" element={<MPYinfo/>} />
//           <Route path="/mypageharmony" element={<MPYharmony/>} />
//           <Route path="/mypagesession" element={<MPYsession/>} />
//           <Route path="/mypagesearch" element={<MPYsearch/>} />



          
//         </Routes>
//     </Router>
//   )
// }

// export default App;

