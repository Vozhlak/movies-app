import './MoviesList.css';
import CardMovies from '../CardMovies/CardMovies';

function MoviesList({ movies, guestSessionId }) {
  return (
    <ul className='movies-list'>
      {movies.map(
        ({
          id,
          title,
          overview,
          poster_path: posterUrl,
          release_date: releaseDate,
          vote_average: voteAverage,
          rating,
          genre_ids: genresIds
        }) => (
          <li
            className='movies-list__item'
            key={id}>
            <CardMovies
              id={id}
              title={title}
              overview={overview}
              posterUrl={posterUrl}
              releaseDate={releaseDate}
              voteAverage={voteAverage}
              guestSessionId={guestSessionId}
              rating={rating}
              genresIds={genresIds}
            />
          </li>
        )
      )}
    </ul>
  );
}

export default MoviesList;
