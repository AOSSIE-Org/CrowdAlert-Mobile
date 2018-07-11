import React, { Component } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import PropTypes from 'prop-types';
import { styles } from '../../assets/styles/profileIncident_styles';
import { viewIncident } from '../../actions/incidentsAction';

import { getMarkerImage, categories } from '../../utils/categoryUtil.js';

class ProfileIncident extends Component {
	viewClickedIncident(item) {
		if (item.value.user_id === this.props.user.email) {
			this.props.viewIncident(item, true);
		} else {
			this.props.viewIncident(item, false);
		}
		Actions.incident();
	}

	render() {
		const even = this.props.even;
		const value = this.props.data.value;
		return (
			<TouchableOpacity
				activeOpacity={0.7}
				onPress={() => {
					this.viewClickedIncident(this.props.data);
				}}
			>
				<View
					style={[
						styles.incidentContainer,
						even ? styles.incidentContainerEven : {}
					]}
				>
					<Image
						style={styles.image}
						source={getMarkerImage(value.category)}
					/>
					<View style={styles.textContainer}>
						<Text style={styles.title}>
							{value.title.toUpperCase()}
						</Text>
						<Text style={styles.details} numberOfLines={2}>
							{value.details}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
ProfileIncident.propTypes = {
	data: PropTypes.object.isRequired,
	even: PropTypes.bool
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
			viewIncident: viewIncident
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
	user: state.login.userDetails
});

export default connect(mapStateToProps, matchDispatchToProps)(ProfileIncident);
