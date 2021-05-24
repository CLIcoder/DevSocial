import { Router } from "express";

import authenticateToken from "../../middlwares/auth-token.js";
import schemaValidation from "../../model/Profile/validation.js";
import Profile from "../../model/Profile/Profile.js";

const route = Router();

// route for creating new profile
route.post("/", authenticateToken, async (req, res) => {
  try {
    const request = req.body;
    if (schemaValidation(request)) {
      throw new Error(
        `😞Your data is not valid😞 ${schemaValidation(request)}`
      );
    }
    const result = new Profile({ ...request });
    await result.save();
    //Profile.findOne({ user: req.user.id })
    res.status(200).send("profile created succefully");
  } catch (err) {
    res.status(404).send(`${err}`);
  }
});

export default route;
