import { Text, View, TouchableOpacity, Alert, Share } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/Entypo';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../../assets/styles/navBarButton_styles';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { updateIncidentFirebase } from '../../../actions/incidentsAction';
import PropTypes from 'prop-types';

/**
 * Share button for the incident in the nav bar
 * @return {React Component} Returns the side menu button component
 */

class ShareButtonIncident extends Component {
	//Handles the share functionality of an incident and updates the firebase database
	handleShare() {
		Share.share(
			{
				message:
					'Hey, check out this ' +
					this.props.incident.incident.value.category +
					' incident on CrowdAlert: ' +
					'https://crowdalert.herokuapp.com/view/' +
					this.props.incident.incident.key,
				title: 'Wow, did you see that ? Check it out !!!'
			},
			{
				// Android only:
				dialogTitle: 'Share Incident',
				// iOS only:
				excludedActivityTypes: [
					'com.apple.UIKit.activity.PostToTwitter'
				]
			}
		);
	}
	//the share  button
	render() {
		return (
			<TouchableOpacity
				style={styles.incidentNavButton}
				onPress={() => {
					this.handleShare();
				}}
			>
				<Icon name="share" size={25} color={'white'} />
			</TouchableOpacity>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present,
 * and warns if the props used on this page,
 * does not meet the specified type.
 */
ShareButtonIncident.propTypes = {
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

export default connect(mapStateToProps, null)(ShareButtonIncident);
