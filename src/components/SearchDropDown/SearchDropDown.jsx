import { useEffect, useState } from 'react';
import s from './style.module.css';
import { FileMinus, FilePlus } from 'react-bootstrap-icons';

export const SearchDropDown = ({ onSelect, results, clearResults }) => {
  const [containerHeight, setContainerHeight] = useState('40vh');

  const toggleMinimizedResults = () => {
    const newHeight = containerHeight === '40vh' ? '0px' : '40vh';
    setContainerHeight(newHeight);
  };

  useEffect(() => {
    if (results && results.length > 0) {
      setContainerHeight('40vh');
    }
  }, [results]);

  return (
    <>
      {results.length > 0 && (
        <>
          <div onClick={toggleMinimizedResults} className={s.header}>
            Search Results: &nbsp; {results.length}
            <div className={s.actions}>
              {containerHeight === '40vh' && (
                <FileMinus
                  onClick={toggleMinimizedResults}
                  className={s.item}
                  size={18}
                />
              )}
              {containerHeight === '0px' && (
                <FilePlus
                  onClick={toggleMinimizedResults}
                  className={s.item}
                  size={18}
                />
              )}
              <button
                className={s.clear_button}
                href="#"
                onClick={clearResults}
                size={18}
              >
                Clear
              </button>
            </div>
          </div>
          <div
            className={`${s.container} ${
              containerHeight === '0px' ? s.minimized : ''
            }`}
            style={{ maxHeight: containerHeight }}
          >
            <ul>
              {results.map((res) => {
                return (
                  <li
                    key={res.id}
                    onClick={() => {
                      onSelect(res);
                      toggleMinimizedResults();
                    }}
                  >
                    {res.name}
                  </li>
                );
              })}
            </ul>
          </div>
        </>
      )}
    </>
  );
};
