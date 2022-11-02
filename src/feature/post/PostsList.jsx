import React from 'react';
import {useSelector} from "react-redux";
import {selectAllPosts} from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";

const PostsList = () => {
	const post = useSelector(selectAllPosts)

	const orderedPosts = post.slice().sort((a, b) => b.date.localeCompare(a.date))

	const renderdPosts = orderedPosts.map(post => {
		return (
			<article key={post.id}>
				<h3>{post.title}</h3>
				<p>{post.content.substring(0, 100)}</p>
				<p className='postCredit'>
					<PostAuthor userId={post.userId}/>
					<TimeAgo timestamp={post.date}/>
				</p>

			</article>
		)

	})
	return (
		<section>
			<h2>Posts</h2>
			{renderdPosts}
		</section>
	)
};

export default PostsList;