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

export const graduationRating = avg;

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
      synopsis={`Kanye West's 'Graduation' marks a significant milestone in his illustrious career, merging his distinctive lyrical prowess with avant-garde production techniques. Released with immense anticipation, this album is celebrated for its innovative approach to blending hip-hop with elements of pop and rock. Each track on 'Graduation' showcases Kanye's versatility, starting with the reflective tones of 'Good Morning' and building up to the electrifying beats of 'Stronger'.\n\nThe album's journey is one of artistic evolution, capturing the essence of an artist pushing the boundaries of contemporary music. Songs like 'Flashing Lights' and 'Champion' stand out with their rich orchestration and dynamic beats, creating an immersive listening experience. The production is both lush and intricate, highlighting Kanye's ability to craft music that is as complex as it is accessible.\n\nYet, not every track achieves the same level of excellence. Collaborations such as 'Barry Bonds' with Lil Wayne, while noteworthy, do not quite reach the album's otherwise high standards, and 'Drunk and Hot Girls' disrupts the overall cohesiveness with its experimental approach. Despite these few missteps, 'Graduation' remains an album of remarkable replay value and sound quality.\n\nIn conclusion, 'Graduation' is a testament to Kanye West's evolving artistry. It not only solidifies his place in the pantheon of music greats but also underscores his relentless pursuit of innovation. This album is a pivotal entry in his discography, reflecting both his growth as an artist and his impact on the music world.`}
      rating={avg}
      tracks={tracks}
      spotifyLink={albumDetails.spotifyLink}
    />
  );
};

export default Graduation;
