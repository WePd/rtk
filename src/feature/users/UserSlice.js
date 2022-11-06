import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = []

export const fetchUser = createAsyncThunk('users/fetchUser', async () => {
		try {
			const res = await axios.get(USERS_URL)
			return [...res.data]
		} catch (error) {
			return error.message
		}
	}
)

const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder.addCase(fetchUser.fulfilled, (state, action) => {
			return action.payload
		})
	}
})


export const selectAllUsers = (state) => state.users


export default usersSlice.reducer