import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Router } from 'react-native-router-flux';
import { Actions, Scene, Drawer } from 'react-native-router-flux';
import Signin from '../components/signin';
import Signup from '../components/signup';
import HomeLogin from '../components/homeLogin';
import Forgot from '../components/forgot';
import MapScreen from '../components/map';
import AddIncident from '../components/addIncident';

const ConnectedRouter = connect()(Router);

/**
 * Routing class containing all instances of screens.
 * @extends Component
 */
export default class Route extends Component {
	render() {
		return (
			<ConnectedRouter backAndroidHandler={this.onBackPress}>
				<Scene key="root">
					<Scene key="signin" title="Log in" component={Signin} />
					<Scene key="signup" title="Register" component={Signup} />
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
					<Scene key="map" hideNavBar={true} component={MapScreen} />
					<Scene
						key="addIncident"
						title="Add incident"
						component={AddIncident}
					/>
				</Scene>
			</ConnectedRouter>
		);
	}
}
