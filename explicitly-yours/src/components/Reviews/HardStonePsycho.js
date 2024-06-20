import React from 'react';
import ReviewTemplate from './ReviewTemplate';

function HardstonePsycho() {
  return (
    <ReviewTemplate
      albumId="spotify-album-id" // Replace with actual Spotify album ID
      coverImage="/don.webp" // Replace with actual path to your album cover in the public folder
      albumName="HARDSTONE PSYCHO"
      artistName="Don Toliver"
      synopsis="This is a synopsis of the album. Here you can write about what the album is about, the themes, the style, and any other relevant information."
      rating={98}
    />
  );
}

export default HardstonePsycho;
