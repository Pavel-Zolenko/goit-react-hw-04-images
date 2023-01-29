import PropTypes from 'prop-types';
import { useState } from 'react';
import css from './Searchbar.module.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function  Searchbar({onSubmit}) {
  const [searchQuery, setSearchQuery] = useState('')
  
  const onSearchInput = event => {
    setSearchQuery(event.currentTarget.value);
   };

  const handleSubmit = event => {
    event.preventDefault();

    if (!searchQuery.trim()) {
      return toast.error("Введите название картинки")
    }

    onSubmit(searchQuery);
  };

  
    return (
      <header className={css.searchBar}>
        <form className={css.searchForm} onSubmit={handleSubmit}>
          <button type="submit" className={css.searchForm__button}>
            <span className={css.searchForm__buttonlabel}></span>
          </button>

          <input
            className={css.searchForm__input}
            type="text"
            name="searchQuery"
            autoComplete="off"
            autoFocus
            value={searchQuery}
            onChange={onSearchInput}
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  
}



Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};