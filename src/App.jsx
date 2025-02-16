import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import SessionPage from "./pages/Main/SessionPage.jsx";
import HarmonyPage from "./pages/Main/HarmonyPage.jsx";
import RemixingPage from "./pages/Main/RemixingPage.jsx";
import Result_RemixingPage from "./pages/Main/Result_RemixingPage.jsx"; 
import HomePage from "./pages/Main/HomePage.jsx";
import Result_HarmonyPage from "./pages/Main/Result_HarmonyPage.jsx";
import Result_SessionPage from "./pages/Main/Result_SessionPage.jsx";
import Login from "./pages/Login/Login.jsx";
import Signup from "./pages/Login/Signup.jsx";
import { NavbarProvider } from "./context/NavbarContext.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";
import "./App.css";
import Mypagehold from "./pages/Mypage/Mypagehold.jsx";
import MPYharmony from "./pages/Mypage/MPYharmony.jsx";
import MPYsession from "./pages/Mypage/MPYsession.jsx";
import MPYsearch from "./pages/Mypage/MPYsearch.jsx";
import MPYsearchhar from "./pages/Mypage/MPYsearchhar.jsx";
import MPYsearchses from "./pages/Mypage/MPYsearchses.jsx";
import MPYinfo from "./pages/Mypage/MPYinfo.jsx";
import FindPwd_1_Auth from "./pages/Login/FindPwd_1_Auth.jsx";
import FindPwd_2_Set from "./pages/Login/FindPwd_2_Set.jsx";
import FindPwd_3_Done from "./pages/Login/FindPwd_3_Done.jsx";
import AudioLoadingPage from "./pages/Main/AudioLoadingPage.jsx";

const App = () => {
  return (
    <NavbarProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<Login />} />

            <Route path="/login/findpwd/auth" element={<FindPwd_1_Auth />} />
            <Route path="/login/findpwd/set" element={<FindPwd_2_Set />} />
            <Route path="/login/findpwd/done" element={<FindPwd_3_Done />} />

            <Route path="/signup" element={<Signup />} />
            <Route path="/mypage" element={<Mypagehold />} />
            <Route path="/mypage/mypageinfo" element={<MPYinfo />} />
            <Route path="/mypage/mypageharmony" element={<MPYharmony />} />
           <Route path="/mypage/mypagesession" element={<MPYsession />} />
           <Route path="/mypage/mypagesearch" element={<MPYsearch />} />
           <Route path="/mypage/mypageharmony/mypagesearchhar" element={<MPYsearchhar />} />
           <Route path="/mypage/mypagesession/mypagesearchses" element={<MPYsearchses />} />
            <Route path="/harmony" element={<HarmonyPage />} />
            <Route path="/harmony/result_harmony" element={<Result_HarmonyPage />} />
            <Route path="/session" element={<SessionPage />} />
            <Route path="/session/result_session" element={<Result_SessionPage />} />
            <Route path="/remixing" element={<RemixingPage />} />
            <Route path="/remixing/result_remixing" element={<Result_RemixingPage />} />  {/* 추가 */}
            <Route path="/audioloading" element={<AudioLoadingPage />} />
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </AuthProvider>
    </NavbarProvider>
  );
};

export default App;
