import SessionPage from "./pages/Main/SessionPage";
import HarmonyPage from "./pages/Main/HarmonyPage";
import HomePage from "./pages/Main/HomePage";
import Result_HarmonyPage from "./pages/Main/Result_HarmonyPage";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Result_SeesionPage from "./pages/Main/Result_SessionPage";
import Login from "./pages/Login/Login.jsx"
import Signup from "./pages/Login/Signup.jsx"
import { NavbarProvider } from "./context/NavbarContext"; // 추가
import './App.css'
import Mypagehold from'./pages/Mypage/Mypagehold.jsx';
import MPYharmony from './pages/Mypage/MPYharmony.jsx';
import MPYsession from './pages/Mypage/MPYsession.jsx';
import MPYsearch from './pages/Mypage/MPYsearch.jsx'
import MPYinfo from './pages/Mypage/MPYinfo.jsx';
import FindPwd_1_Auth from "./pages/Login/FindPwd_1_Auth";
import FindPwd_2_Set from "./pages/Login/FindPwd_2_Set";
import FindPwd_3_Done from "./pages/Login/FindPwd_3_Done";
const App = () => {
  return (
    <NavbarProvider>
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login/>}/>

        <Route path="/login/findpwd/auth" element={<FindPwd_1_Auth />} />
        <Route path="/login/findpwd/set" element={<FindPwd_2_Set />} />
        <Route path="/login/findpwd/done" element={<FindPwd_3_Done />} />
        <Route path="*" element={<Navigate to="/login" replace />} />


        <Route path="/signup" element={<Signup/>}/>
        <Route path="/mypage" element={<Mypagehold/>} />
        <Route path="/mypage/mypageinfo" element={<MPYinfo/>} />
        <Route path="/mypage/mypageharmony" element={<MPYharmony/>} />
        <Route path="/mypage/mypagesession" element={<MPYsession/>} />
        <Route path="/mypage /mypagesearch" element={<MPYsearch/>} />
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
    </NavbarProvider>
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

