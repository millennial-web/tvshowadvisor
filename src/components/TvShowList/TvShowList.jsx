import { TvShowListItem } from '../TvShowListItem/TvShowListItem';
import s from './style.module.css';

export const TvShowList = ({ recommended, onClickItem }) => {
  const scrollContainer = document.getElementById('recommendations');
  if (scrollContainer) {
    scrollContainer.addEventListener('wheel', (evt) => {
      evt.preventDefault();
      scrollContainer.scrollLeft += evt.deltaY;
    });
  }
  return (
    <div>
      <div className={s.title}>Related TV Series:</div>
      <div id="recommendations" className={s.list}>
        {recommended.map((RecTvShow) => {
          return (
            <span className={s.tv_show_item} key={RecTvShow.id}>
              <TvShowListItem tvShow={RecTvShow} onClick={onClickItem} />
            </span>
          );
        })}
      </div>
    </div>
  );
};
