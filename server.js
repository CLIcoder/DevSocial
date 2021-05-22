import { createRequire } from "module";
const require = createRequire(import.meta.url);
import express from "express";
import posts from "./routes/api/posts.js";
import profile from "./routes/api/profile.js";
import users from "./routes/api/users.js";
import { URI } from "./config/keys.js";
import mongoose from "mongoose";

const app = express();
//midllwares
app.use(express.json());
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/profile", profile);

// you should use your own URI for mongodb connection
mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running at port ${port}`));
