import React from 'react';
import { Link } from 'react-router-dom';
import { miniLink } from '../styles/links.css';

const GenreLink = props => {
  const { genre } = props;
  return (
    <Link to={genre.url} style={miniLink}>
      {genre.name}
    </Link>
  );
};

export default GenreLink;
