import React, { useEffect, useState } from 'react';
import ReviewTemplate from './ReviewTemplate';
import { getAlbumTracks } from '../../utils/spotify';

const Graduation = () => {
  const [tracks, setTracks] = useState([]);

  const customRatings = [85, 78, 82, 88, 75, 80, 90, 77, 83, 79, 85, 90, 12, 14, 15, 67]; // Add ratings here in order

  var total = 0;
  for (var i = 0; i < customRatings.length; i++) {
    total += customRatings[i];
  }
  var avg = total / customRatings.length;

  useEffect(() => {
    const fetchTracks = async () => {
      try {
        const albumTracks = await getAlbumTracks('Graduation');
        console.log('Fetched tracks:', albumTracks); // Add this line for debugging
        const tracksWithRatings = albumTracks.map((track, index) => ({
          ...track,
          rating: customRatings[index] || 0
        }));
        setTracks(tracksWithRatings);
      } catch (error) {
        console.error('Error fetching tracks:', error); // Add this line for debugging
      }
    };
    fetchTracks();
  }, []);
  

  return (
    <ReviewTemplate
      albumName="Graduation" // Ensure this matches the album name on Spotify
      coverImage="/ye.jpeg" // Path to the album cover image
      artistName="Kanye West"
      synopsis="Cementing his position in rap's top tier, Don Toliver's 'Hardstone Psycho' blends core elements with fresh aspects, featuring collaborations with Kodak Black and Future. Despite some jarring rock influences, the album's highlights, like 'Deep In The Water' and 'Attitude', showcase his evolving prowess in hip-hop."
      rating={avg}
      tracks={tracks} // Passing tracks with ratings
      spotifyLink="https://open.spotify.com/album/4SZko61aMnmgvNhfhgTuD3?si=Hy0bJ3f-QH6_Xxm1eAl-lw"
    />
  );
};

export default Graduation;
