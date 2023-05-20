import { FiveStarRating } from '../FiveStarRating/FiveStarRating';
import { TvShowProviders } from '../TvShowProviders/TvShowProviders';
import s from './style.module.css';

export const TvShowDetails = ({ tvShow, providers, defaultCountry }) => {
  const rating = tvShow.vote_average / 2;

  return (
    <div>
      <h3>TV Show Details</h3>
      <div className={s.title}>{tvShow.name}</div>
      <div className={s.rating_container}>
        <FiveStarRating rating={rating} />
        <span className={s.rating}>{rating}/5</span>
      </div>
      <div className={s.overview}>{tvShow.overview}</div>
      {/* WATCH PROVIDERS */}
      <div className={s.tv_show_providers}>
        <TvShowProviders
          providers={providers}
          defaultCountry={defaultCountry}
        />
      </div>
    </div>
  );
};
