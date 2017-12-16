const passport = require("passport");
//whenever user comes to '/auth/google' we want to kick then into the oauth
//flow which is being entirely managed by passport. So we are asking passport to authenticate the user
//We are also asking passport to use google strategy. Internally, GoogleStrategy has an internal identifier of 'google'
//scope specifies to google what pieces of the user's profile we are interested in.

module.exports = app => {
	app.get(
		"/auth/google",
		passport.authenticate("google", {
			scope: ["profile", "email"]
		})
	);

	//when google sees this, it will now use the code passed as a query parameter to auth/google/callback
	// and send back the user profile details
	app.get("/auth/google/callback", passport.authenticate("google"));

	app.get("/api/logout", (req, res) => {
		req.logout(); //passport attaches a logout method to the req object. When invokes,
		//it takes the cookie that contains the user's id and kills the id that is in there.

		res.send(req.user);
	});
	app.get("/api/current_user", (req, res) => {
		res.send(req.user);
	});
};
