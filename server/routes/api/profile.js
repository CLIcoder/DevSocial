import { request, Router } from "express";

import authenticateToken from "../../middlwares/auth-token.js";
import schemaValidation, {
  schemaValidation_exp,
  schemaValidation_edu,
} from "../../model/Profile/validation.js";
import Profile from "../../model/Profile/Profile.js";
import User from "../../model/Users/User.js";

const route = Router();

// get individual profile

route.get("/:id", async (req, res) => {
  try {
    await Profile.findOne({ user: req.params.id })
      .then((result) => res.status(200).json(result))
      .catch((err) => {
        throw err;
      });
  } catch (err) {
    res.status(400).send("something went wrong");
  }
});

// get all profile that are inside the Router

route.get("/", async (req, res) => {
  try {
    await Profile.find({}, (err, profiles) => {
      if (err) throw Error("something went wrong with your query");
      res.status(200).json(profiles);
      return;
    });
  } catch (err) {
    res.status(404).json(err);
  }
});

// @route   POST api/profile
// @desc    Create or edit user profile
// @access  Private

route.post("/", authenticateToken, async (req, res) => {
  try {
    //validation the request format
    const request = req.body;
    if (schemaValidation(request)) {
      throw Error(`😞Your data is not valid😞 ${schemaValidation(request)}`);
    }
    //check if the profile exist

    await Profile.findOne({ user: req.user._id })
      .then(async (profile) => {
        if (profile) {
          Profile.findOneAndUpdate(
            { user: req.user._id },
            { $set: req.body },
            { new: true }
          )
            .then((profile) => res.status(200).json(profile))
            .catch((err) => {
              throw err;
            });
        } else {
          //return res.json(request);
          const result = new Profile({ user: req.user._id, ...request });
          await result.save().catch((err) => {
            throw err;
          });
          return res.status(200).send("profile created succefully");
        }
      })
      .catch((err) => {
        throw Error("problem in monodb");
      });

    // create new profile for the logged in user
  } catch (err) {
    res.status(400).send(err.message);
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
      throw Error(
        `😞Your data is not valid😞 ${schemaValidation_exp(request)} `
      );
    }
    // collect the data from mongodb
    await Profile.findOne({ user: req.user._id })
      .then((profile) => {
        const newExperience = [...profile.experience, request];
        Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { experience: newExperience } }
        )
          .then((profile) => res.json(profile))
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw Error(err);
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
});
route.post("/education", authenticateToken, async (req, res) => {
  try {
    //validate experience data
    const request = req.body;
    if (schemaValidation_edu(request)) {
      throw Error(
        `😞Your data is not valid😞 ${schemaValidation_edu(request)} `
      );
    }
    // collect the data from mongodb
    await Profile.findOne({ user: req.user._id })
      .then((profile) => {
        const newEducation = [...profile.education, request];
        Profile.findOneAndUpdate(
          { user: req.user._id },
          { $set: { education: newEducation } }
        )
          .then((profile) => res.json(profile))
          .catch((err) => {
            throw err;
          });
      })
      .catch((err) => {
        throw Error(err);
      });
  } catch (err) {
    res.status(400).send(err.message);
  }
});

// @route    DELETE api/prof/:id
// @desc     Delete a experience
route.delete("/experience/:exp_id", authenticateToken, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user._id });

    foundProfile.experience = foundProfile.experience.filter(
      (exp) => exp._id.toString() !== req.params.exp_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    return res.status(400).json({ msg: "Server error" });
  }
});

// @desc     Delete a eduction
// @access   Private
route.delete("/education/:edu_id", authenticateToken, async (req, res) => {
  try {
    const foundProfile = await Profile.findOne({ user: req.user._id });

    foundProfile.education = foundProfile.education.filter(
      (edu) => edu._id.toString() !== req.params.edu_id
    );

    await foundProfile.save();
    return res.status(200).json(foundProfile);
  } catch (error) {
    return res.status(400).json({ msg: "Server error" });
  }
});

// @route    DELETE api/profile
// @desc     Delete profile, user & posts
// @access   Private
route.delete("/", authenticateToken, async (req, res) => {
  try {
    // Remove user posts
    // Remove profile
    // Remove user
    await Promise.all([
      Profile.findOneAndRemove({ user: req.user._id }),
      User.findOneAndRemove({ _id: req.user._id }),
    ]);

    res.json({ msg: "User deleted" });
  } catch (err) {
    console.error(err.message);
    res.status(400).send("Server Error");
  }
});

export default route;
