import Joi from "joi";

// creating schema for data validation using JOI-npm version-17.4.0
const schemaValidation = (objectVal) => {
  const schema = Joi.object({
    //... validation the post rquest for mongodb database
    displayName: Joi.string().min(2).max(100).required(),
    company: Joi.string().min(2).max(100),
    website: Joi.string()
      .regex(
        /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_+.~#?&//=]*)/
      )
      .max(1000),
    location: Joi.string().min(2).max(1000),
    workStatus: Joi.string().min(2).max(100).required(),
    skills: Joi.array()
      .max(100)
      .min(1)
      .items(Joi.string().max(1000).min(2))
      .required(),
    bio: Joi.string().min(5).max(10000000),
    github: Joi.string().max(100).min(2),
  });

  const { error } = schema.validate(objectVal);
  return error;
};

export const schemaValidation_exp = (objectVal) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    company: Joi.string().min(2).max(100).required(),
    location: Joi.string().min(2).max(1000),
    from: Joi.string().min(2).max(100).required(),
    to: Joi.string().max(100).allow(""),
    current: Joi.boolean(),
    description: Joi.string().min(2).max(100000),
  });
  const { error } = schema.validate(objectVal);
  return error;
};

export const schemaValidation_edu = (objectVal) => {
  const schema = Joi.object({
    school: Joi.string().min(2).max(100).required(),
    degree: Joi.string().min(2).max(100).required(),
    fieldofstudy: Joi.string().min(2).max(100).required(),
    from: Joi.string().min(2).max(100).required(),
    to: Joi.string().min(2).max(100),
    description: Joi.string().min(2).max(100000),
  });
  const { error } = schema.validate(objectVal);
  return error;
};

export default schemaValidation;
