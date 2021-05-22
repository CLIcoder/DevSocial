const express = require("express");

const route = express.Router();

route.get("/test", (req, res) => res.json({ test: "user route" }));

module.exports = route;
