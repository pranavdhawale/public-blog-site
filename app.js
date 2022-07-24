//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
require('dotenv').config();
const port = process.env.PORT || 3000;

const ejs = require("ejs");
const res = require("express/lib/response");
const _ = require("lodash");

const homeStartingContent = "Hey! Welcome to our Public Blogging Website. This is just A sample of a simple blogging website.";
// const aboutContent = "This is Public Blogging website that we've developing as major project. Technologies used in this website : Node.js, Express.js, Body-Parser, Lodash and EJS Templating.";
// const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

// var post = {};
var posts = [];
var post;
var postT;
var serchFound;
var category = [];
var hashTag;
var todaysDate;

const date = new Date();
todaysDate = date.toDateString()



app.get("/", (req, res) => {
  res.render("index");
})

app.get("/signin", (req, res) => {
  res.send("Sign in working... Authentication with Auth0 required")
})

app.get("/categories", (req, res) => {
  category = ["Education", "Fashion", "Art", "Photography", "Fun", "Information", "Music"]

  res.render("categories", { category: category });
})

app.get("/blogs", (req, res) => {
  res.render("blogs", { homeStartingContent: homeStartingContent, posts: posts, postT: postT });
})

app.get("/about", (req, res) => {
  res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", (req, res) => {
  // res.render("contact",{contactContent:contactContent});
  //res.sendFile(__dirname+"/views/contact-us.html")
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

  post = {
    title: req.body.postTitle,
    date: todaysDate,
    time: req.body.readTime,
    content: req.body.postBody
  };
  posts.push(post);

  posts.forEach((post) => {
    // console.log(post.title);
    postT = post.title;
  });

  res.redirect("/blogs");
});

app.get("/posts/:postName", (req, res) => {
  const requestedTitle = _.lowerCase(req.params.postName);

  posts.forEach((post) => {
    const storedTitle = _.lowerCase(post.title);

    if (storedTitle === requestedTitle) {
      res.render("post", {
        title: post.title,
        content: post.content,
        date: todaysDate,
        time: post.time
      }
      )
    }
  })
});



app.listen(port, () => {
  console.log("Server started on port " + port);
});
