import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fakePosts } from '../../data/fakePosts';

export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json?limit=50`);
      return response.data.data.children.map(child => child.data);
    } catch (error) {
      return rejectWithValue(error.response?.status || 'Network Error');
    }
  }
);

export const fetchPostComments = createAsyncThunk(
  'posts/fetchPostComments',
  async (postId, { getState, rejectWithValue }) => {
    const { posts } = getState().posts;
    const post = posts.find(p => p.id === postId);
    if (!post) return rejectWithValue('Post not found');

    try {
      const response = await axios.get(`https://www.reddit.com${post.permalink}.json`);
      const comments = response.data[1].data.children.map(child => child.data);
      return { post, comments };
    } catch (error) {
      return rejectWithValue('Failed to load comments');
    }
  }
);

const initialState = {
  posts: [],
  currentPost: null,
  comments: [],
  loading: false,
  error: null,
  selectedSubreddit: 'r/popular',
  searchTerm: '',
  cache: {},
  savedPosts: [],
};

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      if (state.cache[action.payload]) {
        state.posts = state.cache[action.payload];
      }
    },
    setSearchTerm: (state, action) => {
      state.searchTerm = action.payload;
    },
    upvotePost: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) post.score += 1;
    },
    downvotePost: (state, action) => {
      const post = state.posts.find(p => p.id === action.payload);
      if (post) post.score -= 1;
    },
    toggleSavePost: (state, action) => {
      if (state.savedPosts.includes(action.payload)) {
        state.savedPosts = state.savedPosts.filter(id => id !== action.payload);
      } else {
        state.savedPosts.push(action.payload);
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload;
        state.cache[state.selectedSubreddit] = action.payload;
      })
      .addCase(fetchPosts.rejected, (state) => {
        state.loading = false;
        if (!state.cache[state.selectedSubreddit] && state.posts.length === 0) {
          const fallback = fakePosts.filter(p => p.subreddit.toLowerCase().includes(state.selectedSubreddit.slice(2)));
          state.posts = fallback.length > 0 ? fallback : fakePosts;
          state.error = 'Showing sample posts (check connection)';
        }
      })
      .addCase(fetchPostComments.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPostComments.fulfilled, (state, action) => {
        state.loading = false;
        state.currentPost = action.payload.post;
        state.comments = action.payload.comments;
      })
      .addCase(fetchPostComments.rejected, (state) => {
        state.loading = false;
        state.error = 'Failed to load comments';
      });
  },
});

export const { setSubreddit, setSearchTerm, upvotePost, downvotePost, toggleSavePost } = postsSlice.actions;
export default postsSlice.reducer;