import {createSlice} from "@reduxjs/toolkit";
import {nanoid, createAsyncThunk} from "@reduxjs/toolkit";
import {sub} from "date-fns";
import axios from "axios";


const POSTS_URL = 'https://jsonplaceholder.typicode.com/posts';

// 采用中间件请求的方式
const initialState = {
	posts: [],
	status: 'idle',
	error: null
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
			const existingPost = state.posts.find(post => post.id === postId)
			if (existingPost) {
				existingPost.reactions[reaction]++
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
			state.posts = state.posts.concate(loadPosts)
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

export const selectAllPosts = (state) => state.posts.posts
export const getPostsStatus = (state) => state.posts.status
export const getPostsError = (state) => state.posts.error


export const {addPost, reactionAdded} = postsSlice.actions

export default postsSlice.reducer