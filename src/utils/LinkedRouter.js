import React from 'react';
import { Linking } from 'react-native';
import crossroads from 'crossroads';
import Route from '../utils/routes';

import configureStore from '../utils/store';
let { store, persistor } = configureStore();

/**
 * It is used to navigating to corresponding screen when the app is opened
 * with a shared url.
 * @extends Component
 */
export default class LinkedRouter extends React.Component {
	constructor(props) {
		super(props);
		this.handleOpenURL = this.handleOpenURL.bind(this);
	}

	//In order to process incoming links in our React application,
	//we need to use Linking API from React Native
	componentDidMount() {
		Linking.getInitialURL()
			.then(url => this.handleOpenURL({ url }))
			.catch(console.error);
		//To handle incoming URLs when the app is running in background
		//we have to attach a listener which will be called when an event occurs.
		Linking.addEventListener('url', this.handleOpenURL);
	}

	//It will unmount the event listener after it has completed.
	componentWillUnmount() {
		Linking.removeEventListener('url', this.handleOpenURL);
	}

	/**
	 * handleOpenURL has to navigate us to the corresponding scene based on URL
	 * which it will receive with the event.
	 * We are using crossroads to parse the route.
	 * @param  {String} event contains the url.
	 * @return parses the route
	 */
	handleOpenURL(event) {
		if (event.url && event.url.indexOf(this.props.scheme + '://') === 0) {
			crossroads.parse(event.url.slice(this.props.scheme.length + 3));
		}
	}

	render() {
		if (store.getState().login.userDetails === null) {
			return <Route initial={true} />;
		} else {
			return <Route initial={false} />;
		}
	}
}
