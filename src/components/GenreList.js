import React from 'react';
import { Grid } from 'semantic-ui-react';
import GenreLink from './GenreLink';
import { miniCol } from '../styles/column.css';
const GenreList = props => {
  const { genres } = props;
  return (
    <Grid columns={3} textAlign="left" container padded>
      {genres.map(genre => {
        return (
          <Grid.Column key={genre.name} style={miniCol}>
            <GenreLink genre={genre} />
          </Grid.Column>
        );
      })}
    </Grid>
  );
};

export default GenreList;
