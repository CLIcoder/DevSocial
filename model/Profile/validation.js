import Joi from "joi";

// creating schema for data validation using JOI-npm version-17.4.0
const schemaValidation = (objectVal) => {
  const schema = Joi.object({
    //... validation the post rquest for mongodb database
    handle: Joi.string().min(2).max(40).required(),
    company: Joi.string().min(2).max(40),
    website: Joi.string().uri().max(1000),
    location: Joi.string().min(2).max(1000),
    status: Joi.string().min(2).max(40).required(),
    skills: Joi.array()
      .max(100)
      .min(1)
      .items(Joi.string().max(1000).min(2))
      .required(),
    bio: Joi.string().max(100000).min(5),
    githubusername: Joi.string().max(40).min(2),
  });

  const { error } = schema.validate(objectVal);
  return error;
};

export default schemaValidation;
