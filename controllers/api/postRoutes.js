const router = require('express').Router();
const { Router } = require('express');
const {User, Post} = require('../../models');

// Gets all posts
router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll();
        if (!postData) {
            res.status(404).json({message: 'No post data found'});
            return;
        }
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Post to database
router.post('/', async (req, res) => {
    try {
        req.body.user_id = req.session.user_id;
        const postData = await Post.create(req.body);
        res.status(200).json({postData, message: "Post created"});
    } catch (err) {
        res.status(500).json(err);
    }
});

// Deletes a post by ID
router.delete('/:id', async (req, res) => {
    try {
        await Post.destroy({where: {id: req.params.id}})
        res.status(200).json({ message: "Post deleted" });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', async (req, res) => {
    try {
        req.body.user_id = req.session.user_id;
        const postData = await Post.update(req.body, {where: {id: req.params.id}});
        res.status(200).json({postData, message: "Post updated"});
    } catch (err) {
        res.status(500).json(err);
    }
})

module.exports = router;