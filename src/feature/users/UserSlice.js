import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const USERS_URL = 'https://jsonplaceholder.typicode.com/users';

const initialState = [
	{id: '0', name: 'll'},
	{id: '1', name: 'hh'},
	{id: '2', name: 'mm'}
]

const fetchUser = createAsyncThunk('users/fetchUser', async () => {
		const res = await axios.get(USERS_URL)
		return res.data
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