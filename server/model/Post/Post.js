import mongoose from "mongoose";
const { Schema, model } = mongoose;

const schema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
  },
  image: String,
  name: String,
  content: {
    type: String,
    require: true,
  },
  comments: [
    {
      id: String,
      status: String,
      image: String,
      name: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  likes: {
    amount: Number,
    users: [{ id: String, status: Boolean }],
  },
  date: {
    type: Date,
    default: Date.now("<YYYY-mm-dd>"),
  },
});

const Profile = model("Post", schema);

export default Profile;
