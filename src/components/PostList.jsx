// src/components/PostList.jsx
import React from 'react';
import PostCard from './PostCard';

const PostList = ({ posts }) => {
  if (posts.length === 0) {
    return <p>No posts found.</p>;
  }

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;