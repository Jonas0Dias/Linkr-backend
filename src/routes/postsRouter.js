import { Router } from "express";
import {
	addPost,
	deletePost,
	editPost,
	getPosts,
} from "../controllers/postsController.js";
import { schemaValidate } from "../middlewares/schemaMiddleware.js";
import { validateToken } from "../middlewares/tokenMiddleWare.js";
import {
	deletePostSchema,
	editPostSchema,
	postSchema,
} from "../schemas/postSchema.js";

const postsRouter = Router();

postsRouter.post("/posts", validateToken, schemaValidate(postSchema), addPost); // ROTA AUTENTICADA
postsRouter.get("/posts", validateToken, getPosts); // ROTA AUTENTICADA
postsRouter.delete(
	"/posts",
	validateToken,
	schemaValidate(deletePostSchema),
	deletePost
); // ROTA AUTENTICADA
postsRouter.patch(
	"/posts",
	validateToken,
	schemaValidate(editPostSchema),
	editPost
); // ROTA AUTENTICADA

export default postsRouter;
