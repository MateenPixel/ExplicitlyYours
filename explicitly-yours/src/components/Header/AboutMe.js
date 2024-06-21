import React from 'react';
import './AboutMe.css';
import { Link } from 'react-router-dom';

const AboutMe = () => {
  return (
    <div className="resume-container">
      <h1 className="resume-title">Mateen Gilani</h1>
      <h2 className="resume-subtitle">Professional Music Listener</h2>
      <div className="resume-section">
        <h3 className="resume-section-title">Summary</h3>
        <p className="resume-text">
          Enthusiastic music aficionado with over 1000 hours of annual listening experience.
           Skilled in recognizing beats, analyzing lyrics, and calling Drake cringe. 
           Committed to staying updated with the latest in the music world and sharing insights with fellow enthusiasts.
        </p>
      </div>
      <div className="resume-section">
        <h3 className="resume-section-title">Experience</h3>
        <ul className="resume-list">
          <li>
            <strong>Chief Listening Officer</strong> at <em>Home</em> (2018 - Present)
            <p className="resume-text">
              - Listened to various genres of music for over 2000 hours.
              <br />- Curated monthly playlists for my ex and whoever else cared.
              <br />- Reviewed and rated 1 album so far.
            </p>
          </li>
          <li>
            <strong>MF Thug</strong> (2003 - 2018)
            <p className="resume-text">
              - Put people on.
              <br />- Changed opinion on Drake being better than Kanye (my fault).
              <br />- Knew the lyrics to T-Wayne Nasty Freestyle.
            </p>
          </li>
        </ul>
      </div>
      <div className="resume-section">
        <h3 className="resume-section-title">Skills</h3>
        <ul className="resume-list">
          <li>Listening to the same 5 songs on repeat for countless days.</li>
          <li>Recognizing songs by the drum/bass.</li>
          <li>Creating playlists with/for others to enjoy (venmo me 5).</li>
          <li>Writing engaging music reviews!</li>
        </ul>
      </div>
      <div className="resume-section">
        <h3 className="resume-section-title">Education</h3>
        <p className="resume-text">
          B.A. in Making Terrible Beats through GarageBand (2010 - 2014)
        <p className='resume-text'></p>
          B.A. in Computer Science (2021 - 2025)
        </p>
      </div>
      <div className="resume-section">
        <h3 className="resume-section-title">Hobbies</h3>
        <p className="resume-text">
          - Driving perhaps a little too fast with the music blaring, windows down through every neighborhood
          <br />- Convincing people that questionable music is good music
          <br />- ROCK PAPER STRIPPERS
        </p>
      </div>
      <Link to="/" className="back-link">← Back to Home</Link>
    </div>
  );
};

export default AboutMe;
