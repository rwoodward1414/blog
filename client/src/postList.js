import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';

function PostList() {

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

  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div>
      <h1>Blog</h1>
      <h2>Recent posts</h2>
      <div className='bloglist'>
        {posts.map((post) => (
          <div className='postbox'>
            <h2>{post.title}</h2>
            <p>{truncateText(post.text, 150)}</p>
            <Link to={`/post/${post._id}`}>Read More</Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PostList;