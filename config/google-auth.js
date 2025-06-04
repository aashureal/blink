var GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../models/user.model");

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://www.example.com/auth/google/callback",
    },
    async function (accessToken, refreshToken, profile, cb) {
      // try {
      //   let user = await User.findOrCreate(
      //     { email: profile.emails[0].value },
      //     function (err, user) {
      //       return cb(err, user);
      //     }
      //   );
      // } catch (error) {}

      try {
        let user = await User.findOne({ email: profile.emails[0].value });
        if (!user) {
          user = await new User({
            name: profile.displayName,
            email: profile.emails[0].value,
          });
          user.save();
          cb(cb, user);
        }
      } catch (error) {
        cb(error, false);
      }
    }
  )
);
