const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const keys = require("../config/keys");
const mongoose = require("mongoose");

const User = mongoose.model("users"); //this will give a handle to the users collection in the DB

passport.serializeUser((user, done) => {
	//the user.id here is the _id that mongoDB creates for each document. We use this and not the profile.id
	//because the user may have signed in using facebook and not have a googleid (same as profile.id)
	done(null, user.id); //user.id gets stuffed into the cookie by passport
});

passport.deserializeUser((id, done) => {
	//convert the id into a mongoogle user instance and search our DB
	User.findById(id).then(user => {
		done(null, user);
	});
});

passport.use(
	new GoogleStrategy(
		{
			clientID: keys.googleClientID,
			clientSecret: keys.googleClientSecret,
			callbackURL: "/auth/google/callback",
			proxy: true
		},
		(accessToken, refreshToken, profile, done) => {
			User.findOne({ googleID: profile.id }).then(existingUser => {
				if (existingUser) {
					//already have a user with the profile.id
					done(null, existingUser);
				} else {
					//db does not have such a user, so we make one
					new User({ googleID: profile.id })
						.save()
						.then(newUser => done(null, newUser));
				}
			});
		}
	)
);
