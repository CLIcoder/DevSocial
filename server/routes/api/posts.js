import { Router } from "express";
import authenticateToken from "../../middlwares/auth-token.js";
import Post from "../../model/Post/Post.js";
import { countLikes, likeFunc } from "../../utils.js";

const route = Router();

// @route   GET api/posts
// @desc    get all posts
// @access  Private

route.get("/", authenticateToken, async (req, res) => {
  try {
    const posts = await Post.find();
    res.json(posts);
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server Error");
  }
});

// @route   POST api/posts
// @desc    Add new post
// @access  Private

route.post("/", authenticateToken, async (req, res) => {
  try {
    const request = req.body;
    const result = new Post({ user: req.user._id, ...request });
    await result.save();
    res.status(200).send("saved");
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @route   POST api/posts/comment
// @desc    Add comment to post
// @access  Private

route.post("/comment/:id", authenticateToken, async (req, res) => {
  try {
    Post.findOne({ _id: req.params.id }).then(({ comments }) => {
      const newArray = [...comments, { ...req.body }];
      Post.findOneAndUpdate(
        { _id: req.params.id },
        { $set: { comments: [...newArray] } },
        { new: true }
      ).then((result) => res.json(result));
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @route   POST api/posts/like
// @desc    Add like to post
// @access  Private

route.post("/like/:id", authenticateToken, async (req, res) => {
  try {
    Post.findOne({ _id: req.params.id }).then(({ likes: { users } }) => {
      const newArray = likeFunc([...users], req.body.id);
      const amount = countLikes(newArray);
      Post.findOneAndUpdate(
        { _id: req.params.id },
        {
          $set: {
            likes: {
              amount,
              users: [...newArray],
            },
          },
        },
        { new: true }
      ).then((result) => res.json(result));
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @route   POST api/posts/
// @desc    get post by id
// @access  Private

route.get("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findOne({ _id: req.params.id });

    if (!post) return res.status(404).json({ msg: "Post not found" });

    res.status(200).json(post);
  } catch (err) {
    res.status(400).send("Server Error");
  }
});

// @route   POST api/posts/
// @desc    delete post with id
// @access  Private

route.delete("/:id", authenticateToken, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ msg: "Post not found" });
    }

    // Check user
    if (post.user.toString() !== req.user._id) {
      return res.status(401).json({ msg: "User not authorized" });
    }

    await post.remove();

    res.json({ msg: "Post removed" });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default route;
