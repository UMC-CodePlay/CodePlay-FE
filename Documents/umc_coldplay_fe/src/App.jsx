import { useState } from 'react';
import './App.css';
import Navbar from './components/Navbar';
import TitleNavbar from './components/TitleNavbar';

function App() {
  return (
    <>
      <Navbar />
      <TitleNavbar
        title="화상 분석"
        subtitle="어쩌고저쩌고 그냥 그런 내용sdfsfdsfds들"
      ></TitleNavbar>
    </>
  );
}

export default App;
