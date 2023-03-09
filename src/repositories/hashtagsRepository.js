import { db } from "../config/database.js";

export async function insertHashtag(postId, hashtag) {
	return await db.query(
		`INSERT INTO posts_hashtags (post_id, hashtag) VALUES ($1, $2);`,
		[postId, hashtag]
	);
}
