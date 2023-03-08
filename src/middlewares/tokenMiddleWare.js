import { db } from "../config/database.js"

export async function validateToken(req, res, next) {

    const { authorization } = req.headers

    if (!authorization) return res.sendStatus(401)

    // const { userId } = { ...req.params }
    const token = authorization.replace("Bearer ", "")

    try {
        

            const searchingToken = await db.query(`SELECT * FROM "tokens" WHERE token=$1`, [token])
            
            if (searchingToken.rowCount===0) return res.sendStatus(401)

    } catch (err) {
        console.error(err)
        return res.sendStatus(500)
    }
    next()
}