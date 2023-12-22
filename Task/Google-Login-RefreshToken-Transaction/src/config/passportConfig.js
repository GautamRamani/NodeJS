const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const { User } = require('../model/userModel');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id)
    .then(user => {
      done(null, user);
    })
    .catch(err => {
      done(err, null);
    });
});

passport.use(new GoogleStrategy({
  //please take from google auth (google console) if not create please create google auth
  clientID: 'clientID',
  clientSecret: 'clientSecret',
  callbackURL: 'https://25fb-27-54-182-197.ngrok-free.app/auth/google/callback',  //ngrok for run server on https
}, async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ email: profile.emails[0].value }).exec();

    if (user) {
      return done(null, user);
    }

    const newUser = new User({
      name: profile.displayName,
      email: profile.emails[0].value,
      password: 'password',
      type: 'GoogleUser',
      wallet: 0,
      token: accessToken,
      profilePicture: profile.photos && profile.photos[0] ? profile.photos[0].value : null
    });

    user = await newUser.save();
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));