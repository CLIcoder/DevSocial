import Joi from "joi";

// creating schema for data validation using JOI-npm version-17.4.0
const schemaValidation = (objectVal) => {
  const schema = Joi.object({
    name: Joi.string().min(2).max(30).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(5).max(100).required(),
  });

  const { error } = schema.validate(objectVal);
  return error;
};

export default schemaValidation;
