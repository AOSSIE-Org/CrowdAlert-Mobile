import { Text, View, TouchableOpacity, Alert } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../../assets/styles/navBarButton_styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

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
					<Icon name="pencil" size={23} color={'white'} />
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
EditButtonIncident.propTypes = {
	incident: PropTypes.object
};

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
