import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { truncateText, timeCreated } from './functions';

function FrontPage() {
  let[posts, setPosts] = useState([]);
  const navigate = useNavigate();
  let tags = [];

  // Grabs all posts
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

  // Sorts posts by when they were created
  posts = posts.sort(function(a, b){
    return new Date(b.createdAt) - new Date(a.createdAt);
  });

  // Adds tags to tags array
  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tags.includes(tag)){
        tags.push(tag);
      }
    });
  });

  // When tag buttons are clicked,
  // navigate to page that lists post with that tag
  const handleClick = (tag) => {
    navigate('/posts/' + tag);
  }
 
  return (
    <div>
      <h2>Recent posts</h2>
      <div class="container">
        <div className='bloglist'>
          {posts.map((post) => (
            <div className='postbox'>
              <h2>{post.title}</h2>
              <p>{timeCreated(post.createdAt)}</p>
              <p>{truncateText(post.text, 150)}</p>
              <Link to={`/post/${post._id}`}>Read More</Link>
            </div>
          ))}
        </div>
        <aside>
          <p>About me text text text text</p>
          <h2>Tags</h2>
          {tags.map((tag) => (
            <button onClick={function () {handleClick(tag)}}>{tag}</button>
          ))}
        </aside>
      </div>
    </div>
  );
}

export default FrontPage;