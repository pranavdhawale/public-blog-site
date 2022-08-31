const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
const mongoose = require("mongoose");
const blogx = require("./views/blogs.js");


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
// mongoose.connect(`mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONNGODB_PASS}@alpha-blogs.6jxbwpk.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true }).then(()=>{
mongoose.connect(`mongodb+srv://DrasticCoder:edCSZJ5evbBH605H@alpha-blogs.6jxbwpk.mongodb.net/?retryWrites=true&w=majority`, { useNewUrlParser: true }).then(()=>{
  console.log("mongodb connected...")
})

const postSchema = {
  title: String,
  date : String,
  time : Number,
  content: String
};

const Post = mongoose.model("Post", postSchema);

let category = [];
let hashTag;
let todaysDate;

const date = new Date();
todaysDate = date.toDateString()

app.use('/posts', blogx)

app.get("/", (req, res) => {
  res.render("index");
})

app.get('/compose', requiresAuth(), (req, res) => {
  res.render('compose');
});

app.get('/profile', requiresAuth(), (req, res) => {
  let user = req.oidc.user;
  res.render('profile',
  {image:user.picture,
    name:user.name,
    nickname:user.nickname,
    email:user.email,
    givenName:user.given_name,
    familyName:user.family_name,
    language:user.locale,
    verificationStatus:user.email_verified});
 })

app.post('/addCategory', requiresAuth(), (req, res) => {
  res.send( res.redirect("/login"));
});

app.get("/categories", (req, res) => {
  category = ["Education", "Fashion", "Art", "Photography", "Fun", "Information", "Music"]

  res.render("categories", { category: category });
})

app.get("/blogs", (req, res) => {

  Post.find({}, function (err, posts) {
    res.render("blogs", {
      posts: posts
    });
  })
})

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  res.render("contact", {});
});

app.get("/compose", (req, res) => {
  res.render("compose");
})

app.get("/reviews", (req, res) => {
  Post.find({}, function (err, posts) {
    res.render("reviews", {
      posts: posts
    });
  })
  
})

app.post("/addCategory", (req, res) => {
  hashTag = {
    tag: req.body.postTitle
  };
  category.push(hashTag);

  res.redirect("/categories")
})

app.post("/compose", (req, res) => {

  let content = req.body.postBody;
  let readT = readTime(wordCount(content));
  const post = new Post({
    title: req.body.postTitle,
    date:todaysDate,
    time:readT,
    content: content
  });

  if(wordCount(content)!=0){
    post.save(err=> {
    if (!err) {
      res.redirect("/blogs");
    }else{
      console.log(err);
    }
  });
}
});

app.get("/post/:postId", (req, res) => {
  const requestedPostId = req.params.postId;

  Post.findOne({ _id: requestedPostId }, function (err, post) {

    res.render("post", {
      title: post.title,
      date: post.date,
      time: post.time,
      content: post.content
    });
  });
});

function wordCount(str) {
  str = str.replace(/(^\s*)|(\s*$)/gi, "");
  str = str.replace(/[ ]{2,}/gi, " ");
  str = str.replace(/\n /, "\n");
  count = str.split(' ').length;
  return count;
}

function readTime(wordCount){
  let readT = wordCount/125;
  readT = Math.round(readT);
  return readT;
}

app.listen(port, () => {
  console.log("Server started on port " + port);
});
