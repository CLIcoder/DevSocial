import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  content: {
    type: String,
    require: true,
  },
  comments: [{ id: String, content: String }],
  likes: [{ id: String, content: Boolean }],
});

const Profile = model("Post", schema);

export default Profile;
