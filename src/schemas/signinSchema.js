import Joi from "joi";

export const signinSchema = Joi.object({
    email: Joi.string().required().email().empty().disallow(''),
    password: Joi.string().required().empty().disallow(''),
  });