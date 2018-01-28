import React, { Component } from 'react';
import { Segment, Button, Icon } from 'semantic-ui-react';
import Swiper from 'react-id-swiper';
import CarouselItem from './CarouselItem';
import { carouselHeight } from '../styles/column.css';

class Carousel extends Component {
  params = {
    centeredSlides: true,
    autoplay: {
      delay: 4500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination ',
      type: 'bullets',
      clickable: true
    },
    grabCursor: true
  };
  render() {
    return (
      <Segment>
        <Swiper {...this.params}>
          <div>
            <CarouselItem />
          </div>
        </Swiper>
      </Segment>
    );
  }
}

export default Carousel;
