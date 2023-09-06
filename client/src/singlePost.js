import { useParams, useNavigate } from 'react-router-dom';
import React, {useEffect, useState} from 'react';
import { timeCreated } from './functions';

function SinglePost() {
    const {id} = useParams();
    const[post, setPost] = useState([]);
    let navigate = useNavigate();

    // Grabs post with specifed ID
    const fetchPost = () => {
      fetch('/post/' + id)
      .then(res => res.json())
      .then(data => {
        setPost(data)
      });
    }
  
    useEffect(() => {
      fetchPost()
    }, []);

    return(
        <div>
            <button onClick={() => navigate(-1)}>Back</button>
            <h2>{post.title}</h2>
            <p>{timeCreated(post.createdAt)}</p>
            <p>{post.text}</p>
        </div>
    );
}

export default SinglePost;