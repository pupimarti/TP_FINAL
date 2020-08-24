import React from 'react';
import './css.css';

export default function Loading(props) {
	if (props.small)
		return (
			<div id="circleG">
			<div id="circleG_1" className="circleG circleS"></div>
			<div id="circleG_2" className="circleG circleS"></div>
			<div id="circleG_3" className="circleG circleS"></div>
		</div>
		);

	return (
		<div id="circleG">
			<div id="circleG_1" className="circleG"></div>
			<div id="circleG_2" className="circleG"></div>
			<div id="circleG_3" className="circleG"></div>
		</div>
	);
}
