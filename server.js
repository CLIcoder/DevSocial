const express = require("express");
const app = express();
const posts = require("./routes/api/posts");
const profile = require("./routes/api/profile");
const users = require("./routes/api/users");
const mongoose = require("mongoose");

// you should use your own URI for mongodb connection
mongoose
  .connect(require("./config/keys").URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("connected"))
  .catch((err) => console.log(err));

app.use("/api/posts", posts);
app.use("/api/users", users);
app.use("/api/profile", profile);

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`server running at port ${port}`));
