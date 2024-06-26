import React, { useEffect, useState } from 'react';
import ReviewTemplate from './ReviewTemplate';
import { getAlbumTracks, getAlbumDetails } from '../../utils/spotify';

const customRatings = [79, 77, 54, 74, 75, 65, 62, 69, 72, 58, 73, 59, 62, 68, 68, 56];
const customThoughts = [
  "Great opening track with a motivational vibe.",
  "Catchy beats and strong lyrics.",
  "Interesting collaboration but falls a bit short.",
  "Energetic and uplifting.",
  "Solid track with a memorable hook.",
  "Decent track but nothing standout.",
  "Good production but lyrics could be better.",
  "Strong track with a great beat.",
  "Melodic and memorable.",
  "Not my favorite, feels a bit filler.",
  "Great closing track with a lasting impact.",
  "Catchy but lacks depth.",
  "Strong track with good features.",
  "Interesting beat switch midway.",
  "Solid track with good replay value.",
  "Decent closer but could be stronger."
];

const total = customRatings.reduce((sum, rating) => sum + rating, 0);
const avg = total / customRatings.length;

export const twopointfiveRating = avg;

const TwoPointFive = () => {
  const [tracks, setTracks] = useState([]);
  const [albumDetails, setAlbumDetails] = useState({ coverImage: '', spotifyLink: '' });

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumTracks = await getAlbumTracks('TWOPOINTFIVE', 'Aminé');
        const tracksWithRatingsAndThoughts = albumTracks.map((track, index) => ({
          ...track,
          rating: customRatings[index] || 0,
          thoughts: customThoughts[index] || ""
        }));
        setTracks(tracksWithRatingsAndThoughts);

        const albumDetails = await getAlbumDetails('TWOPOINTFIVE', 'Aminé');
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
      albumName="TWOPOINTFIVE"
      coverImage={albumDetails.coverImage}
      artistName="Aminé"
      synopsis={`Aminé's 'TWOPOINTFIVE' showcases his playful and experimental side, blending elements of pop and hip-hop to create a vibrant and energetic album. The project is filled with catchy hooks and clever wordplay, highlighting Aminé's versatility as an artist. Each track on 'TWOPOINTFIVE' offers something unique, making it a dynamic and enjoyable listening experience.`}
      rating={avg}
      tracks={tracks}
      spotifyLink={albumDetails.spotifyLink}
    />
  );
};

export default TwoPointFive;
