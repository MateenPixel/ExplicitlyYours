import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import AlbumList from './components/AlbumList/AlbumList';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';
import HardstonePsycho from './components/Reviews/HardStonePsycho';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AnimatedBackground />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/review/hardstone-psycho" element={<HardstonePsycho />} />
        </Routes>
        <AlbumList />
      </div>
    </Router>
  );
}

export default App;
