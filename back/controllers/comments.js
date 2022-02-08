const { pool } = require('../config/db');

exports.create = (req, res, next) => {
    const post = {
        comment: req.body.comment,
        authorId: req.body.authorId,
        postId: req.body.postId,
    };
    let sql = `UPDATE posts SET posts.comment = post.comment + 1 WHERE postId=?;`;
    pool.execute(sql, [req.body.postId], function (err, result) {
        if (err) res.status(400).json({ err });
        let sql = `INSERT INTO comments (comment, authorId, postId) VALUES (?,?,?);`;
        pool.execute(sql, [post.comment, post.authorId, post.postId], function (err, result) {
            if (err) throw err;
            console.log(result)
            res.status(201).json({ message: `Commentaire ajouté` });
        })
    });
};

exports.getAll = (req, res, next) => {
    let sql = `SELECT * from comments c JOIN user u WHERE c.authorId = u.id ORDER BY idComment;`;
    pool.execute(sql, function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}

exports.delete = (req, res, next) => {
    let sql3 = `SELECT * from comments WHERE idComment=?`;
    pool.execute(sql3, [req.params.commentId], function (err, result) {
        if (result[0].authorId == req.body.userId) {
            if (err) res.status(400).json({ err });
            let sql2 = `DELETE from comments WHERE idComment=?;`;
            pool.execute(sql2, [req.params.commentId], function (err, result) {
                if (err) res.status(400).json({ err });
                let sql = `UPDATE posts SET posts.comment = post.comment - 1 WHERE postId=?;`;
                pool.execute(sql, [req.params.postId], function (err, result) {
                    if (err) res.status(400).json({ err });
                    res.status(200).json(result)
                });
            })
        } else {
            res.status(400).json({ message : "Non autorisé !" });   
        }
    });

}