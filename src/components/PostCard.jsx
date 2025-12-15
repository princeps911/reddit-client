// src/components/PostCard.jsx
import React from 'react';

const PostCard = ({ post }) => {
  const timeAgo = new Date(post.created).toLocaleTimeString();

  return (
    <article className="post-card">
      <div className="vote">
        <button>↑</button>
        <span>{post.score}</span>
        <button>↓</button>
      </div>
      <div className="thumbnail">
        <img src={post.thumbnail} alt="thumbnail" />
      </div>
      <div className="content">
        <h3>{post.title}</h3>
        <div className="meta">
          <span>{post.author}</span> • <span>{timeAgo}</span> • <span>{post.numComments} comments</span>
        </div>
        <div className="actions">
          <button>Comments</button>
          <button>Share</button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;