import React from "react";
import Link from 'gatsby-link';
import './index.scss';

export default () => 

	<div>
		<h1>Links</h1>
		<ul>
			<li>
				<Link to="/pages/projects">Projects</Link>
				<Link to="/pages">Pages</Link>
			</li>
		</ul>
	</div>
