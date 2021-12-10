const router = require("express").Router();
const { User, Post, Comment } = require("../models");
const withAuth = require("../utils/withAuth");

//Sends the homepage
router.get("/", async (req, res) => {
  try {
    const postData = await Post.findAll({ include: User });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("homepage", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sends the login page
router.get("/login", async (req, res) => {
  try {
    res.render("login");
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sends the dashboard page
router.get("/dashboard", withAuth, async (req, res) => {
  try {
    const postData = await Post.findAll({
      where: { user_id: req.session.user_id },
      include: User,
    });
    const posts = postData.map((post) => post.get({ plain: true }));
    res.render("dashboard", { posts, logged_in: req.session.logged_in });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sends a singular post page
router.get("/post/:id", withAuth, async (req, res) => {
  try {
    const postData = await Post.findOne({
      where: { id: req.params.id },
      include: User,
    });
    const commentData = await Comment.findAll({
      where: { post_id: req.params.id },
      include: User,
    });

    const post = postData.get({ plain: true });
    const comments = commentData.map((comment) => comment.get({ plain: true }));

    res.render("post", {
      post,
      comments,
      logged_in: req.session.logged_in,
      user_id: req.session.user_id,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// Sends create a post page
router.get("/create", withAuth, async (req, res) => {
  res.render("createPost", {
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
});

router.get("/edit/:id", withAuth, async (req, res) => {
  const postData = await Post.findOne({
    where: { id: req.params.id },
    include: User,
  });

  const post = postData.get({ plain: true });

  res.render("editPost", {
    post,
    logged_in: req.session.logged_in,
    user_id: req.session.user_id,
  });
});

module.exports = router;