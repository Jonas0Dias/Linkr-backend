//* Libraries
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
//* Routers
import signupRouter from "./src/routes/signupRouter.js"
import signinRouter from "./src/routes/signinRouter.js"


dotenv.config();

const app = express()

app.use(cors());
app.use(express.json());

app.use([signinRouter, signupRouter]);

app.listen(process.env.PORT, () => console.log(`Server Initialized. Port: ${process.env.PORT} `))