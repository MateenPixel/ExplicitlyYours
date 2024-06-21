import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import AlbumList from './components/AlbumList/AlbumList';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';
import HardstonePsycho from './components/Reviews/HardStonePsycho';
import AboutMe from './components/Header/AboutMe';
import Reviews from './components/Header/Reviews';
import Recents from './components/Header/Recents';
import Graduation from './components/Reviews/Graduation';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AnimatedBackground />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/review/hardstone-psycho" element={<HardstonePsycho />} />
          <Route path="/review/Graduation" element={<Graduation />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/recents" element={<Recents />} />
        </Routes>
        <AlbumList />
      </div>
    </Router>
  );
}

export default App;
