import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import Header from './components/Header/Header';
import MainContent from './components/MainContent/MainContent';
import AlbumList from './components/AlbumList/AlbumList';
import AnimatedBackground from './components/AnimatedBackground/AnimatedBackground';

function App() {
  return (
    <Router>
      <div className="app-container">
        <AnimatedBackground />
        <Header />
        <MainContent />
        <AlbumList />
      </div>
    </Router>
  );
}

export default App;
