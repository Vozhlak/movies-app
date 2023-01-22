/* eslint-disable no-unused-vars */
import { format } from 'date-fns';
import PropTypes from 'prop-types';

import './CardMovies.css';
import notPosterImg from '../../assets/NotPoster.jpg';
import Rated from '../Rated/Rated';
import MovieServiceContext from '../MovieAppServiceContext/MovieAppServiceContext';

function CardMovies({
  id,
  title,
  overview,
  posterUrl,
  releaseDate,
  voteAverage,
  guestSessionId,
  rating = null,
  genresIds
}) {
  const truncateText = (str, count = 0) => {
    const currentStr = str.slice(0, count);
    const newStr = currentStr.split(' ').slice(0, -1);
    return `${newStr.join(' ')} ...`;
  };

  const outTitle = (title) => {
    const newTitle = title.length > 35 ? truncateText(title, 30) : title;
    return window.innerWidth >= '80%' ? title : newTitle;
  };

  const listGenres = (ids) => (
    <MovieServiceContext.Consumer>
      {
        // eslint-disable-next-line consistent-return
        (genres) => {
          const film = [];
          ids.forEach((idMovie) => {
            genres.forEach(({ name, id }) => {
              if (idMovie === id) {
                film.push(name);
              }
            });
          });
          if (film) {
            const item = film.map((el) => (
              <li
                className='list-genres__item'
                key={el}>
                {el}
              </li>
            ));
            return <ul className='list-genres'>{item}</ul>;
          }
        }
      }
    </MovieServiceContext.Consumer>
  );

  const notGenres = (
    <span className='not-genres'>There are no genres for films</span>
  );

  const genresList = genresIds.length > 0 ? listGenres(genresIds) : notGenres;

  const newOverview = overview
    ? truncateText(overview, 125)
    : 'Movie overview not specified';

  const urlPoster = posterUrl
    ? `https://image.tmdb.org/t/p/w500${posterUrl}`
    : notPosterImg;

  const dateRelease = releaseDate
    ? format(new Date(releaseDate), 'MMMM d, yyyy')
    : 'no release date';

  const valueRating = rating || null;
  const ValueTranceteVoteAverage =
    String(voteAverage).length > 3
      ? String(voteAverage).slice(0, 3)
      : voteAverage;
  const valueVoteAverage = Number(ValueTranceteVoteAverage);

  // Переделать на switch case
  const classesColorRated = ['badge-rated'];

  if (valueVoteAverage > 3 && valueVoteAverage < 5) {
    classesColorRated.push('orange');
  }
  if (valueVoteAverage >= 5 && valueVoteAverage < 7) {
    classesColorRated.push('yellow');
  }
  if (valueVoteAverage >= 7) {
    classesColorRated.push('green');
  }

  return (
    <div className='movies-card'>
      <img
        className='movies-card__img'
        src={urlPoster}
        alt={title}
      />
      <span className={classesColorRated.join(' ')}>{valueVoteAverage}</span>
      <h2
        className='movies-card__title'
        title={title}>
        {outTitle(title)}
      </h2>
      <div className='wrap-info-data-and-genres'>
        <span className='movies-card__date-release'>{dateRelease}</span>
        {genresList}
      </div>
      <p className='movies-card__description'>{newOverview}</p>
      <Rated
        valueRating={valueRating}
        id={id}
        guestSessionId={guestSessionId}
      />
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
