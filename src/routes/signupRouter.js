import { Router } from "express";
import { createUser } from "../controllers/signupController.js";
import { schemaValidate } from "../middlewares/schemaMiddleware.js";
import { signupSchema } from "../schemas/signupSchema.js";

const signupRouter = Router();

signupRouter.post("/signup", schemaValidate(signupSchema), createUser); // ROTA NAO AUTENTICADA



export default signupRouter;