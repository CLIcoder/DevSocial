import { model, Schema } from "mongoose";
import { imgDefault } from "../../config/keys";

// creating a schema for the User model
const schemaDb = new Schema({
  name: { type: String, require: true },
  email: { type: String, require: true },
  password: { type: String, require: true },
  avatar: { type: String, default: imgDefault },
  date: { type: Date, default: Date.now },
});

//creating a model for mongodb
const User = model("User", schemaDb);

export default User;
