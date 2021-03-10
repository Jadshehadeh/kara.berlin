const express = require("express");
const router = express.Router();
const Post = require("./post.model");

router.post("/create", CreatePost);
router.get("/getposts", getPosts);
router.get("/:id", getAllPostsForUserId);
router.put("/status", updateStatus);
// router.delete("/:id", _delete);

module.exports = router;

async function CreatePost(req, res, next) {
  var post = new Post({
    userId: req.body.userId,
    title: req.body.title,
    description: req.body.description,
  });
  await post
    .save()
    .then((posts) => res.status(201).json(posts))
    .catch((err) => res.status(400).json({ message: err.message }).next(err));
}

async function getPosts(req, res, next) {
  await Post.find()
    .populate("userId", "-hash")
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json({ message: err.message }).next(err));
}

async function updateStatus(req, res, next) {
  await Post.findByIdAndUpdate(req.body.id, {
    status: req.body.status,
  })
    .then(() => res.json({}))
    .catch((err) => res.status(400).json({ message: err.message }).next(err));
}

async function getAllPostsForUserId(req, res, next) {
  await Post.find({ userId: req.params.id })
    .populate("userId", "-hash")
    .sort({ createdAt: -1 })
    .then((posts) => res.status(200).json(posts))
    .catch((err) => res.status(400).json({ message: err.message }).next(err));
}

// async function addComment(req, res, next) {
//   const comment = {
//     text: req.body.text,
//     userId: req.body.userId,
//     createdAt: req.body.createdAt,
//   };
//   await Post.findByIdAndUpdate(
//     req.params.id,
//     {
//       $push: { comments: comment },
//     },
//     {
//       new: true,
//     }
//   ).exec((error, result) => {
//     if (error) {
//       return res.status(422).json({ error });
//     } else {
//       res.json(result);
//     }
//   });
// }

// async function getComments(req, res, next) {
//   await Post.findById(req.params.id)
//     .populate("comments")
//     .populate("comments.userId", "-hash -createdDate")
//     .sort({ createdAt: -1 })
//     .then((comments) => res.status(200).json(comments))
//     .catch((err) => res.status(400).json({ message: err.message }).next(err));
// }
