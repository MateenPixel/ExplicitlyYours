import React, { useEffect, useState } from 'react';
import ReviewTemplate from './ReviewTemplate';
import { getAlbumTracks, getAlbumDetails } from '../../utils/spotify';

const customRatings = [79, 77, 54, 74, 75, 65, 62, 69, 72, 58, 73, 59, 62, 68, 68, 56];
const customThoughts = [
  "Powerful opening track with an energetic vibe.",
  "Strong hook and memorable lyrics.",
  "Interesting collaboration but not a standout.",
  "Great energy and flow.",
  "Catchy and upbeat.",
  "Solid track with good replay value.",
  "Good production but lacks lyrical depth.",
  "Great beat and solid performance.",
  "Melodic and well-produced.",
  "Not very memorable, feels like filler.",
  "Strong closing track with lasting impact.",
  "Catchy but not very deep.",
  "Good collaboration with strong features.",
  "Unique beat switch that keeps it interesting.",
  "Solid track with good replay value.",
  "Decent closer but could be stronger."
];

const total = customRatings.reduce((sum, rating) => sum + rating, 0);
const avg = total / customRatings.length;

export const hardstonePsychoRating = avg;

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
    />
  );
};

export default HardstonePsycho;
