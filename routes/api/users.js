import { Router } from "express";

import schemaValidation from "../../model/Users/validation.js";
import bcrypt from "bcrypt";
import User from "../../model/Users/User.js";
const route = Router();

route.post("/register", (req, res) => {
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    try {
      if (err) throw new Error(`😞error while hashing the password😞 ${err}`);
      if (schemaValidation(req.body))
        throw new Error(
          `😞your data is not valid😞 ${schemaValidation(req.body)}`
        );
      // *** 👆  chekcing for error while hashing and validating data  👆***

      //saving result in the database 🗃️
      const result = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash,
      });

      //storing result in db
      await result.save();
      res.send("data saved to db (users collection)");
    } catch (err) {
      res.status(404).send(`${err}`);
    }
  });
});

export default route;
