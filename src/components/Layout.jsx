import React from 'react';
import {Outlet} from "react-router-dom";
import Header from "./Header";

function Layout(props) {
	return (
		<main className='App'>
			<Header/>
			<Outlet/>
		</main>
	);
}

export default Layout;