import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { fakePosts } from '../../data/fakeposts';

// Async Thunk to fetch posts
export const fetchPosts = createAsyncThunk(
  'posts/fetchPosts',
  async (subreddit, { rejectWithValue }) => {
    try {
      const response = await axios.get(`https://www.reddit.com/r/${subreddit}.json?limit=25`);
      return response.data.data.children.map(child => child.data);
    } catch (error) {
      return rejectWithValue(error.response?.status || 'Network Error');
    }
  }
);

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    posts: [],
    loading: false,
    error: null,
    selectedSubreddit: 'r/popular',
    cache: {}, // Simple cache: { 'r/popular': [posts] }
  },
  reducers: {
    setSubreddit: (state, action) => {
      state.selectedSubreddit = action.payload;
      // Load from cache if available
      if (state.cache[action.payload]) {
        state.posts = state.cache[action.payload];
        state.error = null;
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
        // Cache the successful result
        state.cache[state.selectedSubreddit] = action.payload;
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.loading = false;

        // Priority: 1. Use cache → 2. Use fake posts → 3. Show error
        if (state.cache[state.selectedSubreddit]) {
          state.posts = state.cache[state.selectedSubreddit];
          state.error = 'Showing cached posts (network issue)';
        } else if (!state.posts.length) {
          // Fallback to fake posts (filter by subreddit if possible)
          const fallback = fakePosts.filter(post =>
            post.subreddit.toLowerCase() === state.selectedSubreddit.toLowerCase()
          );
          state.posts = fallback.length > 0 ? fallback : fakePosts;
          state.error = 'Showing sample posts (check connection for live data)';
          console.warn('API failed - using fake posts fallback');
        } else {
          state.error = 'Failed to load new posts';
        }
      });
  },
});

export const { setSubreddit } = postsSlice.actions;
export default postsSlice.reducer;