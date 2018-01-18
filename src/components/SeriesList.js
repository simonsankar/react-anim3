import React from 'react';
import PopupCard from './PopupCard';
import { Grid } from 'semantic-ui-react';
const SeriesList = props => {
  const { animes } = props;
  return (
    <Grid verticalAlign="top" inverted centered>
      {animes && animes.map(el => <PopupCard key={el.datatip} anime={el} />)}
    </Grid>
  );
};

export default SeriesList;
