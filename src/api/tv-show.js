import axios from 'axios';
import { FAKE_POPULARS, FAKE_RECOMMENDATIONS } from './mock_data';

export class TVShowAPI {
  static async fetchPopular(mock = false) {
    if (mock) {
      return FAKE_POPULARS;
    }
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/trending/tv/day${process.env.REACT_APP_TMDB_API_KEY}`
    );
    return response.data.results;
  }

  static async fetchRecomendations(TvShowId, mock = false) {
    if (mock) {
      return FAKE_RECOMMENDATIONS;
    }
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/tv/${TvShowId}/recommendations${process.env.REACT_APP_TMDB_API_KEY}`
    );
    if (response.data.results.length) {
      return response.data.results;
    }
    return FAKE_RECOMMENDATIONS;
  }

  static async fetchWatchProviders(TvShowId) {
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/tv/${TvShowId}/watch/providers${process.env.REACT_APP_TMDB_API_KEY}`
    );
    return response;
  }

  static async search(query) {
    const response = await axios.get(
      `${process.env.REACT_APP_TMDB_BASE_URL}/search/tv${process.env.REACT_APP_TMDB_API_KEY}&query=${query}`
    );
    if (response.data.results.length) {
      return response.data.results;
    }
  }
}
