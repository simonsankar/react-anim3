import React, { Component } from 'react';
import Swiper from 'react-id-swiper';
import CarouselItem from '../containers/CarouselItem';

class Carousel extends Component {
  params = {
    centeredSlides: true,
    autoplay: {
      delay: 9500,
      disableOnInteraction: false
    },
    pagination: {
      el: '.swiper-pagination ',
      type: 'bullets',
      clickable: true
    },
    grabCursor: true
  };

  renderList({ items }) {
    return items.map(item => {
      return (
        <div key={item.url}>
          <CarouselItem item={item} />
        </div>
      );
    });
  }

  render() {
    return <Swiper {...this.params}>{this.renderList(this.props)}</Swiper>;
  }
}

export default Carousel;
