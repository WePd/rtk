import {useDispatch} from "react-redux";
import {reactionAdded} from "./postsSlice";


const reactionEmoji = {
	thumbsUp: '👍',
	wow: '😮',
	heart: '❤️',
	rocket: '🚀',
	coffee: '☕'
}


const ReactionButton = ({post}) => {
	const dispatch = useDispatch()

	const reactionsButtons = Object.entries(reactionEmoji).map(([name, emoji]) => {
		return (
			<button
				key={name}
				type='button'
				className="reactionButton"
				onClick={() => dispatch(reactionAdded({postId: post.id, reaction: name}))}
			>
				{emoji}{post.rections[name]}
			</button>
		)
	})
	return <div>{reactionsButtons}</div>
};

export default ReactionButton;