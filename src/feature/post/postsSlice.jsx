import {createSlice} from "@reduxjs/toolkit";
import {nanoid, createAsyncThunk} from "@reduxjs/toolkit";
import {sub} from "date-fns";
import axios from "axios";


const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// 采用中间件请求的方式
const initialState = {
	posts: [],
	status: 'idle',
	error: null,
	temp: null
}

export const postsSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		addPost: {
			reducer(state, action) {
				state.posts.push(action.payload)

			},
			prepare(title, content, userId) {
				return {
					payload: {
						id: nanoid(),
						title,
						content,
						date: new Date().toISOString(),
						userId,
						reactions: {
							thumbsUp: 0,
							wow: 0,
							heart: 0,
							rocket: 0,
							coffee: 0
						}
					}
				}
			}
		},
		reactionAdded(state, action) {
			const {postId, reaction} = action.payload
			console.log(postId, reaction)
			const existingPost = state.posts.find(post => post.id === postId)
			console.log(existingPost)
			if (existingPost) {

				state.post.temp = existingPost.reactions[reaction]++
			}
		}
	},
	extraReducers: (builder) => {
		builder.addCase(fetchPosts.pending, (state, action) => {
			state.status = 'loading'
		}).addCase(fetchPosts.fulfilled, (state, action) => {
			state.status = 'succeeded'
			let min = 1
			const loadPosts = action.payload.map(post => {
				post.date = sub(new Date(), {minutesa: min++}).toISOString()
				post.rections = {
					humbsUp: 0,
					wow: 0,
					heart: 0,
					rocket: 0,
					coffee: 0
				}
				return post
			})
			state.posts = state.posts.concat(loadPosts)
		}).addCase(fetchPosts.rejected, (state, action) => {
			state.status = 'failed'
			state.error = action.error.message
		})
	}
})

// 异步
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
	try {
		const response = await axios.get(POSTS_URL)
		return [...response.data]
	} catch (err) {
		return err.message
	}
})

export const selectAllPosts = (state) => state.post.posts
export const getPostsStatus = (state) => state.post.status
export const getPostsError = (state) => state.post.error


export const {addPost, reactionAdded} = postsSlice.actions

export default postsSlice.reducer