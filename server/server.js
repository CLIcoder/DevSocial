//in case I wanna use require module
//import { createRequire } from "module";
//const require = createRequire(import.meta.url);
import express from "express";
import posts from "./routes/api/posts.js";
import profile from "./routes/api/profile.js";
import users from "./routes/api/users.js";
import mongoose from "mongoose";
import authenticateToken from "./middlwares/auth-token.js";
import dotenv from "dotenv";
dotenv.config();
import cors from "cors";

const app = express();

//midllwares
app.use(express.json());
app.use(cors());
app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/profile", profile);

// you should use your own URI for mongodb connection
mongoose
  .connect(process.env.URI)
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

// port setup
const port = process.env.PORT || 5000;

//testing a private route
app.get("/admin", authenticateToken, (req, res) => {
  res.json(req.user);
});

//app listen connection stream
app.listen(port, () => console.log(`server running at port ${port}`));
