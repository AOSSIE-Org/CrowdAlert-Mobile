import {
	View,
	Image,
	StatusBar,
	TouchableWithoutFeedback,
	Dimensions,
	Text
} from 'react-native';
import React, { Component } from 'react';
import { Actions, Router, Scene } from 'react-native-router-flux';
import IconBack from 'react-native-vector-icons/Feather';
import IconShare from 'react-native-vector-icons/Entypo';
import IconDelete from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../../assets/styles/navBar_styles';
export const NavBar = () => {
	return (
		<View style={styles.backgroundStyle}>
			<StatusBar />
			<View style={styles.container}>
				<TouchableWithoutFeedback onPress={() => Actions.pop()}>
					<IconBack
						name="arrow-left"
						size={27}
						style={styles.backarrowStyle}
					/>
				</TouchableWithoutFeedback>
				<Text style={styles.titleText}>Incident Details</Text>
				<IconShare name="share" size={27} style={styles.shareStyle} />
				<IconDelete
					name="delete"
					size={27}
					style={styles.deleteStyle}
				/>
			</View>
		</View>
	);
};

export default NavBar;
