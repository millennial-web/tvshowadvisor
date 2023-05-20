import s from './style.module.css';
import { BACKDROP_SMALL_BASE_URL } from '../../config';

export const TvShowListItem = ({ tvShow, onClick }) => {
  const onClick_ = () => {
    onClick(tvShow);
  };
  return (
    <div onClick={onClick_} className={s.container}>
      <img
        alt={TvShowListItem.name}
        src={`${BACKDROP_SMALL_BASE_URL}${tvShow.backdrop_path}`}
      />
      <div className={s.title}>
        {tvShow.name.length > 20
          ? tvShow.name.slice(0, 20) + '...'
          : tvShow.name}
      </div>
    </div>
  );
};
