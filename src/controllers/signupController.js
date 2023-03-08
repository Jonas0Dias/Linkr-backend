import { db } from "../config/database.js";
import { encryptPassword } from "../utils/encryptPassword.js";
import moment from 'moment-timezone';


// POST PARA /signup
export async function createUser(req,res){
  
    const user = {...req.body};
    const password = encryptPassword(user.password)
    try{
        const searchingEmail = await db.query(`select * from users where email =$1`, [user.email]);

        // console.log('teste')
        
        if(searchingEmail.rowCount>0){
            res.sendStatus(409);
            return;
        }
        const now = moment().tz('America/Sao_Paulo').format();
        await db.query(`INSERT INTO users (name, email, password, "pictureUrl", "createdAt") values ($1, $2, $3, $4, $5)`, [user.name, user.email, password, user.pictureUrl, now]);
        res.sendStatus(201);

    }catch(err){
        res.status(500).send(err.message)
    }
} 

