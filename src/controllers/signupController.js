import { db } from "../config/database.js";
import { encryptPassword } from "../utils/encryptPassword.js";
import moment from 'moment-timezone';
import { v4 as uuidv4 } from "uuid";



// POST PARA /signup
export async function createUser(req,res){
  
    const user = {...req.body};
    const password = encryptPassword(user.password)
    console.log(user.email)
    try{
        const searchingEmail = await db.query(`select * from users where email =$1`, [user.email]);

        
        if(searchingEmail.rowCount>0){
            res.sendStatus(409);
            return;
        }
        const now = moment().tz('America/Sao_Paulo').format();
        await db.query(`INSERT INTO users (name, email, password, "pictureUrl", "createdAt") values ($1, $2, $3, $4, $5)`, [user.name, user.email, password, user.pictureUrl, now]);
        const searchingUser = await db.query(`SELECT * FROM users WHERE email=$1`,[user.email])
        console.log(searchingUser)
        const token = uuidv4()
        await db.query(`INSERT INTO "tokens" (user_id, token, "createdAt") values ($1,$2,$3)`,[searchingUser.rows[0].id, token, now])
        res.status(201).send(token);

    }catch(err){
        res.status(500).send(err.message)
    }
} 

