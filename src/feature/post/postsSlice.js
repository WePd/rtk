import {createSlice} from "@reduxjs/toolkit";


const initialState = [
	{id: "1", title: 'study RTK', content: 'study redux-toolkit'},
	{id: "2", title: 'hh', content: 'hhhhhhhhhhhhh'}
]
export const postsSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {}
})

export const selectAllPosts = (state) => state.post

export default postsSlice.reducer