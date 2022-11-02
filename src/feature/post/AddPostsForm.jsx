import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";

import {addPost} from "./postsSlice";

import {selectAllUsers} from "../users/UserSlice";

const AddPostsForm = () => {

	const [title, setTitle] = useState('')
	const [content, setContent] = useState('')
	const [userId, setUserId] = useState('')

	const dispatch = useDispatch()
	const users = useSelector(selectAllUsers)

	const onTitleChanged = (e) => setTitle(e.target.value)

	const onContentChanged = (e) => setContent(e.target.value)

	const onAuthorChanged = (e) => setUserId(e.target.value)

	const canSave = Boolean(title) && Boolean(content) && Boolean(userId)

	const onSavePostClicked = () => {
		if (title && content) {
			dispatch(addPost(
				title,
				content,
				userId
			))
			setContent('')
			setTitle('')
			setUserId('')
		}
	}

	const usersOptions = users.map(user => {
		return (
			<option key={user.id} value={user.id}>
				{user.name}
			</option>
		)
	})
	return (
		<section>
			<h2>Add a New Post</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChanged}
				/>
				<br/>
				<label htmlFor="postAuthor">Author:</label>
				<select id="postAuthor" value={userId} onChange={onAuthorChanged}>
					<option value=""></option>
					{usersOptions}
				</select>

				<br/>
				<label htmlFor="postContent">Content:</label>
				<textarea
					id="postContent"
					name="postContent"
					value={content}
					onChange={onContentChanged}
				/>
				<button
					type="button"
					onClick={onSavePostClicked}
					disabled={!canSave}
				>Save Post
				</button>
			</form>
		</section>
	)

}

export default AddPostsForm;