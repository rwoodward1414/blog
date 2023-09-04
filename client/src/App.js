import React, {useEffect, useState} from 'react'

function App() {

  const[posts, setPosts] = useState([]);

  const fetchPosts = () => {
    fetch("/posts")
    .then(res => res.json())
    .then(data => {
      setPosts(data)
    });
  }

  useEffect(() => {
    fetchPosts()
  }, []);

  return (
    <div>
      <h1>Blog Posts</h1>
      <div className='bloglist'>
        {posts.map((post) => (
          <div className='postbox'>
            <h2>{post.title}</h2>
            <p>{post.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App 