import { Router } from "express";
import jwt from "jsonwebtoken";

import schemaValidation from "../../model/Users/validation.js";
import bcrypt from "bcrypt";
import User from "../../model/Users/User.js";
import { JWT_KEY } from "../../config/keys.js";
const route = Router();

// register route
route.post("/singUp", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    try {
      if (err) throw new Error(`😞error while hashing the password😞 ${err}`);
      if (schemaValidation(req.body))
        throw new Error(
          `😞your data is not valid😞 ${schemaValidation(req.body)}`
        );
      await User.findOne({ email: req.body.email }).then((result) => {
        if (result) throw new Error("email already exist try to connect");
      });
      // *** 👆  chekcing for error while hashing and validating data  👆***

      //saving result in the database 🗃️
      const result = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      //storing result in db
      await result.save();
      res.status(200).send("data saved to db (users collection)");
    } catch (err) {
      res.status(404).send(`${err}`);
    }
  });
});

//login route
route.post("/signIn", (req, res) => {
  // check if the email is found
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) return res.status(404).send("email not found");

      //check the password match the email in case email is found
      bcrypt.compare(req.body.password, result.password).then((val) => {
        if (!val) return res.status(404).send("password incorrect");
        //... creating the jwt token
        const token = jwt.sign({ ...result }, JWT_KEY);
        return res.json({ tokens: token });
      });
    })
    .catch((err) => res.status(404).send(`Error in bcrypt: ${err}`));
});

export default route;
