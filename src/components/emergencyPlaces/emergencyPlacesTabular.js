import React, { Component } from 'react';
import {
	Text,
	View,
	TouchableHighlight,
	TouchableOpacity,
	ActivityIndicator
} from 'react-native';
import {
	Tabs,
	Tab,
	TabHeading,
	Header,
	Container,
	Left,
	Body,
	Icon as NativeIcon
} from 'native-base';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { getEmergencyPlaces } from '../../actions/emergencyPlacesAction';
import { Actions } from 'react-native-router-flux';
import Hospitals from './hospitals';
import PoliceStations from './policeStations';
import { styles } from '../../assets/styles/emergencyPlacesTabular_styles';
import { SideDrawer } from '../sideMenu';
import Icon from 'react-native-vector-icons/Foundation';

/**
 * Emergency Places screen showing hospitals and police stations.
 * @extends Component
 */
class EmergencyPlaces extends Component {
	componentDidMount() {
		this.props.getEmergencyPlaces(this.props.emergency_radius);
	}

	render() {
		if (this.props.emergencyPlaces.loading) {
			return (
				<Container>
					<Header hasTabs>
						<Left>{SideDrawer('white')}</Left>
						<Body>
							<Text style={styles.title}>Emergency Places</Text>
						</Body>
					</Header>
					<ActivityIndicator
						size={'large'}
						style={styles.loader}
						color="black"
					/>
				</Container>
			);
		}
		return (
			<Container>
				<Header hasTabs>
					<Left>{SideDrawer('white')}</Left>
					<Body>
						<Text style={styles.title}>Emergency Places</Text>
					</Body>
				</Header>
				<Tabs
					style={{ backgroundColor: '#000' }}
					tabBarPosition="bottom"
				>
					<Tab
						heading={
							<TabHeading>
								<NativeIcon
									color="white"
									size={25}
									name="md-medkit"
									style={styles.tabIcon}
								/>
								<Text style={styles.tabText}>Hospitals</Text>
							</TabHeading>
						}
					>
						<Hospitals
							item={this.props.emergencyPlaces.hospitals}
						/>
					</Tab>
					<Tab
						heading={
							<TabHeading>
								<Icon
									color="white"
									size={25}
									name="sheriff-badge"
									style={styles.tabIcon}
								/>
								<Text style={styles.tabText}>
									Police Stations
								</Text>
							</TabHeading>
						}
					>
						<PoliceStations
							item={this.props.emergencyPlaces.policeStations}
						/>
					</Tab>
				</Tabs>
			</Container>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
EmergencyPlaces.propTypes = {
	getEmergencyPlaces: PropTypes.func.isRequired,
	emergencyPlaces: PropTypes.object,
	emergency_radius: PropTypes.number
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
			getEmergencyPlaces: getEmergencyPlaces
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
	emergencyPlaces: state.emergencyPlaces,
	emergency_radius: state.settings.emergency_radius
});

export default connect(mapStateToProps, matchDispatchToProps)(EmergencyPlaces);
