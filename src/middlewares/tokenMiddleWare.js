import { db } from "../config/database.js";
import { findUserIdByToken } from "../repositories/userRepository.js";

export async function validateToken(req, res, next) {
	const { authorization } = req.headers;

	if (!authorization) return res.sendStatus(401);

	// const { userId } = { ...req.params }
	const token = authorization.replace("Bearer ", "");

	try {
		const searchingToken = await db.query(
			`SELECT * FROM "tokens" WHERE token=$1`,
			[token]
		);

		if (searchingToken.rowCount > 0) {
			const tokenFound = await findUserIdByToken(
				searchingToken.rows[0].token
			);
			res.locals.userId = tokenFound.rows[0].user_id;
			console.log(res.locals.userId);
		}

		if (searchingToken.rowCount === 0) return res.sendStatus(401);
	} catch (err) {
		console.error(err);
		return res.sendStatus(500);
	}
	next();
}
