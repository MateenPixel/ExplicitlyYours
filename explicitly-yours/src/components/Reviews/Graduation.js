import React, { useEffect, useState } from 'react';
import ReviewTemplate from './ReviewTemplate';
import { getAlbumTracks, getAlbumDetails } from '../../utils/spotify';

const Graduation = () => {
  const [tracks, setTracks] = useState([]);
  const [albumDetails, setAlbumDetails] = useState({ coverImage: '', spotifyLink: '' });

  const customRatings = [79, 77, 54, 74, 75, 65, 62, 69, 72, 58, 73, 59, 62, 68, 68, 56]; 

  var total = 0;
  for (var i = 0; i < customRatings.length; i++) {
    total += customRatings[i];
  }
  var avg = total / customRatings.length;

  useEffect(() => {
    const fetchAlbumData = async () => {
      try {
        const albumTracks = await getAlbumTracks('Graduation', 'Kanye West');
        const tracksWithRatings = albumTracks.map((track, index) => ({
          ...track,
          rating: customRatings[index] || 0,
        }));
        setTracks(tracksWithRatings);

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
      synopsis={`Graduation is the third studio album by American rapper Kanye West, released on September 11, 2007. It marked the end of his education-themed trilogy following The College Dropout (2004) and Late Registration (2005). The album features a variety of genres including hip hop, pop, and rock, and it incorporates influences from electronic music.`}
      rating={avg}
      tracks={tracks}
      spotifyLink={albumDetails.spotifyLink}
    />
  );
};

export default Graduation;
