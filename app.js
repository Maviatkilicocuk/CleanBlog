const express = require("express");
const mongoose = require("mongoose");
const methodOverride = require("method-override");
const ejs = require("ejs");

const app = express();

const postControllers = require('./controllers/postControllers');
const pageControllers = require('./controllers/pageControllers');

//Templates Engine
app.set("view engine", "ejs");

//Connect DB
mongoose.connect("mongodb://localhost/cleanblog-test-db");

//Middlerwares
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(methodOverride('_method',{
  methods:['POST', 'GET']
}));

//ROUTES
app.get("/", postControllers.getAllPosts);
app.get("/posts/:id", postControllers.getPost );
app.post("/post", postControllers.createPost);
app.put("/posts/:id", postControllers.updatePost);
app.delete("/posts/:id", postControllers.deletePost);

app.get("/about", pageControllers.getAboutPage);
app.get("/add_post", pageControllers.getAddPage);
app.get("/posts/edit/:id", pageControllers.getEditPage);





const port = 3000;
app.listen(port, () => {
  console.log(`Sunucu ${port} portunda başlatıldı.`);
});
