import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import SensorList from './components/SensorList';
import SensorDetail from './components/SensorDetail';

function App() {
  return (
    <BrowserRouter>
      <div style={{padding:24}}>
        <header>
          <h1><Link to="/" style={{textDecoration:'none', color:'inherit'}}>Water Quality Monitor</Link></h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<SensorList/>} />
            <Route path="/sensors/:id" element={<SensorDetail/>} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;
