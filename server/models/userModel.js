const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  password: { type: String, required: true },
  dob: { type: Date, required: true },
  private: { type: Boolean, required: true },
  profilePicture: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Image",
    default: null,
  },
  sex: { type: String, enum: ["Male", "Female", "Else"], default: "Else" },
  friendList: { type: Array, required: true, default: [] },
  friendRequest: { type: Array, required: true, default: [] },
});

UserSchema.virtual("name").get(function () {
  return `${this.first_name} ${this.last_name}`;
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
