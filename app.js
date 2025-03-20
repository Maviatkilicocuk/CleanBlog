const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");
const path = require("path");
const app = express();
const Post = require("./models/Post");

//Templates Engine
app.set("view engine", "ejs");

//Connect DB
mongoose.connect("mongodb://localhost/cleanblog-test-db");

//Middlerwares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method'));

//ROUTES
app.get("/", async (req, res) => {
  const posts = await Post.find({});
  res.render("index", {
    posts,
  });
});
app.get("/posts/:id", async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post,
  });
});
app.get("/about", (req, res) => {
  res.render("about");
});
app.get("/add_post", (req, res) => {
  res.render("add_post");
});

app.post("/post", async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
});

app.get("/posts/edit/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  res.render("edit", {
    post,
  });
});

app.put("/posts/:id", async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.name = req.body.name;
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.post = req.body.post;
  post.save();
  res.redirect(`/posts/${req.params.id}`);
});

const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
