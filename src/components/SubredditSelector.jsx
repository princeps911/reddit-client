import React from 'react';
import { useDispatch } from 'react-redux';
import { setSubreddit, fetchPosts } from '../features/posts/postsSlice';

const subreddits = ["r/popular", "r/reactjs", "r/javascript", "r/aww", "r/programming"];

const SubredditSelector = ({ selectedSubreddit }) => {
  const dispatch = useDispatch();

  const handleSelect = (sub) => {
    dispatch(setSubreddit(sub));
    dispatch(fetchPosts(sub));
  };

  return (
    <div className="subreddit-selector">
      {subreddits.map(sub => (
        <button
          key={sub}
          className={selectedSubreddit === sub ? 'active' : ''}
          onClick={() => handleSelect(sub)}
        >
          {sub}
        </button>
      ))}
    </div>
  );
};

export default SubredditSelector;