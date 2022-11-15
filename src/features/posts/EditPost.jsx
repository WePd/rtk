import React, {useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {selectPostById, updatePost, deletePost} from "./postsSlice";
import {selectAllUsers} from "../users/usersSlice";

const EditPost = (props) => {

	const {postId} = useParams()
	const navgiate = useNavigate()

	const post = useSelector((state) => selectPostById(state, Number(postId)))

	const user = useSelector(selectAllUsers)

	const [title, setTitle] = useState(post?.title)
	const [content, setContent] = useState(post?.body)
	const [userId, setUserId] = useState(post?.userId)
	const [requestStatus, setRequestStatus] = useState('idle')

	const canSave = [title, content, userId].every(Boolean) && requestStatus === 'idle';

	const dispatch = useDispatch()


	const onTitleChanged = (e) => setTitle(e.target.value)

	const onContentChanged = (e) => setContent(e.target.value)

	const onAuthorChanged = (e) => setUserId(e.target.value)


	// 保存
	const onSavePostClicked = () => {
		if (canSave) {
			try {
				setRequestStatus('pending')

				// 处理更新
				dispatch(updatePost({id: post.id, title, body: content, userId, reactions: post.reactions})).unwrap()
				setUserId('')
				setContent('')
				setTitle('')

				// 页面跳转

				navgiate(`/post/${userId}`)
			} catch (err) {
				console.log(err.message)
			} finally {

			}
		}
	}
	// 删除
	const onDeletePostClicked = () => {
		try {
			setRequestStatus('pending')
			dispatch(deletePost({id: post.id})).unwrap()

			setTitle('')
			setUserId('')
			setContent('')

			navgiate('/')
		} catch (e) {
			alert(e.message)
		}
	}


	const usersOptions = user.map((user) => {
		return (
			<option key={user.id} value={user.id}>{user.name}</option>
		)
	})
	if (!post) {
		return (
			<section>
				<h2>Post not found!!!</h2>
			</section>
		)
	}


	return (
		<section>
			<h2>Edit Post</h2>
			<form>
				<label htmlFor="postTitle">Post Title:</label>
				<input
					type="text"
					id="postTitle"
					name="postTitle"
					value={title}
					onChange={onTitleChanged}
				/>
				<label htmlFor="postAuthor">Author:</label>
				<select id="postAuthor" value={userId} onChange={onAuthorChanged}>
					<option value=""></option>
					{usersOptions}
				</select>
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
				>
					Save Post
				</button>
				<button className="deleteButton"
								type="button"
								onClick={onDeletePostClicked}
				>
					Delete Post
				</button>
			</form>
		</section>
	);
}

export default EditPost;