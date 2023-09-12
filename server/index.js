const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const Post = require("./model.js");
const User = require("./account.js");
const cookieParser = require('cookie-parser');
const cors = require('cors');
const { createUser, logIn, verifyToken } = require('./auth.js');

const corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
};

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(cors(corsOptions));

// Creates a new account and stores a token in a cookie
app.post('/user/createAccount', async(req, res) => {
  try {
    const { username, password } = req.body;
    const token = await createUser(username, password);
    console.log(token);
    res.cookie("token", token, { httpOnly: true }).status(200).send("Token sent!");
  } catch (error) {
    res.status(400).json({message: error.message});
  }
});

// Logs user in and gives new token cookie
app.post('user/login', async(req, res) => {
  try {
    const { username, password } = req.body;
    token = await logIn(username, password);
    res.cookie("token", token, { httpOnly: true }).status(200).send("Token sent!");
  } catch (error) {
    res.status(500).json({message: error.message});
  }
});

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
  const token = req.cookies.token;
  if (! token){
    res.status(403).send("Token is required");
  } else if (! verifyToken) {
    res.status(401).send("Token invalid");
  } else {
    const post = await Post.create(req.body);
    res.status(200).json({});
  }
});
  
// Deletes a blog post using it's ID
app.delete('/post/:id', async(req, res) => {
  const token = req.cookies.token;
  if (! token){
    res.status(403).send("Token is required");
  } else if (! verifyToken) {
    res.status(401).send("Token invalid");
  }
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