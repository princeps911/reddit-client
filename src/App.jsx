import { useState } from 'react';
import Header from './components/Header';
import SubredditSelector from './components/SubredditSelector';
import PostList from './components/PostList';
import { useSelector } from 'react-redux';
import './App.css';

function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const { selectedSubreddit } = useSelector(state => state.posts);

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={() => setIsDarkMode(!isDarkMode)} />
      <main className="container">
        <SubredditSelector selectedSubreddit={selectedSubreddit} />
        <PostList />
      </main>
    </div>
  );
}

export default App;