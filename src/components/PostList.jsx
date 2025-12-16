import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './PostCard';
import { fetchPosts } from '../features/posts/postsSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, selectedSubreddit } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
  }, [dispatch, selectedSubreddit]);

  if (loading) return <p className="status">Loading posts from {selectedSubreddit}...</p>;
  if (error) return <p className="status error">{error}</p>;

  return (
    <div className="post-list">
      {posts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
};

export default PostList;