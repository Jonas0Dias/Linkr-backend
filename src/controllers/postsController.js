import { hash } from "bcrypt";
import urlMetadata from "url-metadata";
import { insertHashtag } from "../repositories/hashtagsRepository.js";
import {
	getPostsRepository,
	addPostRepository,
	deletePostHashtagsRepo,
	deletePostLikesRepo,
	deletePostRepository,
	editPostRepository,
} from "../repositories/postsRepository.js";
import { findUserIdByPostId } from "../repositories/userRepository.js";

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

		const formattedData = await Promise.all(
			posts.rows.map(async (post) => {
				const { texto, url, userId, name, userImage } = post;

				const { title: urlTitle, image: urlImg } = await urlMetadata(
					url
				);

				return {
					texto,
					url,
					userId,
					name,
					userImage,
					urlTitle,
					urlImg,
				};
			})
		);

		return res.status(200).send(formattedData);
	} catch (error) {
		console.log(error);
		res.sendStatus(500);
	}
}

export async function deletePost(req, res) {
	try {
		const { postId } = req.body;
		const postOwner = await findUserIdByPostId(postId);

		if (postOwner.rowCount === 0) return res.sendStatus(404);
		if (res.locals.userId !== postOwner.rows[0].id)
			return res.sendStatus(401);

		await deletePostHashtagsRepo(postId);
		await deletePostLikesRepo(postId);
		await deletePostRepository(postId);
		return res.sendStatus(204);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}

export async function editPost(req, res) {
	try {
		const { postId, text } = req.body;
		const postOwner = await findUserIdByPostId(postId);

		if (postOwner.rowCount === 0) return res.sendStatus(404);
		if (res.locals.userId !== postOwner.rows[0].id)
			return res.sendStatus(401);

		await editPostRepository(postId, text);
		return res.sendStatus(204);
	} catch (error) {
		console.log(error);
		return res.sendStatus(500);
	}
}
