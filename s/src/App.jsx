import React from 'react';
import ReactDOM from 'react-dom/client';
import './App.css';
import Header from './components/1screen/header.jsx';
import Pearch from './components/1screen/search.jsx';
import Feature from './components/1screen/feature.jsx';
import Harmony from './components/2screen/harmony.jsx';
import Score from './components/3screen/score.jsx';
import Stem from './components/4screen/stem.jsx';

function App() {
  return (
    <div className="container">
      <Header/>
      <Pearch/>
      <Feature/>

      <Harmony/>

      <Score/>

      <Stem/>
      
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

export default App;
