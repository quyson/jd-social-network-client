const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const User = require("../models/userModel");
const FacebookStrategy = require("passport-facebook").Strategy;
const passport = require("passport");
require("dotenv").config();

const secretOrKey = process.env.secretOrKey;

const options = {};
options.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
options.secretOrKey = secretOrKey;

passport.use(
  new JwtStrategy(options, (jwt_payload, done) => {
    User.findOne({ _id: jwt_payload.id }).then((user) => {
      if (user) {
        console.log("success");
        return done(null, user);
      } else {
        console.log("error");
        return done(err, false);
      }
    });
  })
);

passport.use(
  new FacebookStrategy(
    {
      clientID: FACEBOOK_APP_ID,
      clientSecret: FACEBOOK_APP_SECRET,
      callbackURL: "http://localhost:8000/auth/facebook/callback",
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOrCreate({ facebookId: profile.id }, function (err, user) {
        return cb(err, user);
      });
    }
  )
);
