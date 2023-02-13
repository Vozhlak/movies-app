import React, { Component } from 'react';

import { Alert, Spin, Empty, Pagination } from 'antd';

import MovieServiceContext from '../MovieAppServiceContext/MovieAppServiceContext';
import MoviesList from '../MoviesList/MoviesList';
import Search from '../Search/Search';
import TheMovieDBService from '../../services/movie-service';
import './App.css';
import Header from '../Header/Header';

export default class App extends Component {
  moviesApi = new TheMovieDBService();

  state = {
    movies: [],
    ratedMovies: [],
    genres: [],
    search: '',
    numberPage: 1,
    numberPageRated: 1,
    totalPages: 0,
    totalPagesRatedMovies: 0,
    guestSessionId: '',
    tabKey: '1',
    isLoading: true,
    isError: false,
    notFound: false
  };

  componentDidMount() {
    const sessionID = localStorage.getItem('guestSessionId');
    if (!sessionID || sessionID === 'undefined') {
      this.createGuestSession();
    } else {
      this.setState({
        isLoading: false,
        guestSessionId: sessionID
      });
    }
    this.getGenresList();
    this.getPopularMovies();
  }

  createGuestSession = () => {
    this.moviesApi
      .getGuestSession()
      .then((data) => {
        localStorage.setItem('guestSessionId', `${data.guest_session_id}`);
        this.setState({
          guestSessionId: data.guest_session_id,
          isLoading: false
        });
      })
      .catch(this.onError);
  };

  getPopularMovies = () => {
    const { numberPage } = this.state;

    this.setState({
      isLoading: true,
      isError: false,
      notFound: false
    });

    this.moviesApi
      .getPopularMovies(numberPage)
      .then(({ results, page, total_pages: totalPages }) => {
        if (results.length === 0) {
          this.setState({
            isLoading: false,
            notFound: true
          });
        }

        this.setState({
          movies: results,
          isLoading: false,
          totalPages,
          numberPage: page
        });
      })
      .catch(this.onError);
  };

  getSearchMovies = () => {
    const { search, numberPage } = this.state;
    this.setState({
      isLoading: true,
      isError: false,
      notFound: false
    });

    if (search === '') {
      this.getPopularMovies();
    } else {
      this.moviesApi
        .getSearchMovies(search, numberPage)
        .then(({ results, page, total_pages: totalPages }) => {
          if (results.length === 0) {
            this.setState({
              isLoading: false,
              notFound: true
            });
          }

          this.setState((prevState) => {
            const { prevNumbersPage } = prevState;
            return {
              movies: results,
              isLoading: false,
              prevNumbersPage: { ...prevNumbersPage },
              numberPage: page,
              totalPages
            };
          });
        })
        .catch(this.onError);
    }
  };

  searchChangeQuery = (searchQuery) => {
    this.setState(
      {
        search: searchQuery,
        numberPage: 1
      },
      () => this.getSearchMovies()
    );
  };

  changePage = (page) => {
    const { tabKey } = this.state;
    if (tabKey === '1') {
      this.setState({ numberPage: page }, () => this.getSearchMovies());
    } else {
      this.setState({ numberPageRated: page }, () => this.getRatedMovies());
    }
  };

  onError = () => {
    this.setState({ isLoading: false, isError: true, totalPages: 0 });
  };

  getRatedMovies = () => {
    const { guestSessionId, numberPageRated } = this.state;
    this.setState({
      isLoading: true,
      isError: false,
      notFound: false
    });

    this.moviesApi
      .getRatedMovies(guestSessionId, numberPageRated)
      .then(({ results, page, total_pages: totalPages }) => {
        if (results.length === 0) {
          this.setState({
            isLoading: false,
            notFound: true
          });
        }

        this.setState({
          ratedMovies: results,
          isLoading: false,
          totalPagesRatedMovies: totalPages,
          numberPageRated: page
        });
      })
      .catch(this.onError);
  };

  changeTab = (key) => {
    const { numberPage, movies } = this.state;
    if (key === '2') {
      this.setState(
        {
          notFound: true,
          tabKey: key,
          numberPageRated: 1
        },
        () => this.getRatedMovies()
      );
    } else {
      this.setState({
        isError: false,
        notFound: false,
        tabKey: key,
        numberPage,
        movies
      });
    }
  };

  getGenresList = () => {
    this.moviesApi.getGenresList().then((res) => {
      this.setState({ genres: [...res.genres] });
    });
  };

  render() {
    const {
      movies,
      ratedMovies,
      isLoading,
      isError,
      notFound,
      totalPages,
      totalPagesRatedMovies,
      numberPage,
      numberPageRated,
      guestSessionId,
      tabKey,
      genres,
      search: searchValue
    } = this.state;

    const spin = isLoading ? (
      <Spin
        className='spin'
        tip='Loading...'
        size='large'
      />
    ) : null;

    const error = isError ? (
      <Alert
        className='alert'
        message='Error'
        description='Что-то пошло не так. Но мы скоро все исправим :-)'
        type='error'
        showIcon
      />
    ) : null;

    const pagination =
      totalPages > 0 && !isLoading && !notFound ? (
        <Pagination
          defaultCurrent={tabKey === '1' ? numberPage : numberPageRated}
          current={tabKey === '1' ? numberPage : numberPageRated}
          total={tabKey === '1' ? totalPages * 10 : totalPagesRatedMovies * 10}
          showSizeChanger={false}
          onChange={this.changePage}
        />
      ) : null;

    const hasData = !(isLoading || isError);
    const content = hasData ? (
      <MoviesList
        movies={movies}
        ratedMovies={ratedMovies}
        guestSessionId={guestSessionId}
        tabKey={tabKey}
      />
    ) : null;
    const foundContent = notFound ? <Empty /> : content;
    const search =
      tabKey === '1' ? (
        <Search
          searchChangeQuery={this.searchChangeQuery}
          searchValue={searchValue}
        />
      ) : null;

    return (
      <div className='app'>
        <MovieServiceContext.Provider value={genres}>
          <div className='content'>
            <Header changeTab={this.changeTab} />
            {search}
            {spin}
            {foundContent}
            {error}
            {pagination}
          </div>
        </MovieServiceContext.Provider>
      </div>
    );
  }
}
