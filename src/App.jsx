import { useState } from 'react';
import Header from './components/Header';
import SubredditSelector from './components/SubredditSelector';
import PostList from './components/PostList';
import { fakePosts, subreddits } from './data/fakePosts';
import './App.css';

function App() {
  const [selectedSubreddit, setSelectedSubreddit] = useState(subreddits[0]);
  const [posts] = useState(fakePosts); // In real app, this will come from API

  return (
    <>
      <Header />
      <main className="container">
        <SubredditSelector 
          selectedSubreddit={selectedSubreddit}
          onSelect={setSelectedSubreddit}
        />
        <PostList posts={posts} />
      </main>
    </>
  );
}

export default App;