import Joi from "joi";
 
export const signupSchema = Joi.object({
   email: Joi.string().required().email().empty().disallow(''),
   name: Joi.string().required().empty().disallow(''),
   password: Joi.string().required().empty().disallow(''),
   pictureUrl: Joi.string().uri().required().empty().disallow('')
 });
