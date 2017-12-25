const mongoose = require("mongoose");
const { Schema } = mongoose; //using es6 destructuring

const UserSchema = new Schema({
	googleID: String,
	credits: {
		type: Number,
		default: 0
	}
});

mongoose.model("users", UserSchema);
