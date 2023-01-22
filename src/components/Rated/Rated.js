import { Component } from 'react';
import { Rate } from 'antd';

import TheMovieDBService from '../../services/movie-service';

import './Rated.css';

export default class RateStars extends Component {
  state = {
    // eslint-disable-next-line react/destructuring-assignment
    ratingValue: localStorage.getItem(this.props.id) || this.props.valueRating
  };

  setMovieRating = (rate) => {
    const { id, guestSessionId } = this.props;
    localStorage.setItem(id, JSON.stringify(rate));
    const apiMovieDbService = new TheMovieDBService();
    this.setState({
      ratingValue: rate
    });

    if (rate !== 0) {
      apiMovieDbService.setMovieRating(id, guestSessionId, rate);
    }

    if (rate === 0) {
      localStorage.removeItem(id);
      apiMovieDbService.deleteRate(guestSessionId, id);
    }
  };

  render() {
    const { ratingValue } = this.state;
    return (
      <Rate
        className='star-list'
        value={Number(ratingValue)}
        count={10}
        onChange={(rate) => {
          this.setMovieRating(rate);
        }}
        allowHalf
      />
    );
  }
}
