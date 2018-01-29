import React from 'react';
import { Link } from 'react-router-dom';
import { Grid, Button } from 'semantic-ui-react';
import {
  carouselImage,
  carouselOverlay,
  carouselText
} from '../styles/carousel.css';
const CarouselItem = ({ item }) => {
  return (
    <div>
      <div style={carouselImage(item.image)} />
      <div style={carouselOverlay}>
        <div style={carouselText}>
          <Grid>
            <Grid.Row columns={2}>
              <Grid.Column width={10}>
                <h4>{item.title}</h4>
                <p>{item.desc}</p>
              </Grid.Column>
              <Grid.Column width={2} floated="right" verticalAlign="bottom">
                <Button
                  as={Link}
                  to={item.url}
                  color="teal"
                  floated="right"
                  size="tiny"
                >
                  Watch!
                </Button>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        </div>
      </div>
    </div>
  );
};

export default CarouselItem;
