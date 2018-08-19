const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bycrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/keys');
const passport = require('passport');

// Load Input Validation
const validateRegisterInput = require('../../validation/register')
const validateLoginInput = require('../../validation/login')


// Load User model
const User = require('../../models/User')


// @route   GET api/users/test
// @desc    Test post route
// @access  Public 
router.get('/test', (req, res)=> res.json({
    msg: "Users Works"

}))
// @route   POST api/users/register
// @desc    Register user
// @access  Private 
router.post('/register', (req, res) => {

    const { errors, isValid } = validateRegisterInput(req.body)

    // Check validation
    if(!isValid){
        return res.status(400).json(errors)
    }

    User.findOne({email: req.body.email})
        .then(user => {
            if(user){
                errors.email = 'Email already exists'
                return res.status(400).json(errors)
            }
            else {
                const avatar = gravatar.url(req.body.email, {
                    s: '200', // Size of the avatar
                    r: 'pg', // Rating
                    d: 'mm' // Default pic
                })

                // Create new User
                const newUser = new User({
                    name: req.body.name,
                    email: req.body.email,
                    avatar,
                    password: req.body.password,
                })
                
                // Encrypt the password by adding a Salt. Then, save that password in the DB
                bycrypt.genSalt(10, (err, salt) => {
                    bycrypt.hash(newUser.password, salt, (err, hash) => {
                        if (err){
                            throw err;
                        }
                        newUser.password = hash
                        newUser.save()
                        .then(user => res.json(user))
                        .catch(err => console.log(err))
                    })
                })
            }
        })

})

// @route   GET api/users/login
// @desc    Login user / Returning JWT Token
// @access  Public 

router.post('/login', (req, res) => {

    const { errors, isValid } = validateLoginInput(req.body)
    const email = req.body.email
    const password = req.body.password

    // Check Validation

    if (!isValid) {
        return res.status(400).json(errors)
    }

    // Find user by email

    User.findOne({ email })
        .then(user => {
            // Check for user
            if (!user) {
                errors.email = 'User not found'
                return res.status(404).json(errors)
            }

            // Check Password and compare it with the one stored in the DB. (Comparison of HASHES)
            bycrypt.compare(password, user.password)
                .then(isMatch => {
                    if(isMatch) {
                        // User Matched 

                        // Create Payload to pass to the jwt.sign()
                        const payload = {
                            id: user.id,
                            name: user.name,
                            avatar: user.avatar
                        }

                        // Sign Token
                        jwt.sign(payload, keys.secretOrKey, { expiresIn: 3600 }, (error, token) => {
                            res.json({
                                success: true,
                                token: 'Bearer ' + token
                            })
                        })
                    }
                    else {
                        errors.password = 'Password Incorrect'
                        return res.status(400).json(errors)
                    }
                })
        })
})


// @route   GET api/users/current
// @desc    Return current user
// @access  Private

router.get('/current', passport.authenticate('jwt', { session : false }), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email
    })
})

module.exports = router;