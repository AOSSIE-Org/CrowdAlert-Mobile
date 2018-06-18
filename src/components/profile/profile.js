import React, { Component } from 'react';
import {
	Image,
	Text,
	View,
	ScrollView,
	TouchableOpacity,
	TextInput,
	ActivityIndicator,
	FlatList
} from 'react-native';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/profile_styles';
import PropTypes from 'prop-types';
import { getUserIncidents } from '../../actions/incidentsAction';
import { getColor } from '../../utils/categoryUtil';

/**
 * Screen showing the profile along with his/her incidents.
 * @extends Component
 */
class Profile extends Component {
	constructor(props) {
		super(props);
	}

	componentWillMount() {
		this.props.getUserIncidents(this.props.user.email);
	}

	//Individual list item for the incidents
	renderItem({ item }) {
		return (
			<TouchableOpacity
				onPress={() =>
					Actions.incident({
						details: item.value
					})
				}
			>
				<View
					style={[
						styles.incidentContainer,
						{ backgroundColor: getColor(item.value.category) }
					]}
				>
					<Image
						style={styles.incidentsImage}
						source={getMarkerImage(item.value.category)}
					/>
					<View style={styles.incidentTextContainer}>
						<Text style={styles.incident}>{item.value.title}</Text>
						<Text style={styles.incident}>
							{item.value.details}
						</Text>
					</View>
				</View>
			</TouchableOpacity>
		);
	}

	render() {
		return (
			<ScrollView
				style={styles.container}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.avatarContainer}>
					<Image
						style={styles.avatar}
						source={
							this.props.user.photo.url === ''
								? this.props.user.photo.base64 === ''
									? {
											uri:
												'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZA_wIwT-DV4G3E3jdNZScRLQnH4faqTH2a7PrNwlhqP4W1Zjh'
									  }
									: {
											uri:
												'data:image/jpeg;base64, ' +
												this.props.user.photo.base64
									  }
								: { uri: this.props.user.photo.url }
						}
					/>
					<Text style={styles.userName}>{this.props.user.name}</Text>
				</View>
				<View style={styles.otherInfoContainer}>
					<Text style={styles.otherInfoValue}>
						<Text style={styles.otherInfoHead}>Email ID: </Text>
						{this.props.user.email}
					</Text>
					<Text style={styles.otherInfoValue}>
						<Text style={styles.otherInfoHead}>Phone No: </Text>
						{this.props.user.phone_no}
					</Text>
					<Text style={styles.otherInfoValue}>
						<Text style={styles.otherInfoHead}>
							Emergency contact name:{' '}
						</Text>
						{this.props.user.emergency_contact_name === ''
							? 'NA'
							: this.props.user.emergency_contact_name}
					</Text>
					<Text style={styles.otherInfoValue}>
						<Text style={styles.otherInfoHead}>
							Emergency contact phone no:{' '}
						</Text>
						{this.props.user.emergency_contact_phone_no === ''
							? 'NA'
							: this.props.user.emergency_contact_phone_no}
					</Text>
				</View>
				{this.props.incident.loading ? (
					<ActivityIndicator size={'large'} />
				) : null}
				<FlatList
					contentContainerStyle={styles.flatListContainer}
					data={this.props.incident.user_incidents}
					renderItem={this.renderItem}
					keyExtractor={item => item.key}
				/>
			</ScrollView>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present,
 * and warns if the props used on this page,
 * does not meet the specified type.
 * @type {incident}
 * @type {user}
 */
Profile.propTypes = {
	getUserIncidents: PropTypes.func.isRequired,
	user: PropTypes.array,
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
			getUserIncidents: getUserIncidents
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
	user: state.login.userDetails,
	incident: state.incident
});

export default connect(mapStateToProps, matchDispatchToProps)(Profile);
