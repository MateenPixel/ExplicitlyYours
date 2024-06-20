import React from 'react';
import ReviewTemplate from './ReviewTemplate';

function HardstonePsycho() {
  return (
    <ReviewTemplate
      albumId="spotify-album-id" // Replace with actual Spotify album ID
      coverImage="/don.webp" // Replace with actual path to your album cover in the public folder
      albumName="HARDSTONE PSYCHO"
      artistName="Don Toliver"
      synopsis="Hardstone Psych by Don Toliver showcases his evolution in the rap scene, balancing creative prowess with stadium-worthy hip-hop tracks. The album shines when Toliver sticks to his core style, featuring collaborations with Kodak Black and Future. While some tracks venture into jarring rock influences, the album's highlights include the emotional Deep In The Water and the confident Attitude. Overall, Hardstone Psycho reinforces Don Toliver's position in rap's elite, blending familiar elements with fresh innovations."
      rating={98}
    />
  );
}

export default HardstonePsycho;
