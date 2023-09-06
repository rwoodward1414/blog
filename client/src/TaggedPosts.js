import React, {useEffect, useState} from 'react';
import { Link, useParams } from 'react-router-dom';

function TaggedPosts() {
  const {tag} = useParams();
  const[posts, setPosts] = useState([]);

  // Grabs all posts with specifed tag
  useEffect(() => {
    fetch('/posts/' + tag)
    .then(res => res.json())
    .then(data => {
      setPosts(data)
    });
  }, [tag]);

  // Cuts off text at max length and add ellipsis at end
  const truncateText = (text, maxLength) => {
    if (text.length <= maxLength) {
      return text;
    }
    return text.slice(0, maxLength) + '...';
  };

  return (
    <div>
      <h2>Posts tagged with "{tag}"</h2>
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

export default TaggedPosts;