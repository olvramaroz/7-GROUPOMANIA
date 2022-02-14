const db = require("../models")
const Comment = db.comments
const User = db.users

// createComment
exports.createComment = (req, res, next) => {
    const comment = new Comment(
        {
            UserId: req.body.UserId,
            postId: req.body.postId,
            comment: req.body.comment
        }
    )
    comment.save()
    .then(() => res.status(201).json({ message: "Comment added !" }))
    .catch(error => res.status(400).json({ error }))
}

// findAllComments
exports.findAllComments = (req, res, next) => {
    const CommentsForOnePost = {}
    Comment.findAll({ 
        where: { 
            PostId: req.params.id 
        },
        include: {
            model: User,
            required: true,
            attributes: ["firstname", "lastname", "userpicture", "isActive"]
        }, 
        order: [["id", "DESC"]]
    })
    .then(posts => { res.status(200).json(posts) })
    .catch(error => res.status(400).json({ error }))
}

// findOneComment
exports.findOneComment = (req, res, next) => {
    Comment.findOne({ 
        where: { 
            id: req.params.id 
        },
        include: {
            model: User,
            required: true,
            attributes: ["firstname", "lastname"]
        }
    })
    .then(comment => { res.status(200).json(comment) })
    .catch(error => res.status(404).json({ error }))
}

// modifyComment
exports.modifyComment = (req, res, next) => { 
    Comment.update({ ...req.body }, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ message: "Comment modified !" }))
    .catch(error => res.status(400).json({ error }))
  }

// deleteComment
exports.deleteComment = (req, res, next) => {
  Comment.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Comment removed !" }))
        .catch(error => res.status(400).json({ error }))
}