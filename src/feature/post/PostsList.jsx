import React from 'react';
import {useSelector} from "react-redux";
import {selectAllPosts} from "./postsSlice";

const PostsList = () => {
	const post = useSelector(selectAllPosts)

	const renderdPosts = post.map(post => {
		<article key={post.id}>
			<h3>{post.title}</h3>
			<p>{post.content.substring(0, 100)}</p>
		</article>
	})
	return (
		<section>
			<h2>Posts</h2>
			{renderdPosts}
		</section>
	)
};

export default PostsList;