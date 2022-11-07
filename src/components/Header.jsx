import React from 'react';
import {Link} from "react-router-dom";

const Header = (props) => {
	return (
		<header className='Header'>
			<h2>Blog</h2>
			<nav>
				<ul>
					<li><Link to='/'>Home</Link></li>
					<li><Link to='post'>Post</Link></li>
				</ul>
			</nav>
		</header>
	)
}

export default Header;