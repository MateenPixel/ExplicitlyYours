import React from 'react';
import ReviewTemplate from './ReviewTemplate';

const HardstonePsycho = () => {
  return (
    <ReviewTemplate
      albumName="Hardstone Psycho" // Ensure this matches the album name on Spotify
      coverImage="/path-to-album-cover.jpg" // Path to the album cover image
      artistName="Don Toliver"
      synopsis="Cementing his position in rap's top tier, Don Toliver's 'Hardstone Psycho' blends core elements with fresh aspects, featuring collaborations with Kodak Black and Future. Despite some jarring rock influences, the album's highlights, like 'Deep In The Water' and 'Attitude', showcase his evolving prowess in hip-hop."
      rating={80}
    />
  );
};

export default HardstonePsycho;
