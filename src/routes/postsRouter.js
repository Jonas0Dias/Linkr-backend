import { Router } from "express";
import { addPost, getPosts } from "../controllers/postsController.js";
import { schemaValidate } from "../middlewares/schemaMiddleware.js";
import { validateToken } from "../middlewares/tokenMiddleWare.js";
import { postSchema } from "../schemas/postSchema.js";

const postsRouter = Router();

postsRouter.post("/posts", validateToken, schemaValidate(postSchema), addPost); // ROTA AUTENTICADA
postsRouter.get("/posts", validateToken, getPosts); // ROTA AUTENTICADA

export default postsRouter;
