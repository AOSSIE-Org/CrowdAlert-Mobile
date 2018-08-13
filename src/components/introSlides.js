import React, { Component } from 'react';
import {
	View,
	Text,
	ScrollView,
	Image,
	TouchableHighlight,
	Modal
} from 'react-native';
import { Button, Toast } from 'native-base';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Actions } from 'react-native-router-flux';
import { toggleIntroduction } from '../actions/slidesAction';
import { styles } from '../assets/styles/slides_styles';
import PropTypes from 'prop-types';

const data = [
	{
		text: 'To get started, first Log-in into the Application',
		screen: require('../assets/images/slides/home.jpg')
	},
	{
		text:
			'You can select your desired location by just navigating through the map',
		screen: require('../assets/images/slides/mapSF.jpg')
	},
	{
		text:
			'To add an Incident, just select any one category, fill up the form and its done!',
		screen: require('../assets/images/slides/addIncident.jpg')
	},
	{
		text: 'Share and view incidents to spread awareness!',
		screen: require('../assets/images/slides/incident.jpg')
	},
	{
		text:
			'View your reported incidents from Dashboard to edit, delete or share them!',
		screen: require('../assets/images/slides/dashboard.jpg')
	},
	{
		text:
			'View nearby hospitals and police stations for further assistance!',
		screen: require('../assets/images/slides/emergencyPlaces.jpg')
	},
	{
		text:
			'Update your profile or change any app settings from the Settings section!',
		screen: require('../assets/images/slides/settings.jpg')
	},
	{
		text:
			'View all the incidents in the form of a global feed.',
		screen: require('../assets/images/slides/feed.jpg')
	}
];

/**
 * Content slides that appear as a introduction
 * @extends Component
 */
class Slides extends Component {
	renderSlides() {
		return data.map((slide, index) => {
			return (
				<View key={slide.text} style={styles.slideStyle}>
					<Image
						style={styles.imageStyle}
						source={slide.screen}
						resizeMode="contain"
					/>
					<Text style={styles.textStyle}>{slide.text}</Text>
					{index === data.length - 1 ? (
						<TouchableHighlight
							onPress={() => {
								this.props.toggleIntroduction(
									!this.props.slidesVisible
								);
							}}
						>
							<View style={styles.exitButtonContainer}>
								<Text style={styles.exitButtonText}>Lets Get Started!</Text>
							</View>
						</TouchableHighlight>
					) : null}
				</View>
			);
		});
	}

	render() {
		return (
			<Modal
				animationType={'fade'}
				transparent={true}
				visible={this.props.slidesVisible}
				onRequestClose={() => {}}
			>
				<View style={styles.blurContainer}>
					<View style={styles.container}>
						<ScrollView horizontal pagingEnabled>
							{this.renderSlides()}
						</ScrollView>
					</View>
				</View>
			</Modal>
		);
	}
}

/**
 * Checks that the functions specified as isRequired are present and warns if the
 * props used on this page does not meet the specified type.
 */
Slides.propTypes = {};

/**
 * Mapping dispatchable actions to props so that actions can be used
 * through props in children components.
 * @param dispatch Dispatches an action to trigger a state change.
 * @return Turns action creator objects into an objects with the same keys.
 */
function matchDispatchToProps(dispatch) {
	return bindActionCreators(
		{
			toggleIntroduction: toggleIntroduction
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
	slidesVisible: state.slides.show
});

export default connect(mapStateToProps, matchDispatchToProps)(Slides);
