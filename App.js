import React, { Component } from 'react';
import { Provider, connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { Actions, Scene, Drawer } from 'react-native-router-flux';
import { PersistGate } from 'redux-persist/lib/integration/react';
import Signin from './src/components/signin';
import Signup from './src/components/signup';
import HomeLogin from './src/components/homeLogin';
import Forgot from './src/components/forgot';
import map from './src/components/map';

import configureStore from './src/store/store';
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
					<ConnectedRouter backAndroidHandler={this.onBackPress}>
						<Scene key="root">
							<Scene
								key="signin"
								title="Log in"
								component={Signin}
							/>
							<Scene
								key="signup"
								title="Register"
								component={Signup}
							/>
							<Scene
								key="homeLogin"
								title="Welcome"
								component={HomeLogin}
								initial={true}
							/>
							<Scene
								key="forgot"
								title="Reset Password"
								component={Forgot}
							/>
							<Scene
								key="map"
								hideNavBar={true}
								component={map}
							/>
						</Scene>
					</ConnectedRouter>
				</PersistGate>
			</Provider>
		);
	}
}
