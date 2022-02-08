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
    let sql = "SELECT * FROM posts JOIN user WHERE users.id=authorId ORDER BY date DESC LIMIT 20;";
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
};

// update
exports.updatePost = (req, res, next) => {
    if (req.file) {
        let sql = `SELECT * FROM posts WHERE id = ?`;
        pool.execute(sql, [req.params.id], function (err, result) {
            if (err) res.status(400).json({ e });
            if (!result[0]) res.status(400).json({ message: "Aucun id ne correspond dans la table" });
            else {
                // si le post a une image, la supprimer
                if (result[0].imageUrl != "") {
                    const name = result[0].imageUrl.split('/images/')[1];
                    fs.unlink(`images/${name}`, () => {
                        if (err) console.log(err);
                        else console.log('Image modifiée !');
                    })
                }
                // récupérer la nouvelle image 
                let image = (req.file) ? `${req.protocol}://${req.get('host')}/images/${req.file.filename}` : "";
                let message = (req.body.post) ? req.body.post.text : " ";
                const post = {
                    description: message,
                    imageUrl: image,
                    date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" })
                };
                // update la database
                let sql2 = `UPDATE posts SET description = ?, imageUrl= ?, creation_date = ? WHERE id = ?`;
                pool.execute(sql2, [post.message, post.imageUrl, post.date, req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Publication à jour` });
                });
            }
        });
    } else {
        // si modification sur les textes 
        const message = (req.body.post) ? req.body.post.description : " ";
        const post = {
            description: message,
            date: new Date().toLocaleString("af-ZA", { timeZone: "Europe/Paris" })
        };
        // update la database
        let sql2 = `UPDATE posts SET description = ?, creation_date =? WHERE id = ?`;
        pool.execute(sql2, [post.description, post.date, req.params.id], function (err, result) {
            if (err) throw err;
            res.status(201).json({ message: `Publication à jour !` });
        });
    }
};

// delete
exports.deletePost = (req, res, next) => {
    let sql = `SELECT * FROM posts WHERE postId = ?`;
    pool.execute(sql, [req.params.id], function (err, result) {
        if (err) res.status(400).json({ err });
        if (!result[0]) res.status(400).json({ message: "Aucun id ne correspond dans la table" });
        else {
            if (result[0].authorId == req.body.userId) {
                if (result[0].imageUrl != "") {
                    const name = result[0].imageUrl.split('/images/')[1];
                    fs.unlink(`images/post/${name}`, () => {
                        if (err) console.log(err);
                        else console.log('Image supprimée !');
                    })
                }
                let sql2 = `DELETE FROM posts WHERE postId = ?`;
                pool.execute(sql2, [req.params.id], function (err, result) {
                    if (err) throw err;
                    res.status(201).json({ message: `Post supprimé !` });
                });
            } else {
                res.status(401).json({message : "Non autorisé ! "});
            }

        }
    });
};