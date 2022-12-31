export default class TheMovieDBService {
  _apiBase = '';

  getService = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, received ${res.status}`);
    }

    return res.json();
  };

  async getMovies() {
    const res = await this.getService(
      'https://api.themoviedb.org/3/search/movie?api_key=d11df534410ac29be906c40d858c0420&language=en-US&query=return&page=1&include_adult=false'
    );
    return res.results;
  }
}
