import { FiveStarRating } from '../FiveStarRating/FiveStarRating';
import { TvShowProviders } from '../TvShowProviders/TvShowProviders';
import s from './style.module.css';

export const TvShowDetails = ({ tvShow, providers, defaultCountry }) => {
  const rating = tvShow.vote_average / 2;

  return (
    <div className={s.details_container}>
      <div className={s.title}>{tvShow.name}</div>
      <div className={s.rating_container}>
        <FiveStarRating rating={rating} />
        <span className={s.rating}>{rating.toFixed(1)}/5</span>
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
