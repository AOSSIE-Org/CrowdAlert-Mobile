import React, { Component } from 'react';
import { Image, Text, View } from 'react-native';
import { styles } from '../assets/styles/splashScreen_styles';

export default class SplashScreen extends Component {
	render() {
		return (
			<View style={styles.container}>
				<Image
					source={require('../assets/images/aossie.png')}
					style={styles.logo}
				/>
			</View>
		);
	}
}
