
import { useState } from 'react';
import Header from './components/Header';
import SubredditSelector from './components/SubredditSelector';
import PostList from './components/PostList';
import { fakePosts, subreddits } from './data/fakePosts';
import './App.css';

function App() {
  const [selectedSubreddit, setSelectedSubreddit] = useState(subreddits[0]);
  const [posts] = useState(fakePosts);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={isDarkMode ? 'dark-mode' : ''}>
      <Header isDarkMode={isDarkMode} onToggleDarkMode={toggleDarkMode} />
      <main className="container " id="m-cont">
        <SubredditSelector 
          selectedSubreddit={selectedSubreddit}
          onSelect={setSelectedSubreddit}
        />
        <PostList posts={posts} />
      </main>
    </div>
  );
}

export default App;