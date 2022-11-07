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
						rections: {
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
			const existingPost = state.posts.find(post => {
				return post.id === postId
			})
			if (existingPost) {
				existingPost.rections[reaction]++
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
					thumbsUp: 0,
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
		}).addCase(addNewPosts.fulfilled, (state, action) => {
			action.payload.userId = Number(action.payload.userId)
			action.payload.date = new Date().toISOString()
			action.payload.rections = {
				thumbsUp: 0,
				wow: 0,
				heart: 0,
				rocket: 0,
				coffee: 0
			}
			state.posts.push(action.payload)
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

// 添加新post
export const addNewPosts = createAsyncThunk('post/addNewPosts', async (initialState) => {
	try {
		const res = await axios.post(POSTS_URL, initialState)
		return res.data
	} catch (error) {
		return error.message
	}
})


export const selectAllPosts = (state) => state.post.posts
export const getPostsStatus = (state) => state.post.status
export const getPostsError = (state) => state.post.error


export const {addPost, reactionAdded} = postsSlice.actions

export default postsSlice.reducer