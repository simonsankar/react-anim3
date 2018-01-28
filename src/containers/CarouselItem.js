import React from 'react';
import {
  carouselImage,
  carouselOverlay,
  carouselText
} from '../styles/carousel.css';
import { carouselHeight } from '../styles/column.css';
const CarouselItem = props => {
  const image =
    'https://images2-focus-opensocial.googleusercontent.com/gadgets/proxy?container=focus&gadget=a&no_expand=1&refresh=604800&url=http://2.bp.blogspot.com/-Tt7PwvWm9EU/WE-zXk6SUKI/AAAAAAABSj8/cgzxi79Pvbg/w650-h350/';
  return (
    <div>
      <div style={carouselImage(image)} />
      <div style={carouselOverlay}>
        <div style={carouselText}>
          <h4>Anime Name</h4>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium
            nobis eligendi voluptates saepe repudiandae, reiciendis eveniet quae
            at omnis veniam dicta corrupti similique illo, porro, sit velit!
            Nostrum, dolorum harum.
          </p>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
