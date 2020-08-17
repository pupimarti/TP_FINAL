import React from 'react';
import { Link } from 'react-router-dom';

export default function Main() {
	return (
		<div>
			<p>Main</p>
			<div>
				<Link to="/helado">IR A HELADOS</Link>
			</div>
			<div>
				<Link to="/comida">IR A COMIDAS</Link>
			</div>
			<div>
				<Link to="/bebidas">IR A BEBIDAS</Link>
			</div>
		</div>
	);
}
