import { Router } from "express";
import jwt from "jsonwebtoken";

import schemaValidation from "../../model/Users/validation.js";
import bcrypt from "bcrypt";
import User from "../../model/Users/User.js";
import authenticateForget from "../../middlwares/secure-forgetPassword.js";
import { sendMail } from "../../utils.js";
const route = Router();

// @route   POST api/users/signup
// @desc    Register a user
// @access  Public

route.post("/signup", (req, res) => {
  res.header("Access-Control-Allow-Origin", "*");
  bcrypt.hash(req.body.password, 10, async (err, hash) => {
    try {
      if (err) throw new Error(`😞error while hashing the password😞 ${err}`);
      if (schemaValidation(req.body))
        throw new Error(
          `😞your data is not valid😞 ${schemaValidation(req.body)}`
        );
      await User.findOne({ email: req.body.email }).then((result) => {
        // handling if the email exist error
        if (result) throw { email: "email already exist" };
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
      res
        .status(200)
        .json({ email: req.body.email, password: req.body.password });
    } catch (err) {
      res.status(400).json(err);
    }
  });
});

// @route   POST api/users/signup
// @desc    Login a user
// @access  Public

route.post("/signin", (req, res) => {
  // check if the email is found
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) return res.status(404).send("email not found");

      //check the password match the email in case email is found
      bcrypt.compare(req.body.password, result.password).then((val) => {
        if (!val) return res.status(404).send("password incorrect");
        const { _id, name, email, avatar, date } = result;

        //... creating the jwt token
        const token = jwt.sign(
          { _id, name, email, avatar, date },
          process.env.JWT_KEY
        );
        return res.json({ tokens: token, name, email, avatar, date });
      });
    })
    .catch((err) => res.status(404).send(`Error in bcrypt: ${err}`));
});

// @route   POST api/users/token
// @desc    get token
// @access  Private

route.post("/token", authenticateForget, (req, res) => {
  // check if the email is found
  User.findOne({ email: req.body.email })
    .then((result) => {
      if (!result) return res.status(400).send("email not found");

      const { _id, name, email, avatar, date } = result;

      //... creating new JWT Token
      const token = jwt.sign(
        { _id, name, email, avatar, date },
        process.env.JWT_KEY
      );

      const text = ` Click on the link to recover your password : ${process.env.CLIENT_URL}/#/new-password/${token}`;
      sendMail(email, "Devsocial Recover Password", text);

      return res.status(200).send("email sent to user for recovery");
    })
    .catch((err) => res.status(404).send(`Error in bcrypt: ${err}`));
});

// @route   Put api/users/
// @desc    update password
// @access  Private
route.put("/:token/:newPassword", authenticateForget, async (req, res) => {
  try {
    const { token, newPassword } = req.params;

    bcrypt.hash(newPassword, 10, (err, hashed) => {
      if (err) {
        throw Error("token not valid");
      }
      //decode the token for values
      const { email } = jwt.verify(
        token,
        process.env.JWT_KEY,
        (err, decoded) => {
          if (err) {
            throw Error("token not valid");
          }
          return decoded;
        }
      );

      User.findOneAndUpdate(
        { email },
        { $set: { password: hashed } },
        { new: true }
      )
        .then((newUser) => res.status(200).json(newUser))
        .catch((err) => {
          throw err;
        });
    });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

export default route;
