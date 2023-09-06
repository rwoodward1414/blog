import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage'
import SinglePost from './SinglePost';
import TaggedPosts from './TaggedPosts';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<FrontPage />}></Route>
        <Route path="/post/:id" element={<SinglePost />}></Route>
        <Route path="/posts/:tag" element={<TaggedPosts />}></Route>
      </Routes>
    </Router>
  );
}

export default App 