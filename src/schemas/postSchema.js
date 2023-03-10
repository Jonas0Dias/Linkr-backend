import Joi from "joi";

export const postSchema = Joi.object({
	url: Joi.string().uri().required(),
	text: Joi.string(),
});

export const deletePostSchema = Joi.object({
	postId: Joi.number().min(1).required(),
});

export const editPostSchema = Joi.object({
	postId: Joi.number().min(1).required(),
	text: Joi.string().required(),
});
