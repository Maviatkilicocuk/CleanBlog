const Post = require('../models/Post');

exports.getAllPosts = async (req, res) => {

  const page = req.query.page || 1;
  const postPerpage = 2;

  const totalPosts = await Post.find().countDocuments();

  const posts = await Post.find({})
  .sort('-dateCreated')
  .skip((page-1)*postPerpage)
  .limit(postPerpage)

  res.render("index", {
    posts : posts,
    current : page,
    pages : Math.ceil(totalPosts / postPerpage)
  });
};

exports.getPost = async (req, res) => {
  const post = await Post.findById(req.params.id);
  res.render("post", {
    post,
  });
};

exports.createPost = async (req, res) => {
  await Post.create(req.body);
  res.redirect("/");
};

exports.updatePost = async (req, res) => {
  const post = await Post.findOne({ _id: req.params.id });
  post.name = req.body.name;
  post.title = req.body.title;
  post.detail = req.body.detail;
  post.post = req.body.post;
  post.save();
  res.redirect(`/posts/${req.params.id}`);
};

exports.deletePost = async (req, res) => {
  await Post.findByIdAndDelete(req.params.id);
  res.redirect("/");
};
