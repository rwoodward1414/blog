import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './postList';
import SinglePost from './singlePost';
import TaggedPosts from './TaggedPosts';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PostList />}></Route>
        <Route path="/post/:id" element={<SinglePost />}></Route>
        <Route path="/posts/:tag" element={<TaggedPosts />}></Route>
      </Routes>
    </Router>
  );
}

export default App 