import { useState } from 'react';
import s from './style.module.css';
import { FileMinus, FilePlus, FileExcel } from 'react-bootstrap-icons';

export const SearchDropDown = ({ onSelect, results, clearResults }) => {
  const [containerHeight, setContainerHeight] = useState('40vh');

  const toggleMinimizedResults = () => {
    const newHeight = containerHeight === '40vh' ? '0vh' : '40vh';
    setContainerHeight(newHeight);
  };

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
              {containerHeight === '0vh' && (
                <FilePlus
                  onClick={toggleMinimizedResults}
                  className={s.item}
                  size={18}
                />
              )}
              <FileExcel onClick={clearResults} className={s.item} size={18} />
            </div>
          </div>
          <div className={s.container} style={{ maxHeight: containerHeight }}>
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
