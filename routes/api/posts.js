const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')
const passport = require('passport')

// Load Models
const Post = require('../../models/Post')
const Profile = require('../../models/Profile')
// Load Validator
const validatePostInput = require('../../validation/post')

// @route   GET api/posts/test
// @desc    Test posts route
// @access  Public
router.get('/test', (req, res) =>
	res.json({
		msg: 'Posts Works'
	})
)

// @route   GET api/posts
// @desc    Get posts
// @access  Public

router.get('/', (req, res) => {
	Post.find()
		.sort({ date: -1 })
		.then((posts) => res.json(posts))
		.catch((err) => res.status(404).json({ noPostsFound: 'No posts found' }))
})

// @route   GET api/posts/:id
// @desc    Get post by Id
// @access  Public

router.get('/:id', (req, res) => {
	Post.findById(req.params.id)
		.then((post) => res.json(post))
		.catch((err) => res.status(404).json({ noPostFound: 'No post found with that ID' }))
})

// @route   POST api/posts
// @desc    Create a Post
// @access  Private

router.post('/', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body)

	if (!isValid) {
		return res.status(400).json(errors)
	}

	const newPost = new Post({
		text: req.body.text,
		name: req.body.name,
		avatar: req.body.avatar,
		user: req.user.id
	})

	newPost.save().then((post) => res.json(post))
})

// @route   DELETE api/posts/:id
// @desc    Delete post by Id
// @access  Private

router.delete('/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id).then((post) => {
			// Check for post owner

			if (post.user.toString() !== req.user.id) {
				return res.status(401).json({ notAuthorized: 'User not authorized' })
			}

			// Delete
			post
				.remove()
				.then(() => res.json({ success: true }))
				.catch((err) => res.status(404).json({ postNotFound: 'No post found' }))
		})
	})
})

// @route   POST api/posts/like/:id
// @desc    Like post
// @access  Private

router.post('/like/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id).then((post) => {
			// If the user already liked the post
			if (post.likes.filter((like) => like.user.toString() === req.user.id).length > 0) {
				return res.status(400).json({ alreadyLiked: 'User already liked this post' })
			}

			// Add user id to likes array
			post.likes.push({ user: req.user.id })

			post.save().then((post) => res.json(post))
		})
	})
})

// @route   DELETE api/posts/unlike/:id
// @desc    Remove like from post
// @access  Private

router.delete('/unlike/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id).then((post) => {
			if (post.likes.filter((like) => like.user.toString() === req.user.id).length == 0) {
				return res.status(400).json({ alreadyLiked: 'Post has not been liked' })
			}

			// Get remove index

			const removeIndex = post.likes.map((item) => item.user.toString()).indexOf(req.user.id)

			// Splice out of array
			post.likes.splice(removeIndex, 1)

			// Save

			post.save().then((post) => res.json(post))
		})
	})
})

// @route   POST api/posts/comment/:id
// @desc    Add comment to a post
// @access  Private

router.post('/comment/:id', passport.authenticate('jwt', { session: false }), (req, res) => {
	const { errors, isValid } = validatePostInput(req.body)

	if (!isValid) {
		return res.status(400).json(errors)
	}

	Post.findById(req.params.id)
		.then((post) => {
			const newComment = {
				text: req.body.text,
				name: req.body.name,
				avatar: req.body.avatar,
				user: req.user.id
			}

			// Add to comments array
			post.comments.unshift(newComment)
			//Save
			post.save().then((post) => res.json(post))
		})
		.catch((err) => res.status(404).json({ postNotFound: 'No post found' }))
})

// @route   DELETE api/posts/comment/:id/:comment_id
// @desc    Remove comment from post
// @access  Private

router.delete('/comment/:id/:comment_id', passport.authenticate('jwt', { session: false }), (req, res) => {
	Profile.findOne({ user: req.user.id }).then((profile) => {
		Post.findById(req.params.id).then((post) => {
			// Check if the comment exist
			if (post.comments.filter((comment) => comment._id.toString() === req.params.comment_id).length === 0) {
				return res.status(404).json({ commentNotExists: 'Comment does not exist' })
			}

			// Get remove index

			const removeIndex = post.comments.map((item) => item._id.toString()).indexOf(req.params.comment_id)

			// Splice out of array
			post.comments.splice(removeIndex, 1)

			// Save

			post.save().then((post) => res.json(post))
		})
	})
})

module.exports = router
