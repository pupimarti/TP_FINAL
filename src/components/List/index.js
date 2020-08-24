import React, { useState, useEffect } from 'react';
import './css.css';

import logo from 'img/logo-completo.png';

import Loading from 'components/Loading';
import Search from 'components/Search';
import Item from './Item';

import { getPlaces } from 'firebaseController';

import { Link } from 'react-router-dom';

export default function List(props) {
	const [data, setData] = useState('loading');

	useEffect(() => {
		let mounted = true;
		const getData = async () => {
			try {
				const db_data = await getPlaces(props.type);
				if (mounted) setData(db_data);
			} catch (error) {
				if (mounted) setData('error');
			}
		};
		if (data === 'loading') getData();

		return () => (mounted = false);
	}, [data, props.type]);

	const [filter, setFilter] = useState('');

	const showPlace = (place) => {
		if (filter === '') return true;
		if (!isNaN(filter)) return place.phone.toString().includes(filter);
		return place.name
			.normalize('NFD')
			.replace(/[\u0300-\u036f]/g, '')
			.toUpperCase()
			.includes(
				filter
					.normalize('NFD')
					.replace(/[\u0300-\u036f]/g, '')
					.toUpperCase()
			);
	};

	const HeightList = {
		maxHeight: window.innerHeight - 145 + 'px',
	};

	if (data === 'error')
		return (
			<div className="container-list">
				<header className="navbar">
					<Link to="/" className="container-back">
						<div className="back"></div>
					</Link>
					<Link to="/">
						<img src={logo} alt="logo" className="navbar-logo" />
					</Link>
					<Search value={filter} setValue={setFilter} />
				</header>
				<p style={{ textAlign: 'center' }}>Ocurrió un error al cargar los datos.</p>
				<p className="reintentar" onClick={() => setData('loading')}>
					Haga click aquí para reintentar.
				</p>
			</div>
		);

	return (
		<div className="container-list">
			<header className="navbar">
				<Link to="/" className="container-back">
					<div className="back"></div>
				</Link>
				<Link to="/">
					<img src={logo} alt="logo" className="navbar-logo" />
				</Link>
				<Search value={filter} setValue={setFilter} />
			</header>
			{data === 'loading' ? (
				<Loading />
			) : (
				<ul style={HeightList} className="list fade-in">
					{data &&
						Array.isArray(data) &&
						data.map((doc, i) => {
							if (showPlace(doc))
								return (
									<li key={i}>
										<Item
											name={doc.name}
											phone={doc.phone}
											id={doc.id}
											type={props.type}
											send={doc.send}
											workHours={doc.workHours}
										/>
									</li>
								);
							return null;
						})}
				</ul>
			)}
		</div>
	);
}
