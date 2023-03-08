import { Router } from "express";
import { Login } from "../controllers/signinController.js";
import { schemaValidate } from "../middlewares/schemaMiddleware.js";
import { signinSchema } from "../schemas/signinSchema.js";

const signinRouter = Router();

signinRouter.post("/signin",schemaValidate(signinSchema),  Login); // ROTA NAO AUTENTICADA

export default signinRouter;