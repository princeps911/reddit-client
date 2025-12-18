import React, { useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPostComments } from '../features/posts/postsSlice';

const PostDetail = () => {
  const { postId } = useParams();
  const dispatch = useDispatch();
  const { currentPost, comments, loading } = useSelector(state => state.posts);

  useEffect(() => {
    dispatch(fetchPostComments(postId));
  }, [dispatch, postId]);

  if (loading) return <p className="status">Loading post and comments...</p>;
  if (!currentPost) return <p className="status error">Post not found</p>;

  return (
    <div className="post-detail">
      <Link to="/" className="back-link">← Back to posts</Link>
      <article className="post-full">
        <h2>{currentPost.title}</h2>
        <p className="meta">by {currentPost.author} • {currentPost.num_comments} comments</p>
        {currentPost.selftext && <p className="selftext">{currentPost.selftext}</p>}
        {currentPost.url && !currentPost.is_self && <a href={currentPost.url} target="_blank" rel="noopener noreferrer">View original</a>}
      </article>

      <section className="comments">
        <h3>Comments</h3>
        {comments.length === 0 ? (
          <p>No comments yet.</p>
        ) : (
          comments.map(comment => (
            <div key={comment.id} className="comment">
              <p className="comment-author">{comment.author}</p>
              <p className="comment-body">{comment.body || '[deleted]'}</p>
            </div>
          ))
        )}
      </section>
    </div>
  );
};

export default PostDetail;