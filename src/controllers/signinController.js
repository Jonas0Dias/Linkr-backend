import { db } from "../config/database.js";
import { comparePassword } from "../utils/encryptPassword.js";
import { v4 as uuidv4 } from "uuid";
import moment from 'moment-timezone';

// POST PARA /signin
export async function Login(req,res){
    const user = {...req.body}
    console.log(user)
    try{
        const searchingEmail = await db.query('select * from users where email =$1', [user.email]);

        if(searchingEmail.rowCount === 0 ){
            res.sendStatus(404);
            return;
        }

        comparePassword(user.password, searchingEmail.rows[0].password)
        const now = moment().tz('America/Sao_Paulo').format();
        const token = uuidv4()
        console.log(token)
        const response = await db.query(`INSERT INTO "tokens" (user_id, token, "createdAt") values ($1,$2,$3)`,[searchingEmail.rows[0].id, token, now])
        // console.log(token)
        console.log(response)
        res.status(200).send(token)

    }catch(err){
        res.status(500).send(err.message)
    }
} 