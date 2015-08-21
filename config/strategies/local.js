/**
 * Created by Justin on 8/20/2015.
 */

var passport = require('passport'),
    LocalStrategy = require('passport-local'),
    User = require('mongoose').model('User');

model.exports = function() {
    passport.use(new LocalStrategy(function(username, password, done){
        User.findOne({
            username: username
        }, function(err, user){
            if(err) {
                return done(err);
            }
            if(!user){
                return done(null, false, {
                    message: 'Unknown user'
                });
            }
            if(!user.authenticate(password)){
                return done(null, false, {
                    message: 'Invalid password'
                });
            }
            return done(null, user);
        });
    }));
};