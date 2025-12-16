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
if (posts.length === 0) return <p className="status error">No posts available.</p>;

return (
  <div className="post-list">
    {error && <p className="status info">{error}</p>}
    {posts.map(post => (
      <PostCard key={post.id} post={post} />
    ))}
  </div>
);
};

export default PostList;