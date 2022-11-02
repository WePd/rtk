import {createSlice} from "@reduxjs/toolkit";
import {nanoid} from "@reduxjs/toolkit";
import {sub} from "date-fns";


const initialState = [
	{id: "1", title: 'study RTK', content: 'study redux-toolkit', date: sub(new Date(), {minutes: 10}).toISOString()},
	{id: "2", title: 'hh', content: 'hhhhhhhhhhhhh', date: sub(new Date(), {minutes: 10}).toISOString()}
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
					}
				}
			}
		}
	}
})

export const selectAllPosts = (state) => state.post

export const {addPost} = postsSlice.actions

export default postsSlice.reducer