import React, {useEffect, useState} from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { truncateText, timeCreated } from './functions';

function TaggedPosts() {
  const {tag} = useParams();
  const[posts, setPosts] = useState([]);
  let navigate = useNavigate();

  // Grabs all posts with specifed tag
  useEffect(() => {
    fetch('/posts/' + tag)
    .then(res => res.json())
    .then(data => {
      setPosts(data)
    });
  }, [tag]);

  return (
    <div>
      <button onClick={() => navigate(-1)}>Back</button>
      <h2>Posts tagged with "{tag}"</h2>
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
    </div>
  );
}

export default TaggedPosts;