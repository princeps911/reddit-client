import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SubredditSelector from './components/SubredditSelector';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import SavedPosts from './components/SavedPosts';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { selectedSubreddit } = useSelector(state => state.posts);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Router>
        <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        <main className="container">
          <Routes>
            <Route path="/" element={
              <>
                <SubredditSelector selectedSubreddit={selectedSubreddit} />
                <PostList />
              </>
            } />
            <Route path="/post/:postId" element={<PostDetail />} />
            <Route path="/saved" element={<SavedPosts />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;