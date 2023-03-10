import { db } from "../config/database.js";
import { comparePassword } from "../utils/encryptPassword.js";
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
        
        if(searchingEmail.rowCount === 0 ){
            res.sendStatus(404);
            return;
        }

        const searchingToken = await db.query(`SELECT * from "tokens" WHERE "user_id" =$1`,[searchingEmail.rows[0].id])

        res.status(200).send(searchingToken.rows[0].token)

    }catch(err){
        res.status(500).send(err.message)
    }
} 