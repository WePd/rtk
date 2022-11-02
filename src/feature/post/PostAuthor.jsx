import {useSelector} from "react-redux";

import {selectAllUsers} from "../users/UserSlice";


import React from 'react';

const PostAuthor = ({userId}) => {
	const users = useSelector(selectAllUsers)

	const auther = users.find(user => user.id === userId)

	return (
		<span>by {auther ? auther.name : 'Unknow author'}</span>
	)
};

export default PostAuthor;