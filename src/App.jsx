// src/App.jsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import SubredditSelector from './components/SubredditSelector';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { selectedSubreddit } = useSelector(state => state.posts);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Router>
        <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
        <main className="container" id="m-cont">
          <Routes>
            <Route path="/" element={
              <>
                <SubredditSelector selectedSubreddit={selectedSubreddit} />
                <PostList />
              </>
            } />
            <Route path="/post/:postId" element={<PostDetail />} />
          </Routes>
        </main>
      </Router>
    </div>
  );
}

export default App;