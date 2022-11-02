import {createSlice} from "@reduxjs/toolkit";


const initialState = [
	{id: '0', name: 'll'},
	{id: '1', name: 'hh'},
	{id: '2', name: 'mm'}
]


const usersSlice = createSlice({
	name: 'users',
	initialState,
	reducers: {}
})

export const selectAllUsers = (state) => state.users


export default usersSlice.reducer