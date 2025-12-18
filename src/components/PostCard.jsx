import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { upvotePost, downvotePost, toggleSavePost } from '../features/posts/postsSlice';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const dispatch = useDispatch();
  const { savedPosts } = useSelector(state => state.posts);

  const timeAgo = new Date(post.created_utc * 1000).toLocaleString();
  const isSaved = savedPosts.includes(post.id);

  const handleShare = () => {
    navigator.clipboard.writeText(post.url || `https://reddit.com${post.permalink}`);
    alert('Link copied to clipboard!');
  };

  return (
    <article className="post-card">
      <div className="vote">
        <button onClick={() => dispatch(upvotePost(post.id))}>↑</button>
        <span className={post.score > 0 ? 'positive' : post.score < 0 ? 'negative' : ''}>
          {post.score}
        </span>
        <button onClick={() => dispatch(downvotePost(post.id))}>↓</button>
      </div>
      <div className="thumbnail">
        {post.thumbnail && post.thumbnail.startsWith('http') ? (
          <img src={post.thumbnail} alt="thumbnail" />
        ) : (
          <div className="placeholder-thumb">📄</div>
        )}
      </div>
      <div className="content">
        <h3>
          <Link to={`/post/${post.id}`}>{post.title}</Link>
        </h3>
        <div className="meta">
          <span>{post.author}</span> • <span>{timeAgo}</span> • <span>{post.num_comments} comments</span>
        </div>
        <div className="actions">
          <Link to={`/post/${post.id}`}>Comments</Link>
          <button onClick={handleShare}>Share</button>
          <button onClick={() => dispatch(toggleSavePost(post.id))} className={isSaved ? 'saved' : ''}>
            {isSaved ? 'Saved' : 'Save'}
          </button>
        </div>
      </div>
    </article>
  );
};

export default PostCard;