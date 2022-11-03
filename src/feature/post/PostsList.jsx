import React from 'react';
import {useSelector, useDispatch} from "react-redux";
import {selectAllPosts, getPostsError, getPostsStatus, fetchPosts} from "./postsSlice";
import PostsExcerpt from "./PostsExcerpt";
import {useEffect} from "react";

const PostsList = () => {
	const dispatch = useDispatch()

	const posts = useSelector(selectAllPosts)
	const postStatus = useSelector(getPostsStatus)
	const error = useSelector(getPostsError)

	useEffect(() => {
		if (postStatus === 'idle') {
			dispatch(fetchPosts())
		}
	}, [postStatus, dispatch])


	let content

	if (postStatus === 'loading') {
		content = <div>Loading.....</div>
	} else if (postStatus === 'succeeded') {
		const orderedPosts = posts.slice().sort((a, b) => b.date.localeCompare(a.date))
		content = orderedPosts.map(post => <PostsExcerpt post={post} key={post.id}/>)
	} else if (postStatus === 'failed') {
		content = <div>{error}</div>
	}
	return (
		<section>
			<h2>Posts</h2>
			{content}
		</section>
	)
};

export default PostsList;