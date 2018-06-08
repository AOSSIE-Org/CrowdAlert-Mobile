import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { Actions, Scene, Drawer } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Route from './src/utils/routes';

import configureStore from './src/utils/store';
let { store, persistor } = configureStore();

const ConnectedRouter = connect()(Router);

/**
 * Navigator using React-Native-Router-Flux
 * @extends Component
 */
export default class App extends Component {
	onBackPress() {
		Actions.pop();
		return true;
	}

	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					<Route />
				</PersistGate>
			</Provider>
		);
	}
}
