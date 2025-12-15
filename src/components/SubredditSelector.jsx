import React from 'react';
import { subreddits } from '../data/fakePosts';

const SubredditSelector = ({ selectedSubreddit, onSelect }) => {
  return (
    <div className="subreddit-selector">
      {subreddits.map(sub => (
        <button
          key={sub}
          className={selectedSubreddit === sub ? 'active' : ''}
          onClick={() => onSelect(sub)}
        >
          {sub}
        </button>
      ))}
    </div>
  );
};

export default SubredditSelector;