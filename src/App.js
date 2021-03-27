import React from 'react';
import './App.css';
import List from './page/List';
import Detail from './page/Detail';

import { HashRouter as Router, Route, Switch } from 'react-router-dom';

const App = () => {
	return (
		<Router hashType="noslash">
			<Switch style={{ display: 'flex', minHeight: '100%' }}>
				<Route exact path="/" component={List} />
				<Route exact path="/:contractAdress/:tokenId" component={Detail} />
			</Switch>
		</Router>
	);
};

export default App;
