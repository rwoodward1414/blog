import { useParams } from 'react-router-dom';
import React, {useEffect, useState} from 'react';

function SinglePost() {
    const {id} = useParams();
    const[post, setPost] = useState([]);

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
            <h2>{post.title}</h2>
            <p>{post.text}</p>
        </div>
    );
}

export default SinglePost;