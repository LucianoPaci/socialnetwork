const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongoose = require('mongoose');
const User = mongoose.model('users');
const keys = require('./keys');

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = keys.secretOrKey;

module.exports = (passport) => {
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        User.findById(jwt_payload.id)
        .then( user => {
            if(user) {
                return done(null, user); // If Found, then return done() with no error and the user
            }
            return done(null, false) // If not Found, then return done() with no error and no user
        })
        .catch(err => console.log(err)) 
    }))
}