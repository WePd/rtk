import {createSlice} from "@reduxjs/toolkit";
import {nanoid} from "@reduxjs/toolkit";
import {sub} from "date-fns";


const initialState = [
	{
		id: "1",
		title: 'study RTK',
		content: 'study redux-toolkit',
		date: sub(new Date(), {minutes: 10}).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0
		}
	},
	{
		id: "2",
		title: 'hh',
		content: 'hhhhhhhhhhhhh',
		date: sub(new Date(), {minutes: 10}).toISOString(),
		reactions: {
			thumbsUp: 0,
			wow: 0,
			heart: 0,
			rocket: 0,
			coffee: 0
		}
	}
]
export const postsSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		addPost: {
			reducer(state, action) {
				state.push(action.payload)

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
			const existingPost = state.find(post => post.id === postId)
			if (existingPost) {
				existingPost.reactions[reaction]++
			}
		}
	}
})

export const selectAllPosts = (state) => state.post

export const {addPost, reactionAdded} = postsSlice.actions

export default postsSlice.reducer