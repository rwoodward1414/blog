const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const Post = require("./model.js");

const app = express();
app.use(express.json());

// Gets all blog posts
app.get("/posts", async(req, res) => {
    try {
        const posts = await Post.find({});
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

// Creates a new blog post
app.post("/post", async(req, res) => {
  const post = await Post.create(req.body);
  res.status(200).json({});
});
  
// Deletes a blog post using it's ID
app.delete('/post/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const post = await Post.findByIdAndDelete(id);
    res.status(200);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

  // Gets a post using it's ID
app.get('/post/:id', async(req, res) => {
  try {
    const {id} = req.params;
    const post = await Post.findById(id);
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

// Gets all posts that have specifed tag
app.get('/posts/:tag', async(req, res) => {
  try {
    const {tag} = req.params;
    const posts = await Post.find({ tags: tag });
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});
  

const PORT = process.env.PORT || 3001;

mongoose.connect(process.env.DB_CONN)
.then(() => {
  console.log('Connected!');
  app.listen(PORT, () => {
    console.log(`Server listening on ${PORT}`);
  });
}).catch((error) => {
  console.log(error);
});