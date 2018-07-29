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
import { getAllIncidents } from '../../actions/incidentsAction';
import { styles } from '../../assets/styles/feed_styles';
import Timeline from 'react-native-timeline-listview';
import PropTypes from 'prop-types';
import { Header, Title, Left, Body } from 'native-base';
import { SideDrawer } from '../sideMenu';
import { getMarkerImage } from '../../utils/categoryUtil';

/**
 * Global incidents feed showing all the incidents from around the globe.
 * @extends Component
 */
class FeedScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			data: null
		};
	}

	//fetches all incidents if not fetched earlier and generates data for the timeline
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

		var time = hours + ':' + minutes + ' ' + ampm;
		var day =
			curr_date + sup + ' ' + m_names[curr_month] + ', ' + curr_year;
		return { day, time };
	}

	//Handles an incident click and redirects to its particulat incident screen
	viewClickedIncident(item) {
		Actions.incident({ incident_key: item.key });
	}

	//Incident details container
	renderDetail(rowData, sectionID, rowID) {
		return (
			<View style={styles.eventContainer}>
				<View style={styles.timeContainer}>
					<Text style={styles.time}>{rowData.time.day}</Text>
					<Text style={styles.time}>{rowData.time.time}</Text>
				</View>
				<View style={styles.infoContainer}>
					<Text style={styles.title}>{rowData.title}</Text>
					<Text numberOfLines={2} style={styles.details}>
						{rowData.description}
					</Text>
				</View>
			</View>
		);
	}

	render() {
		//Creates the incidents into 'data' that can be passed to the Timeline component.
		const all_incidents = [];
		if (this.props.incident.all_incidents !== null) {
			this.props.incident.all_incidents.map(incident => {
				all_incidents.push({
					time: this.getTime(incident.value.timestamp),
					title: incident.value.title,
					description: incident.value.details,
					key: incident.key,
					icon: getMarkerImage(incident.value.category)
				});
			});
		}
		return (
			<View style={styles.container}>
				<Header androidStatusBarColor="#1c76cb" style={styles.header}>
					<Left>{SideDrawer('white')}</Left>
					<Body style={styles.body}>
						<Title style={styles.heading}>Global Feed</Title>
					</Body>
				</Header>
				{this.props.incident.loading || all_incidents.length === 0 ? (
					<ActivityIndicator
						size={'large'}
						style={styles.loader}
						color="black"
					/>
				) : (
					<Timeline
						data={all_incidents}
						lineWidth={3.5}
						circleSize={30}
						innerCircle="icon"
						circleColor="transparent"
						lineColor="#099683"
						separator={true}
						renderFullLine={true}
						circleStyle={styles.circleStyle}
						style={styles.timelineContainer}
						renderDetail={this.renderDetail}
						options={{
							showsVerticalScrollIndicator: false
						}}
						onEventPress={event => {
							console.log(event);
							this.viewClickedIncident(event);
						}}
						showTime={false}
					/>
				)}
			</View>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
FeedScreen.propTypes = {
	getAllIncidents: PropTypes.func.isRequired,
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
			getAllIncidents: getAllIncidents
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
