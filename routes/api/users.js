import { Router } from "express";
import schemaValidation from "../../model/Users/validation.js";
const route = Router();

route.post("/register", (req, res) => {
  // validating the incoming request
  console.log(req.body.name);
  res.end();
});

export default route;
