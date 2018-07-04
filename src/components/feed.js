import React, { Component } from 'react';
import {
	Text,
	View,
	ScrollView,
	TouchableHighlight,
	ActivityIndicator,
	Switch
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { getAllIncidents, viewIncident } from '../actions/incidentsAction';
import { styles } from '../assets/styles/feed_styles';
import Timeline from 'react-native-timeline-listview';
import PropTypes from 'prop-types';

/**
 * Global incidents feed showing all the incidents from around the globe.
 * @extends Component
 */
class FeedScreen extends Component {
	componentWillMount() {
		if (this.props.incident.all_incidents === null) {
			this.props.getAllIncidents();
		}
	}

	//Converts a timestamp to a presentable date and time
	getTime(timestamp) {
		var m_names = [
			'Jan',
			'Feb',
			'Mar',
			'Apr',
			'May',
			'Jun',
			'Jul',
			'Aug',
			'Sep',
			'Oct',
			'Nov',
			'Dec'
		];
		var d = new Date(timestamp);
		var curr_date = d.getDate();
		var sup = '';
		if (curr_date == 1 || curr_date == 21 || curr_date == 31) {
			sup = 'st';
		} else if (curr_date == 2 || curr_date == 22) {
			sup = 'nd';
		} else if (curr_date == 3 || curr_date == 23) {
			sup = 'rd';
		} else {
			sup = 'th';
		}
		var curr_month = d.getMonth();
		var curr_year = d.getFullYear();

		var hours = d.getHours();
		var minutes = d.getMinutes();
		var ampm = hours >= 12 ? 'PM' : 'AM';
		hours = hours % 12;
		hours = hours ? hours : 12; // the hour '0' should be '12'
		minutes = minutes < 10 ? '0' + minutes : minutes;

		var strTime = hours + ':' + minutes + ' ' + ampm;
		var day =
			curr_date + sup + ' ' + m_names[curr_month] + ', ' + curr_year;
		return day + '\n' + strTime;
	}

	//Handles an incident click and redirects to its particulat incident screen
	viewClickedIncident(item) {
		if (item.value.user_id === this.props.user.email) {
			this.props.viewIncident(item, true);
		} else {
			this.props.viewIncident(item, false);
		}
		Actions.incident();
	}

	render() {
		if (this.props.incident.loading) {
			return <ActivityIndicator size={'large'} />;
		} else {
			//Creates the 'data', to be passed to the Timeline Component.
			const all_incidents = [];
			this.props.incident.all_incidents.map(incident => {
				all_incidents.push({
					time: this.getTime(incident.value.timestamp),
					title: incident.value.title,
					description: incident.value.details,
					incident: incident
				});
			});
			console.log(this.props.incident.all_incidents, all_incidents);
			return (
				<View style={styles.container}>
					<Text style={styles.heading}>Global Feed</Text>
					<Timeline
						data={all_incidents}
						circleSize={22}
						innerCircle="dot"
						dotColor="white"
						circleColor="#004f7a"
						lineColor="#004f7a"
						// separator={true}
						renderFullLine={true}
						// columnFormat="two-column"
						timeContainerStyle={styles.timeContainerStyle}
						iconStyle={styles.iconStyle}
						circleStyle={styles.circleStyle}
						style={styles.timelineContainer}
						timeStyle={styles.timeStyle}
						detailContainerStyle={styles.detailContainerStyle}
						titleStyle={styles.titleStyle}
						descriptionStyle={styles.descriptionStyle}
						options={{
							showsVerticalScrollIndicator: false
						}}
						onEventPress={event => {
							console.log(event.incident);
							this.viewClickedIncident(event.incident);
						}}
					/>
				</View>
			);
		}
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
FeedScreen.propTypes = {
	getAllIncidents: PropTypes.func.isRequired,
	viewIncident: PropTypes.func.isRequired,
	user: PropTypes.object,
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
			getAllIncidents: getAllIncidents,
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
	incident: state.incident,
	user: state.login.userDetails
});

export default connect(mapStateToProps, matchDispatchToProps)(FeedScreen);
