import React, {useEffect, useState} from 'react';
import { Link, useNavigate } from 'react-router-dom';

function PostList() {

  const[posts, setPosts] = useState([]);
  const navigate = useNavigate();

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

  let tags = [];

  posts.forEach((post) => {
    post.tags.forEach((tag) => {
      if (!tags.includes(tag)){
        tags.push(tag);
      }
    });
  });

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

export default PostList;