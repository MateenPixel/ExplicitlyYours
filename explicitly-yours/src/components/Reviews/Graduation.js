import React, { useEffect, useState } from 'react';
import ReviewTemplate from './ReviewTemplate';
import { getAlbumTracks, getAlbumDetails } from '../../utils/spotify';

const trueRatings = [68, 64, 67, 71, 70, 71, 48, 36, 74, 66, 62, 70, 63, 61];
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

export const graduationRating = avg;
export const trackRatings = customRatings;

const Graduation = () => {
  const [tracks, setTracks] = useState([]);
  const [albumDetails, setAlbumDetails] = useState({ coverImage: '', spotifyLink: '' });

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumTracks = await getAlbumTracks('Graduation', 'Kanye West');
        const tracksWithRatingsAndThoughts = albumTracks.map((track, index) => ({
          ...track,
          rating: customRatings[index] || 0,
          thoughts: customThoughts[index] || ""
        }));
        setTracks(tracksWithRatingsAndThoughts);

        const albumDetails = await getAlbumDetails('Graduation', 'Kanye West');
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
      albumName="Graduation"
      coverImage={albumDetails.coverImage}
      artistName="Kanye West"
      synopsis={`Kanye West's 'Graduation' marks a significant 
        milestone in his illustrious career, merging his distinctive 
        lyrical prowess with avant-garde production techniques. 
        Released with immense anticipation, this album is celebrated 
        for its innovative approach to blending hip-hop with elements 
        of pop and rock. Each track on 'Graduation' showcases Kanye's 
        versatility, starting with the reflective tones of 'Good Morning'
        and building up to the electrifying beats of 'Stronger'
        .\n\nThe album's journey is one of artistic evolution, 
        capturing the essence of an artist pushing the boundaries of 
        contemporary music. Songs like 'Flashing Lights' and 'Champion' 
        stand out with their rich orchestration and dynamic beats, 
        creating an immersive listening experience. The production is 
        both lush and intricate, highlighting Kanye's ability to craft 
        music that is as complex as it is accessible.\n\nYet, not every 
        track achieves the same level of excellence. Collaborations such 
        as 'Barry Bonds' with Lil Wayne, while noteworthy, do not quite 
        reach the album's otherwise high standards, and 'Drunk and Hot 
        Girls' disrupts the overall cohesiveness with its experimental 
        approach. Despite these few missteps, 'Graduation' remains an
        album of remarkable replay value and sound quality.\n\nIn 
        conclusion, 'Graduation' is a testament to Kanye West's evolving 
        artistry. It not only solidifies his place in the pantheon of 
        music greats but also underscores his relentless pursuit of 
        innovation. This album is a pivotal entry in his discography, 
        reflecting both his growth as an artist and his impact on the 
        music world.`}
      rating={avg}
      tracks={tracks}
      spotifyLink={albumDetails.spotifyLink}
      trackColor={"#ef0189"}
    />
  );
};

export default Graduation;
