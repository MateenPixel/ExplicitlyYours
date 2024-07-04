import React, { useEffect, useState } from 'react';
import ReviewTemplate from './ReviewTemplate';
import { getAlbumTracks, getAlbumDetails } from '../../utils/spotify';

const trueRatings = [68, 64, 67, 71, 70, 71, 48, 36, 74, 66, 62, 70, 63, 61, 32, 15];
const coverVision = [10, 9];
const customThoughts = [
  "This track sets a reliable tone for the album with memorable instrumentals and hard-hitting verses. Enhanced by the 'Ruler’s Back' sample, it makes a strong impression from the start.",
  "A brilliant sample loops in the background as Kanye delivers bar after bar. The ascending synth creates a euphoric anticipation that keeps listeners engaged.",
  "Featuring Daft Punk, this track is a compilation favorite, fitting perfectly into the cringey 2000s music video vibe. Despite its classic status, the chorus feels overly repetitive after multiple listens.",
  "Motivational and introspective, this track invites listeners to ponder life's deeper meanings. You ever wonder what it all really means?",
  "This quintessential song about enjoying life sets the bar high for the album. On a project of this caliber, a song this good feels like the baseline.",
  "With some of the coldest lines ever, this pre-game and workout anthem features Kanye riding the beat as smoothly as butter.",
  "The collaboration with Lil Wayne offers a cold beat, yet the song feels slightly out of place on the album. Despite its potential, it underwhelms compared to the rest.",
  "ggs go next",
  "Featuring prevalent synths, a catchy chorus, and killer verses, this track feels like a near-perfect one-man orchestra.",
  "Slower and piano-focused, this thoughtful track deepens the album's introspective narrative for both the artist and the listener.",
  "Further proof of Kanye's unparalleled sampling skills, this song is reminiscent of the Jackson 5, showcasing his genius.",
  "This track features an unexpected yet seamless integration of Coldplay's synth work, creating a beautiful metaphorical ode to Chicago.",
 "Introducing a guitar, the second last closing track smoothly transitions between rock and pop, offering a fitting, calmer end to the graduation day.",
  "A playful track, rather than saying goodbye to the listeners, Kanye says good night as Graduation comes to a close."
];

const customRatings = trueRatings.map(rating => Math.round((rating / 80) * 100));
const total = trueRatings.reduce((sum, rating) => sum + rating, 0);
const final = coverVision.reduce((sum, rating) => sum + rating, 0);
const avg = Math.round((total / trueRatings.length) + final);

export const igorRating = avg;
export const trackRatings = customRatings;

const IGOR = () => {
  const [tracks, setTracks] = useState([]);
  const [albumDetails, setAlbumDetails] = useState({ coverImage: '', spotifyLink: '' });

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumTracks = await getAlbumTracks('IGOR', 'Tyler, the Creator');
        const tracksWithRatingsAndThoughts = albumTracks.map((track, index) => ({
          ...track,
          rating: customRatings[index] || 0,
          thoughts: customThoughts[index] || ""
        }));
        setTracks(tracksWithRatingsAndThoughts);

        const albumDetails = await getAlbumDetails('IGOR', 'Tyler, the Creator');
        if (albumDetails) {
          setAlbumDetails(albumDetails);
        }
      } catch (error) {
        console.error('Error fetching album data:', error);
      }
    };

    fetchAlbumData();
  }, []);

  return (
    <ReviewTemplate
      albumName="IGOR"
      coverImage={albumDetails.coverImage}
      artistName="Tyler, the Creator"
      synopsis={`Tyler, the Creator's 'IGOR' represents a departure from his 
        previous works, embracing a more soulful and melodic approach. 
        The album delves into themes of heartbreak and unrequited love, 
        showcasing Tyler's evolution as both a musician and a storyteller. 
        Each track on 'IGOR' is meticulously crafted, blending genres 
        seamlessly to create a cohesive narrative that resonates with 
        listeners.`}
      rating={avg}
      tracks={tracks}
      spotifyLink={albumDetails.spotifyLink}
      trackColor={"#f8b9ce"}
    />
  );
};

export default IGOR;
