import { db } from "../config/database.js";

export async function findUserIdByToken(token) {
	return await db.query(`SELECT user_id FROM tokens WHERE token = $1;`, [
		token,
	]);
}
