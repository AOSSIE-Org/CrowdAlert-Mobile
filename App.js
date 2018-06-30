import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Route from './src/utils/routes';
import { ActivityIndicator } from 'react-native';
import LinkedRouter from './src/utils/LinkedRouter';

import configureStore from './src/utils/store';
let { store, persistor } = configureStore();

/**
 * Navigator using React-Native-Router-Flux
 * @extends Component
 */
export default class App extends Component {
	render() {
		return (
			<Provider store={store}>
				<PersistGate loading={null} persistor={persistor}>
					{isLoaded => {
						if (!isLoaded) {
							return <ActivityIndicator size={'large'} />;
						} else {
							return <LinkedRouter scheme="http" />;
						}
					}}
				</PersistGate>
			</Provider>
		);
	}
}
