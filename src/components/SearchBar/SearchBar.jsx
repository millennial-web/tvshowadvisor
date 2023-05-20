import { useState } from 'react';
import { Search as SearchIcon } from 'react-bootstrap-icons';
import { SearchDropDown } from '../SearchDropDown/SearchDropDown';
import { TVShowAPI } from '../../api/tv-show';

import s from './style.module.css';

export const SearchBar = ({ onSelectItem }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const getSearchResults = async () => {
    const results = await TVShowAPI.search(searchTerm);
    if (results) {
      setSearchResults(results);
    }
  };

  const searchInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  function keyup(e) {
    if (e.key === 'Enter' && searchTerm.trim() !== '') {
      getSearchResults();
    }
  }

  const clearResults = () => {
    console.log(searchTerm);
    setSearchTerm('');
    setSearchResults([]);
  };

  return (
    <div className={s.container}>
      <SearchIcon size={14} className={s.icon} />
      <input
        onChange={searchInputChange}
        onKeyUp={keyup}
        className={s.input}
        type="text"
        value={searchTerm}
        placeholder="Search for a tv show"
      />
      <button onClick={getSearchResults} className={s.button}>
        Search
      </button>
      <SearchDropDown
        results={searchResults}
        onSelect={onSelectItem}
        clearResults={clearResults}
      />
    </div>
  );
};
