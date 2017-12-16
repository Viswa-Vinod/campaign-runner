const mongoose = require("mongoose");
const { Schema } = mongoose; //using es6 destructuring

const UserSchema = new Schema({
	googleID: String
});

mongoose.model("users", UserSchema);
