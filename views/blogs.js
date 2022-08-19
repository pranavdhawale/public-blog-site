const express = require('express')
const router = express.Router();

// middleware that is specific to this router
// router.use((req, res) => {
//     console.log('Time: ', Date.now())
// })

const post = [
    {
        title: "deep", time: 3, date: "Sat Dec 31 3033", content: "somadfjjfjjdkcoid kfjklfsdjf dfjsadfjds jfidjf isdsjf difjifo jdijfafd j;dfk djfo;sdi fdlfj adfjdklf dfdfka dfa dfa fadkj fakjldf akfja ;ljfjaf afa;dfjlkfjasksdfjaslfjsadk"
    },{},{},{},{},{},{},{},{},{},{},{},{},{}
]

// define the home page route
router.get('/', (req, res) => {
    res.send('home page')
})
// define the about route

router.get('/post1', (req, res) => {
    let blog = post[0]
    res.render("post",{title:blog.title,time:blog.time,date:blog.date,content:blog.content});
})

router.get('/post2', (req, res) => {
    let blog = post[1]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post3', (req, res) => {
    let blog = post[2]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post4', (req, res) => {
    let blog = post[3]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post5', (req, res) => {
    let blog = post[4]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post6', (req, res) => {
    let blog = post[5]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post7', (req, res) => {
    let blog = post[6]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post8', (req, res) => {
    let blog = post[7]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post9', (req, res) => {
    let blog = post[8]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post10', (req, res) => {
    let blog = post[9]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post11', (req, res) => {
    let blog = post[10]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post12', (req, res) => {
    let blog = post[11]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post13', (req, res) => {
    let blog = post[12]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

router.get('/post14', (req, res) => {
    let blog = post[13]
    res.render("post", { title: blog.title, time: blog.time, date: blog.date, content: blog.content });
})

module.exports = router