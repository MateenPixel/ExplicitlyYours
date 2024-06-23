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
import Favorites from './components/Header/Favorites';
import Graduation from './components/Reviews/Graduation';
import IGOR from './components/Reviews/Igor';
import TwoPointFive from './components/Reviews/TwoPointFive';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <AnimatedBackground />
        <Routes>
          <Route path="/" element={<MainContent />} />
          <Route path="/review/hardstone-psycho" element={<HardstonePsycho />} />
          <Route path="/review/TwoPointFive" element={<TwoPointFive />} />
          <Route path="/review/Graduation" element={<Graduation />} />
          <Route path='/review/Igor' element={<IGOR />} />
          <Route path="/about-me" element={<AboutMe />} />
          <Route path="/reviews" element={<Reviews />} />
          <Route path="/favorites" element={<Favorites />} />

        </Routes>
        <AlbumList />
      </div>
    </Router>
  );
}

export default App;
