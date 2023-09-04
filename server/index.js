const express = require("express");
const mongoose = require('mongoose');
require('dotenv').config();
const Post = require("./model.js")

const app = express();
app.use(express.json());

app.get("/", function (req, res) {
    res.send("Hello World!");
  });
  
  app.get("/posts", async(req, res) => {
      try {
          const posts = await Post.find({});
          res.status(200).json(posts);
      } catch (error) {
          res.status(500).json({message: error.message});
      }
  });
  
  app.post("/post", async(req, res) => {
      const post = await Post.create(req.body);
      res.status(200).json({});
  });
  
  app.delete('/post/:id', async(req, res) => {
      try {
          const {id} = req.params;
          const post = await Post.findByIdAndDelete(id);
          res.status(200);
      } catch (error) {
          res.status(500).json({message: error.message});
      }
  });

  app.get('/post/:id', async(req, res) => {
    try {
      const {id} = req.params;
      const post = await Post.findById(id);
      res.status(200).json(post);
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