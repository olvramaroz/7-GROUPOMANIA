const { pool } = require('../config/db');

exports.like = (req, res, next) => {
    let sql = "SELECT * FROM groupoval.likes;";
    pool.execute(sql, function (err, results) {
        if (err) res.status(400).json({ err });
        let userLiked = false;
        for (const result of results) {
            if (req.body.userId == result.userId && req.body.postId == result.postId) {
                userLiked = true;
            }
        }
        if (!userLiked) {
            let sql = `UPDATE posts SET posts.like = posts.like + 1 WHERE postId=?;`;
            pool.execute(sql, [req.body.postId], function (err, result) {
                if (err) res.status(400).json({ err });
                let sql2 = `INSERT INTO groupoval.likes (postId, userId) VALUES (?,?);`;
                pool.execute(sql2,[req.body.postId, req.body.userId], function (err, result) {
                    if (err) res.status(400).json({ err });
                    res.status(200).json(result)
                });
            });
        } else {
            let sql = `UPDATE posts SET posts.like = posts.like - 1 WHERE postId=?;`;
            pool.execute(sql,[req.body.postId], function (err, result) {
                if (err) res.status(400).json({ err });
                let sql2 = `DELETE FROM groupoval.likes l WHERE l.postId = ? AND l.userId = ?`;
                pool.execute(sql2,[req.body.postId,req.body.userId], function (err, result) {
                    if (err) res.status(400).json({ err });
                    res.status(200).json(result)
                });
            });
        }
    });
}

exports.liked = (req, res, next) => {
    let sql2 = `SELECT postId FROM groupoval.likes WHERE userId = ?`;
    pool.execute(sql2,[req.body.userId], function (err, result) {
        if (err) res.status(400).json({ err });
        res.status(200).json(result)
    });
}