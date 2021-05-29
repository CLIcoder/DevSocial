import { request, Router } from "express";

import authenticateToken from "../../middlwares/auth-token.js";
import schemaValidation, {
  schemaValidation_exp,
} from "../../model/Profile/validation.js";
import Profile from "../../model/Profile/Profile.js";

const route = Router();

// testing route for react server

route.get("/", authenticateToken, (req, res) => {
  res.send("you're authorized to access this route");
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

route.post("/", authenticateToken, async (req, res) => {
  try {
    //validation the request format
    const request = req.body;
    if (schemaValidation(request)) {
      throw new Error(
        `😞Your data is not valid😞 ${schemaValidation(request)}`
      );
    }

    //check if the profile exist
    await Profile.findOne({ user: req.user._doc._id }).then(async (profile) => {
      if (profile) {
        Profile.findOneAndUpdate(
          { user: req.user._doc._id },
          { $set: req.body },
          { new: true }
        ).then((profile) => res.json(profile));
      } else {
        const result = new Profile({ user: req.user._doc._id, ...request });
        await result.save();
        return res.status(200).send("profile created succefully");
      }
    });

    // create new profile for the logged in user
  } catch (err) {
    res.status(404).send(`${err}`);
  }
});

// @route   POST api/profile/experience
// @desc    Add experience to profile
// @access  Private

route.post("/experience", authenticateToken, async (req, res) => {
  try {
    //validate experience data
    const request = req.body;
    if (schemaValidation_exp(request)) {
      throw new Error(
        `😞Your data is not valid😞 ${schemaValidation_exp(request)} `
      );
    }
    // collect the data from mongodb
    await Profile.findOne({ user: req.user._doc._id }).then((profile) => {
      const newExperience = [...profile.experience, request];
      Profile.findOneAndUpdate(
        { user: req.user._doc._id },
        { $set: { experience: newExperience } }
      )
        .then((profile) => res.json(profile))
        .catch((err) => {
          throw err;
        });
    });
  } catch (err) {
    res.status(404).send(`${err}`);
  }
});

export default route;
