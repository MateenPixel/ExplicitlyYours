import React from 'react';
import './AboutMe.css';
import { Link } from 'react-router-dom';

const AboutMe = () => {
  return (
    <div className="resume-container">
      <h1 className="resume-title">Mateen Gilani</h1>
      <h2 className="resume-subtitle">Professional Hater</h2>
      <div className="resume-section">
        <h3 className="resume-section-title">Summary</h3>
        <p className="resume-text">
          Music good. Soul Train bad.
        </p>
      </div>
      <div className="resume-section">
        <h3 className="resume-section-title">Experience</h3>
        <ul className="resume-list">
          <li>
            <strong>Chief Listening Officer</strong> at <em>Home</em> (2018 - Present)
            <p className="resume-text">
              - Listened to various genres of music for over 2000 hours.
              <br />- Curated monthly playlists to share with the masses (3 people).
              <br />- Reviewed and rated 1 album.
            </p>
          </li>
          <li>
            <strong>MF Thug</strong> (2003 - 2018)
            <p className="resume-text">
              - Put people on.
              <br />- Realized Kanye is better than Drake.
              <br />- Knew the lyrics to T-Wayne Nasty Freestyle.
            </p>
          </li>
        </ul>
      </div>
      <div className="resume-section">
        <h3 className="resume-section-title">Skills</h3>
        <ul className="resume-list">
          <li>Listening to the same 5 songs on repeat for countless days.</li>
          <li>Recognizing songs by the bass when I'm at the pizza place underneath the bar.</li>
          <li>Creating playlists with/for others to enjoy (venmo me 5).</li>
          <li>Writing engaging music reviews!</li>
        </ul>
      </div>
      <div className="resume-section">
        <h3 className="resume-section-title">Education</h3>
        <p className="resume-text">
          B.A. in Computer Science (2021 - 2025)
        <p className='resume-text'></p>
          PhD in Judging Others' Music Preferences (Accelerated) (2016-2021)
        <p className='resume-text'></p>
          B.A. in Making Terrible Beats through GarageBand (2012 - 2016)
        </p>
      </div>
      <div className="resume-section">
        <h3 className="resume-section-title">Hobbies</h3>
        <p className="resume-text">
          - Driving fast, music loud in old folks' neighborhoods.
          <br />- Convincing people that questionable music is good music
          <br />- Separating art from the artist!
        </p>
      </div>
      <Link to="/" className="button-link">← Back to Home</Link>
    </div>
  );
};

export default AboutMe;
