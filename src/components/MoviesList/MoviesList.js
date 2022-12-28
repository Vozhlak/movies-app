import React, {Component} from 'react';
import './MoviesList.css';
import { CardMovies } from '../CardMovies/CardMovies';
import TheMovieDBService from '../../services/movie-service';

export class MoviesList extends Component {
  state = {
    movies: []
  };

  componentDidMount() {
    const movies =  new TheMovieDBService().getMovies();
    movies.then(el => {
      this.setState({movies: el});
    });
  }

  render() {
    const {movies} = this.state;
    console.log(movies);
    return (
      <ul className='movies-list'>
        {
          movies.map(movieItem => (
            <li className='movies-list__item' key={movieItem.id}>
              <CardMovies
                title={movieItem.title}
                overview={movieItem.overview}
                posterUrl={movieItem.poster_path}
                releaseDate={movieItem.release_date}/>
            </li>
          ))
        }
      </ul>
    );
  };
};
