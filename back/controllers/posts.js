const { pool } = require('../config/db');
const fs = require("fs");

/************************
  ------- POSTS
************************/
// create
exports.createPost = (req, res, next) => {
    const message = (req.body.description) ? req.body.description : " ";
    const image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";

    const post = {
        description: message,
        imageUrl: image,
        like: 0,
        comment: 0,
        date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" }),
        authorId: req.body.userId,
    };

    let sql = `INSERT INTO posts (description, imageUrl, creation_date, authorId)  VALUES (?,?,?,?);`;
    pool.execute(sql, [post.description, post.imageUrl, post.date, post.authorId], function (err, result) {
        if (err) throw err;
        res.status(201).json({ message: `Publication ajoutée` });
    })
};

// read
exports.getAllPosts = (req, res, next) => {
    let sql = "SELECT * FROM posts JOIN users WHERE users.id=authorId ORDER BY date DESC LIMIT 50;";
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
};

exports.getPostByAuthor = (req, res, next) => {
    let sql = `SELECT * FROM posts JOIN users WHERE users.id=authorId AND authorId=? ORDER BY date DESC;`;
    pool.execute(sql, [req.body.id], function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
};

// update
exports.updatePost = (req, res, next) => {
    console.log("modify post");
};

// delete
exports.deletePost = (req, res, next) => {
    console.log("delete post");
};


/************************
  ------- COMMENTS
************************/
// create

// read

// update

// delete


/************************
  ------- LIKES
************************/
// create

// read

// update

// delete