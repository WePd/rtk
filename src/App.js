import PostsList from "./features/posts/PostsList";
import AddPostForm from "./features/posts/AddPostForm";

import PostDetails from "./features/posts/PostDetails";
import Layout from "./components/Layout";
import {Routes, Route} from "react-router-dom";
import EditPost from "./features/posts/EditPost";

function App() {
	return (
		<Routes>
			<Route path='/' element={<Layout/>}>
				<Route index element={<PostsList/>}/>
				<Route path='post'>
					<Route index element={<AddPostForm/>}/>
					<Route path=':postId' element={<PostDetails/>}/>
					<Route path='edit/:postId' element={<EditPost/>}/>
				</Route>
			</Route>
		</Routes>
	);
}

export default App;
