const express = require("express");

const route = express.Router();

route.get("/test", (req, res) => res.json({ test: "post route" }));

module.exports = route;
