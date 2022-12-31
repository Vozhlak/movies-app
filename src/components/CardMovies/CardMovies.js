import React from 'react';
import { format } from 'date-fns';
import './CardMovies.css';
import PropTypes from 'prop-types';

function CardMovies({ title, overview, posterUrl, releaseDate }) {
  const sliceText = (str, count = 0) => {
    const currentStr = str.slice(0, count);
    const newStr = currentStr.split(' ').slice(0, -1);
    return `${newStr.join(' ')} ...`;
  };

  const newTitle = title.length > 35 ? sliceText(title, 35) : title;
  const newOverview = sliceText(overview, 125);
  const urlPoster = `https://image.tmdb.org/t/p/w500${posterUrl}`;
  const dateRelease = format(new Date(releaseDate), 'MMMM d, yyyy');

  return (
    <div className="movies-card">
      <img className="movies-card__img" src={urlPoster} alt={title} />
      <div className="wrap-movies-card-description">
        <h2 className="movies-card__title" title={title}>
          {newTitle}
        </h2>
        <span className="movies-card__date-release">{dateRelease}</span>
        <ul className="list-genres">
          <li className="list-genres__item">Action</li>
          <li className="list-genres__item">Drama</li>
        </ul>
        <p className="movies-card__description">{newOverview}</p>
      </div>
    </div>
  );
}

CardMovies.defaultProps = {
  title: '',
  overview: '',
  posterUrl: '',
  releaseDate: ''
};

CardMovies.propTypes = {
  title: PropTypes.string,
  overview: PropTypes.string,
  posterUrl: PropTypes.string,
  releaseDate: PropTypes.string
};

export default CardMovies;
