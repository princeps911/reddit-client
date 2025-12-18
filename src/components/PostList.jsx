import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PostCard from './PostCard';
import { fetchPosts } from '../features/posts/postsSlice';

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error, selectedSubreddit, searchTerm } = useSelector(state => state.posts);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    dispatch(fetchPosts(selectedSubreddit));
    setVisibleCount(10);
  }, [dispatch, selectedSubreddit]);

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const visiblePosts = filteredPosts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount(prev => prev + 10);
  };

  if (loading && posts.length === 0) return <p className="status">Loading posts...</p>;
  if (error && posts.length === 0) return <p className="status error">{error}</p>;

  return (
    <div className="post-list">
      {searchTerm && <p className="status info">Searching for "{searchTerm}"</p>}
      {error && <p className="status info">{error}</p>}
      {visiblePosts.map(post => (
        <PostCard key={post.id} post={post} />
      ))}
      {visibleCount < filteredPosts.length && (
        <button className="load-more" onClick={handleLoadMore}>Load More</button>
      )}
    </div>
  );
};

export default PostList;