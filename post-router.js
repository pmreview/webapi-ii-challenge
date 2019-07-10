const express = require('express');
const db = require('./data/db');
const router = express.Router();

router.use(express.json());

// GET all the posts
router.get('/', (req, res) => {
    db
    .find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({ message: "The posts information could not be retrieved." })
    })
})

router.get('/:id', (req, res) => {
    const postID = req.params.id

    db
    .findById(postID)
    .then(posts => {
        if(posts) {
            res.status(200).json(posts)
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The post information could not be retrieved." })
    })
})

router.get('/:id/comments', (req, res) => {
    const postID = req.params.id;

    db
    .findCommentById(postID)
    .then(msg => {
        if(msg){
            res.status(200).json(msg);
        } else {
            res.status(400).json({ message: "The post with the specified ID does not exist." });
        }
    })
    .catch(err => {
        res.status(500).json({ message: "The comments information could not be retrieved." });
    });
})

router.post('/', (req, res) => {
    const postInfo = req.body;

    if(!postInfo.title && !postInfo.contents){
        res.status(400).json({ message: "Please provide title and contents for the post." })
    } else {
        db
        .insert(postInfo)
        .then(post => {
            res.status(200).json(post)
        })
        .catch(err => {
            res.status(500).json({ error: "There was an error while saving the post to the database." })
        })
    }
})

router.post('/:id/comments', (req, res) => {
    const commentInfo = req.body;
    
})

module.exports = router;