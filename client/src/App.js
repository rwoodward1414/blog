import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './postList';
import SinglePost from './singlePost';

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<PostList />}></Route>
        <Route path="/post/:id" element={<SinglePost />}></Route>
      </Routes>
    </Router>
  );
}

export default App 