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
      clientID: "2205879946273416",
      clientSecret: "ab61b08667d3376166f52f98957b5c24",
      callbackURL: "http://localhost:8000/auth/facebook/callback",
      profileFields: [
        "id",
        "displayName",
        "photos",
        "email",
        "gender",
        "name",
        "birthday",
      ],
    },
    function (accessToken, refreshToken, profile, cb) {
      User.findOne({ facebookId: profile.id })
        .then((user) => {
          if (user) {
            return cb(null, user);
          }
          const newUser = new User({
            username: profile.displayName,
            first_name: profile.displayName,
            last_name: profile.displayName,
            password: null,
            dob: profile.birthday,
            facebookId: profile.id,
            sex: profile.gender,
            profilePicture: profile.photos,
            userType: "Facebook",
          });
          newUser
            .save()
            .then((result) => {
              return cb(null, newUser);
            })
            .catch((err) => {
              return cb(err);
            });
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.serializeUser(function (user, done) {
  done(null, user.id);
});

passport.deserializeUser(async function (id, done) {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err);
  }
});
