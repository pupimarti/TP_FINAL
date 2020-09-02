import React from 'react';
import './App.css';

import { HashRouter, Route, Switch } from 'react-router-dom';

import Main from 'components/Main';
import List from 'components/List';
import Profile from 'components/Profile';
import Login from 'components/Login';

function App() {
	const HeightContentApp = {
		minHeight: window.innerWidth > 800 ? '100vh' : window.innerHeight + 'px',
	};

	return (
		<HashRouter basename="/">
			<div style={HeightContentApp} className="content-app">
				<Switch>
					<Route exact path="/comida">
						<List type="comida" />
					</Route>
					<Route exact path="/helado">
						<List type="helado" />
					</Route>
					<Route exact path="/bebidas">
						<List type="bebidas" />
					</Route>
					<Route exact path="/login">
						<Login />
					</Route>
					<Route exact path="/:id">
						<Profile />
					</Route>
					<Route path="/" component={Main} />
				</Switch>
			</div>
		</HashRouter>
	);
}

export default App;
