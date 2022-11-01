import {configureStore} from "@reduxjs/toolkit";

import counterReducer from '../feature/counter/counterSlice'

import postReducer from '../feature/post/postsSlice'


export const store = configureStore({
	reducer: {
		counter: counterReducer,
		post: postReducer
	}
})