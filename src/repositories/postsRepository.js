import { db } from "../config/database.js";

export async function addPostRepository(post) {
	return await db.query(
		`INSERT INTO posts (user_id, url, texto) VALUES ($1, $2, $3) RETURNING ID`,
		[post.userId, post.url, post.text]
	);
}

export async function getPostsRepository() {
	return await db.query(
		`
            SELECT 
                texto, 
                url, 
                user_id AS "userId",
                users.name, 
                users."pictureUrl" AS "userImage" 
            FROM posts 
            JOIN users 
            ON posts.user_id = users.id;
        `
	);
}

export async function deletePostRepository(postId) {
	return await db.query(`DELETE FROM posts WHERE id = $1`, [postId]);
}

export async function deletePostHashtagsRepo(postId) {
	return await db.query(`DELETE FROM posts_hashtags WHERE post_id = $1`, [
		postId,
	]);
}

export async function deletePostLikesRepo(postId) {
	return await db.query(`DELETE FROM posts_liked WHERE post_id = $1`, [
		postId,
	]);
}

export async function editPostRepository(postId, text) {
	return await db.query(`UPDATE posts SET texto = $1 WHERE id = $2`, [
		text,
		postId,
	]);
}
