import { Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../../assets/styles/navBarButton_styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateIncidentFirebase } from '../../../actions/incidentsAction';
import PropTypes from 'prop-types';

/**
 * Delete button for the incident in the nav bar
 * @return {React Component} Returns the side menu button component
 */

class DeleteButtonIncident extends Component {
	//Handles the delete functionality of an incident and updates the firebase database
	handleDelete() {
		Alert.alert(
			'',
			'Are you sure you want to delete this incident',
			[
				{
					text: 'No',
					onPress: () => console.log('Cancel Pressed'),
					style: 'cancel'
				},
				{
					text: 'Yes',
					onPress: () => {
						this.props
							.updateIncidentFirebase(
								this.props.incident.incident.key,
								{ visible: false }
							)
							.then(() => {
								Actions.pop();
							});
					}
				}
			],
			{ cancelable: false }
		);
	}

	render() {
		if (this.props.incident.isLoggedIn) {
			return (
				<TouchableOpacity
					style={styles.incidentNavButton}
					onPress={() => {
						this.handleDelete();
					}}
				>
					<Icon name="trash-o" size={23} />
				</TouchableOpacity>
			);
		} else {
			return <View />;
		}
	}
}

/**
 * Checks that the functions specified as isRequired are present,
 * and warns if the props used on this page,
 * does not meet the specified type.
 */
DeleteButtonIncident.propTypes = {
	updateIncidentFirebase: PropTypes.func.isRequired,
	incident: PropTypes.object
};

/**
 * Mapping dispatchable actions to props so that actions can be used
 * through props in children components.
 * @param dispatch Dispatches an action to trigger a state change.
 * @return Turns action creator objects into an objects with the same keys.
 */
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			updateIncidentFirebase: updateIncidentFirebase
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

export default connect(mapStateToProps, matchDispatchToProps)(
	DeleteButtonIncident
);
