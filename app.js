//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const res = require("express/lib/response");
const _ = require("lodash");
const mongoose = require("mongoose");

require('dotenv').config();
const port = process.env.PORT || 3000;

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// Authentication using Auth0
const { auth,requiresAuth } = require('express-openid-connect');

const config = {
  authRequired: false,
  auth0Logout: true,
  secret: process.env.SECRET,
  baseURL: process.env.BASE_URL,
  clientID: process.env.CLIENT_ID,
  issuerBaseURL: process.env.ISSUER_BASE_URL
};

app.use(auth(config));

// Connection with mongodb database
mongoose.connect("mongodb://localhost:27017/blogDB", { useNewUrlParser: true });

const postSchema = {
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

const homeStartingContent = "Hey! Welcome to our Public Blogging Website. This is just A sample of a simple blogging website.";

let category = [];
let hashTag;
let todaysDate;

const date = new Date();
todaysDate = date.toDateString()

app.get("/", (req, res) => {
  res.render("index");
})

app.get('/compose', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? res.render('compose') : res.redirect("/login"));
});

app.get('/profile', requiresAuth(), (req, res) => {
  res.send(JSON.stringify(req.oidc.user))
})

app.post('/addCategory', (req, res) => {
  res.send(req.oidc.isAuthenticated() ? res.redirect('/addCategory') : res.redirect("/login"));
});

app.get("/categories", (req, res) => {
  category = ["Education", "Fashion", "Art", "Photography", "Fun", "Information", "Music"]

  res.render("categories", { category: category });
})

app.get("/blogs", (req, res) => {

  Post.find({}, function (err, posts) {
    res.render("blogs", {
      homeStartingContent: homeStartingContent,
      posts: posts
    });
  })
})

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", { homeStartingContent: homeStartingContent });
});

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.get("/reviews", (req, res) => {
  res.send("reviews about alpha blogs to be added here...");
})

app.post("/addCategory", (req, res) => {
  hashTag = {
    tag: req.body.postTitle
  };
  category.push(hashTag);

  res.redirect("/categories")
})

app.post("/compose", (req, res) => {

  const post = new Post({
    title: req.body.postTitle,
    content: req.body.postBody
  });

  post.save(err=> {
    if (!err) {
      res.redirect("/blogs");
    }
  });
});

app.get("/post/:postId", (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {

    res.render("post", {
      title: post.title,
      content: post.content
    });
  });
});

app.listen(port, () => {
  console.log("Server started on port " + port);
});
