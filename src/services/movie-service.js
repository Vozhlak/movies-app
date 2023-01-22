export default class TheMovieDBService {
  apiKey = 'd11df534410ac29be906c40d858c0420';

  apiBase = 'https://api.themoviedb.org/3/';

  getDataFromServer = async (url) => {
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Could not fetch ${url}, received ${res.status}`);
      }
      return await res.json();
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Возникла проблема с fetch запросом: ', error.message);
      return error.message;
    }
  };

  getPopularMovies = async (pageNumber = 1) => {
    const url = `${this.apiBase}movie/popular?api_key=${this.apiKey}&language=en-US&page=${pageNumber}`;
    const res = await this.getDataFromServer(url);
    return res;
  };

  getSearchMovies = async (searchQuery, pageNumber = 1) => {
    const url = `${this.apiBase}search/movie?api_key=${this.apiKey}&&query=${searchQuery}&page=${pageNumber}`;
    const res = await this.getDataFromServer(url);
    return res;
  };

  getGuestSession = async () => {
    const url = `${this.apiBase}authentication/guest_session/new?api_key=${this.apiKey}`;
    const res = await this.getDataFromServer(url);
    return res;
  };

  setMovieRating = async (id, guestSessionId, rate) => {
    const url = `${this.apiBase}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`;
    const body = {
      value: rate
    };
    await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json;charset=utf-8' },
      body: JSON.stringify(body)
    }).catch((err) => {
      // eslint-disable-next-line no-console
      console.error('Возникла проблема с fetch запросом: ', err.message);
    });
  };

  getRatedMovies = async (guestSessionId, pageNumber = 1) => {
    const url = `${this.apiBase}guest_session/${guestSessionId}/rated/movies?api_key=${this.apiKey}&page=${pageNumber}`;
    const res = await this.getDataFromServer(url);
    return res;
  };

  deleteRate = async (guestSessionId, id) => {
    const url = `${this.apiBase}movie/${id}/rating?api_key=${this.apiKey}&guest_session_id=${guestSessionId}`;
    const headers = {
      'Content-Type': 'application/json;charset=utf-8'
    };
    await fetch(url, {
      method: 'DELETE',
      headers
    });
  };

  getGenresList = async () => {
    const url = `${this.apiBase}genre/movie/list?api_key=${this.apiKey}&language=en-US`;
    const res = await this.getDataFromServer(url);
    return res;
  };
}
