import React from 'react';
import { useDispatch } from 'react-redux';
import { setSearchTerm } from '../features/posts/postsSlice';

const SearchBar = () => {
  const dispatch = useDispatch();

  return (
    <input
      type="text"
      placeholder="Search posts..."
      className="search-bar"
      onChange={(e) => dispatch(setSearchTerm(e.target.value))}
    />
  );
};

export default SearchBar;