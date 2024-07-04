import React, { useEffect, useState } from 'react';
import ReviewTemplate from './ReviewTemplate';
import { getAlbumTracks, getAlbumDetails } from '../../utils/spotify';

const trueRatings = [68, 64, 67, 71, 70, 71, 48, 36, 74, 66, 62, 70, 63, 61, 32, 1];
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
  "A playful track, rather than saying goodbye to the listeners, Kanye says good night as Graduation comes to a close.",
  "rah rah",
  "rah rah"
];

const customRatings = trueRatings.map(rating => Math.round((rating / 80) * 100));
const total = trueRatings.reduce((sum, rating) => sum + rating, 0);
const final = coverVision.reduce((sum, rating) => sum + rating, 0);
const avg = Math.round((total / trueRatings.length) + final);

export const hardstonePsychoRating = avg;
export const trackRatings = customRatings;

const HardstonePsycho = () => {
  const [tracks, setTracks] = useState([]);
  const [albumDetails, setAlbumDetails] = useState({ coverImage: '', spotifyLink: '' });

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumTracks = await getAlbumTracks('Hardstone Psycho', 'Don Toliver');
        const tracksWithRatingsAndThoughts = albumTracks.map((track, index) => ({
          ...track,
          rating: customRatings[index] || 0,
          thoughts: customThoughts[index] || ""
        }));
        setTracks(tracksWithRatingsAndThoughts);

        const albumDetails = await getAlbumDetails('Hardstone Psycho', 'Don Toliver');
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
      albumName="Hardstone Psycho"
      coverImage={albumDetails.coverImage}
      artistName="Don Toliver"
      synopsis={`With much anticipation, Don Toliver has released 'Hardstone Psycho', a project touted as his potential 'Astroworld'. Merging catchy hooks with a jarring new rock sound, Toliver makes a bold statement with a four-disc album, each featuring four tracks. The album encapsulates the essence of a solo Harley rider at dusk, speeding down an endless highway. This atmospheric setup is effortlessly maintained throughout, starting with the electrifying 'Kryptonite' and culminating in the powerful 'Hardstone National Anthem'.\n\nThe album's dynamic range is highlighted by beat switches on tracks like '4x4', which completely alter the song's vibe, a feature that could be seen as either a strength or a drawback. However, not all contributions hit the mark; Travis Scott's performances on 'Ice Age' and 'Inside' felt underwhelming, evoking the monotony of waiting in a doctor's office for Dr. Toliver to arrive.\n\nTracks like 'New Drop' and 'Glock', although solid, would have been better suited for his previous album. They disrupt the sharp thematic cohesion of 'Hardstone Psycho', and their placement feels misplaced, even though the album doesn't strictly segregate the 'Love Sick' songs onto specific discs.\n\nWhile 'Hardstone Psycho' may not achieve the iconic status of 'Astroworld', its replayability, sound quality, and evident effort shine through, making it a significant addition to Don Toliver's discography. This is 'Hardstone Psycho'—an album that solidifies Toliver's evolving artistry and cements his place in the music world.`}
      rating={avg}
      tracks={tracks}
      spotifyLink={albumDetails.spotifyLink}
      trackColor={"#9ca1a5"}
    />
  );
};

export default HardstonePsycho;
