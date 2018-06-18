import { Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../../assets/styles/navBarButton_styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

/**
 * Delete button for the incident in the nav bar
 * @return {React Component} Returns the side menu button component
 */

class EditButtonIncident extends Component {
	render() {
		if (this.props.incident.isLoggedIn) {
			return (
				<TouchableOpacity
					style={styles.incidentNavButton}
					onPress={() => {
						Actions.editIncident();
					}}
				>
					<Icon name="pencil" size={23} />
				</TouchableOpacity>
			);
		} else {
			return <View />;
		}
	}
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

export default connect(mapStateToProps, null)(EditButtonIncident);
