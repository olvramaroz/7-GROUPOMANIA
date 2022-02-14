const models = require("../models")
const Post = models.posts
const Comment = models.comments
const User = models.users

// findAllPosts
exports.findAllPosts = (req, res, next) => {
    Post.findAll({
        include: {
            model: User,
            required: true,
            attributes: ["firstname", "lastname", "userpicture", "isActive"]
        },
        order: [["id", "DESC"]]
    })
    .then(posts => {
        const ListePosts = posts.map(post => {
            return Object.assign({},
                {
                    id: post.id,
                    createdAt: post.createdAt,
                    post: post.post,
                    imageUrl: post.imageUrl,
                    UserId: post.UserId,
                    firstname: post.User.firstname,
                    lastname: post.User.lastname,
                    userpicture: post.User.userpicture,
                    isActive: post.User.isActive
                }
            )
        })
        res.status(200).json({ ListePosts })
    })
    .catch(error => res.status(400).json({ error }))
}

// findAllPostsForOne
exports.findAllPostsForOne = (req, res, next) => {
    Post.findAll({
        where: { UserId: req.params.id },
        include: {
            model: User,
            required: true,
            attributes: ["firstname", "lastname", "isActive"]
        },
        order: [["id", "DESC"]]
    })
    .then(posts => {
        const ListePosts = posts.map(post => {
            return Object.assign({},
                {
                    id: post.id,
                    createdAt: post.createdAt,
                    post: post.post,
                    imageUrl: post.imageUrl,
                    UserId: post.UserId,
                    firstname: post.User.firstname,
                    lastname: post.User.lastname,
                    userpicture: post.User.userpicture,
                    isActive: post.User.isActive
                }
            )
        })
        res.status(200).json({ ListePosts })
    })
    .catch(error => res.status(400).json({ error }))
}

// findOnePost
exports.findOnePost = (req, res, next) => {
    const onePost = {}
    Post.findOne({ 
        where: { id: req.params.id },
        include: {
            model: User,
            required: true,
            attributes: ["firstname", "lastname", "userpicture", "isActive"] 
        }
    })
    .then(post => {
        onePost.id = post.id
        onePost.userId = post.UserId
        onePost.userpicture = post.User.userpicture
        onePost.firstname = post.User.firstname
        onePost.lastname = post.User.lastname
        onePost.isActive = post.User.isActive
        onePost.createdAt = post.createdAt
        onePost.post = post.post
        onePost.imageUrl = post.imageUrl
    })
    .then(() => {
        Comment.count({ where: { postId: req.params.id }})
        .then(commentCount => {
            onePost.commentaire = commentCount
            res.status(200).json(onePost)
        })
    })
    .catch(error => res.status(404).json({ error }))
}

// createPost
exports.createPost = (req, res, next) => {
    let getImage =""
    if (req.file) { getImage = `${req.protocol}://${req.get("host")}/images/${req.file.filename}` }
    const post = new Post(
        {
            UserId: req.body.UserId,
            post: req.body.post,
            imageUrl: getImage
        }
    )
    post.save()
        .then((retour) => res.status(201).json({ message: "Post created !" }))
        .catch(error => res.status(400).json({ error }))
}

// Modifier un message
exports.modifyPost = (req, res, next) => {
    const postObject = req.file ?
      {
        ...req.body.post,
        imageUrl: `${req.protocol}://${req.get("host")}/images/${req.file.filename}`
      } : { ... req.body}

    Post.update({ ...postObject, id:  req.params.id}, { where: { id: req.params.id }})
    .then(() => res.status(200).json({ post: "Post modified !" }))
    .catch(error => res.status(400).json({ error }))
}

// deletePost
exports.deletePost = (req, res, next) => {
  Post.destroy({ where: { id: req.params.id }})
        .then(() => res.status(200).json({ message: "Post removed !" }))
        .catch(error => res.status(400).json({ error }))
}