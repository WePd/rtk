import {configureStore} from "@reduxjs/toolkit";

import counterReducer from '../feature/counter/counterSlice'

import postReducer from '../feature/post/postsSlice'

import userSlice from "../feature/users/UserSlice";


export const store = configureStore({
	reducer: {
		counter: counterReducer,
		post: postReducer,
		users: userSlice
	}
})