import { hash } from "bcrypt";
import { insertHashtag } from "../repositories/hashtagsRepository.js";
import {
	getPostsRepository,
	insertPost,
} from "../repositories/postsRepository.js";

export async function addPost(req, res) {
	const { url, text } = req.body;
	const userId = res.locals.userId;

	const postId = await insertPost({ url, text, userId });

	if (text) {
		const hashtags = text.match(/#\w+\b/g);
		for (let i = 0; i < hashtags.length; i++) {
			await insertHashtag(postId.rows[0].id, hashtags[i]);
		}
	}
	res.sendStatus(201);
}

export async function getPosts(req, res) {
	try {
		const posts = await getPostsRepository();
		return res.status(200).send(posts.rows);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}
