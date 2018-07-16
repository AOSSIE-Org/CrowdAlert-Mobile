import React, { Component } from 'react';
import {
	Text,
	View,
	Platform,
	TouchableHighlight,
	TouchableOpacity,
	Keyboard,
	ActivityIndicator,
	Picker,
	Modal,
	Image
} from 'react-native';
import { Header, Title, Left, Body, Switch, Right, Card } from 'native-base';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import Icon from 'react-native-vector-icons/FontAwesome';
import Config from 'react-native-config';
import { getMarkerImage, categories } from '../utils/categoryUtil.js';
import { styles } from '../assets/styles/filter_styles';
import {
	getAllIncidents,
	updateIndvNotification,
	updateDomain
} from '../actions/incidentsAction';

/**
 * Screen for filtering of incidents on map.
 * @extends Component
 */
class Filter extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: false
		};
	}

	/**
	 * The selected incident category gets updated in redux.
	 * @param  {JSON} item the incident category selected.
	 * @return Updates domain in redux.
	 */
	alertItemName = item => {
		this.setState({ loading: true });
		this.props.updateDomain(item.category).then(result => {
			this.setState({ loading: false });
			Actions.pop();
		});
	};

	//Ui for filter screen.
	render() {
		return (
			<View style={styles.Container}>
				<Header androidStatusBarColor="#1c76cb">
					<Left>
						<TouchableOpacity
							style={styles.backButton}
							onPress={() => Actions.pop()}
						>
							<Icon name="close" size={20} color="white" />
						</TouchableOpacity>
					</Left>
					<Body>
						<Text style={styles.title}>
							Select Incident to filter
						</Text>
					</Body>
				</Header>
				{this.state.loading ? (
					<ActivityIndicator size={'large'} color="white" />
				) : null}
				<View style={styles.listView}>
					{Object.keys(categories).map((key, index) => (
						<TouchableOpacity
							key={categories[key].category}
							style={styles.Field}
							onPress={() => this.alertItemName(categories[key])}
						>
							<Image
								style={styles.Image}
								source={getMarkerImage(
									categories[key].category
								)}
							/>
							<Text style={styles.text}>
								{categories[key].title}
							</Text>
						</TouchableOpacity>
					))}
				</View>
			</View>
		);
	}
}
/**
 * Mapping dispatchable actions to props so that actions can be used
 * through props in children components.
 * @param dispatch Dispatches an action to trigger a state change.
 * @return Turns action creator objects into an objects with the same keys.
 */
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			updateDomain: updateDomain
		},
		dispatch
	);
}

/**
 * Mapping state to props so that state variables can be used
 * through props in children components.
 * @param state Current state in the store.
 * @return Returns states as props.
 */
const mapStateToProps = state => ({
	incident: state.incident
});

export default connect(mapStateToProps, matchDispatchToProps)(Filter);
