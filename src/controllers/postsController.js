import { hash } from "bcrypt";
import { insertHashtag } from "../repositories/hashtagsRepository.js";
import {
	getPostsRepository,
	addPostRepository,
} from "../repositories/postsRepository.js";

export async function addPost(req, res) {
	try {
		const { url, text } = req.body;
		const userId = res.locals.userId;

		const postId = await addPostRepository({ url, text, userId });

		if (text) {
			const hashtags = text.match(/#\w+\b/g);
			for (let i = 0; i < hashtags.length; i++) {
				await insertHashtag(postId.rows[0].id, hashtags[i]);
			}
		}
		res.sendStatus(201);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
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
