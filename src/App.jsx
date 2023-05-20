import { useEffect, useState } from 'react';
import { TVShowAPI } from './api/tv-show';
import { TvShowDetails } from './components/TvShowDetail/TvShowDetail';
import { Logo } from './components/Logo/Logo';
import logoImg from './assets/images/logo.png';
import { TvShowList } from './components/TvShowList/TvShowList';
import { SearchBar } from './components/SearchBar/SearchBar';

import s from './style.module.css';

const MOCK = false;

export const App = () => {
  const [currentTVShow, setCurrentTVShow] = useState(null);
  const [recommendationList, setRecommendationList] = useState([]);
  const [providers, setProviders] = useState([]);

  const defaultCountry = 'MX';

  //async await func to be called inside of useEffect
  const getPopularShows = async () => {
    try {
      const results = await TVShowAPI.fetchPopular(MOCK);
      setCurrentTVShow(results[0]);
    } catch (error) {
      alert('Could not fetch Popular TV Shows');
    }
  };

  //async await func to be called inside of useEffect
  const getRecommendations = async (TvShowId) => {
    const results = await TVShowAPI.fetchRecomendations(TvShowId, MOCK);
    setRecommendationList(results.slice(0, 10));
  };

  const doFetchWatchProviders = async (TvShowId) => {
    const response = await TVShowAPI.fetchWatchProviders(TvShowId);
    let providers = [];
    if (response.data.results) {
      const provKeys = Object.keys(response.data.results);
      if (provKeys.length) {
        providers = provKeys.map((countryCode) => {
          return {
            country: countryCode,
            ...response.data.results[countryCode],
          };
        });
      }
    }
    setProviders(providers);
  };

  const getBackdropStyles = () => {
    return currentTVShow
      ? `url("${process.env.REACT_APP_BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
      : 'black';
  };

  useEffect(() => {
    getPopularShows();
  }, []);

  useEffect(() => {
    if (currentTVShow) {
      getRecommendations(currentTVShow.id);
      doFetchWatchProviders(currentTVShow.id);
    }
  }, [currentTVShow]);

  const updateCurrentTvShow = (tvShow) => {
    setCurrentTVShow(tvShow);
  };

  return (
    <div
      className={s.main_container}
      style={{
        background: getBackdropStyles(),
      }}
    >
      <div className={s.overlay}>
        {/* HEADER */}
        <div className={s.header}>
          <div className="row">
            <div className="col-md-12 col-lg-4">
              {/* LOGO */}
              <div>
                <Logo
                  img={logoImg}
                  title={process.env.REACT_APP_TITLE}
                  subtitle="Find a show you may like"
                />
              </div>
            </div>
            <div className="col-md-12 col-lg-4">
              {/* SEARCHBAR */}
              <SearchBar onSelectItem={setCurrentTVShow} />
            </div>
          </div>
        </div>

        {/* SHOW DETAILS */}
        <div className={s.tv_show_detail}>
          {currentTVShow && (
            <TvShowDetails
              tvShow={currentTVShow}
              providers={providers}
              defaultCountry={defaultCountry}
            />
          )}
        </div>

        {/* RECOMMENDATIONS */}
        <div className={s.recommended_tv_shows}>
          <TvShowList
            recommended={recommendationList}
            onClickItem={updateCurrentTvShow}
          />
        </div>
      </div>
    </div>
  );
};
