const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  password: { type: String, required: true },
  bio: { type: String, default: null },
  dob: { type: Date, default: null },
  private: { type: Boolean, required: true },
  profilePicture: {
    type: String,
    default: null,
  },
  sex: { type: String, enum: ["Male", "Female", "Else"], default: "Else" },
  friendList: { type: Array, required: true, default: [] },
  friendRequests: { type: Array, required: true, default: [] },
  notifications: { type: Array, required: true, default: [] },
});

UserSchema.virtual("name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
