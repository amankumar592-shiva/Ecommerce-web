import dotenv from 'dotenv';
dotenv.config();

import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import User from '../models/usermodel.js';

//  1. Google Strategy
passport.use(new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: process.env.GOOGLE_CALLBACK_URL,
  },
  async (accessToken, refreshToken, profile, done) => {
    console.log(" Google Profile Received:", profile);

    try {
      //  Check if user already exists
      const existingUser = await User.findOne({ email: profile.emails?.[0]?.value });

      if (existingUser) {
        console.log(" Existing user found in DB:", existingUser.email);
        return done(null, existingUser); //  Send user to session
      }

      //  Create new user if not found
      const newUser = new User({
        googleId: profile.id,
        name: profile.displayName || 'No Name',
        email: profile.emails?.[0]?.value || `no-email-${Date.now()}@example.com`,
        photo: profile.photos?.[0]?.value || '',
        password: 'google-auth',       //  Dummy password
        phone: '0000000000',           //  Dummy phone
        address: { googleLogin: true },
        answer: 'none',                //  Dummy answer
      });

      await newUser.save();
      console.log(" New Google user saved:", newUser.email);
      return done(null, newUser);
    } catch (err) {
      console.error(" Google Auth Error:", err);
      return done(err, false);
    }
  }
));

//  2. Serialize User (Save user ID in session)
passport.serializeUser((user, done) => {
  console.log(" Serialize user ID:", user._id);
  done(null, user._id);
});

//  3. Deserialize User (Recover user from DB using session ID)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);

    if (!user) {
      console.warn(" Deserialization Failed — User not found in DB");
      return done(null, false);  //  Force logout
    }

    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
