import { Image, Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/navBarButton_styles';

/**
 * Edit button for the profile in the nav bar
 * @return {React Component} Returns the edit button component
 */

export const editButtonProfile = () => {
	return (
		<TouchableOpacity
			style={styles.editButton}
			onPress={() => Actions.editProfile()}
		>
			<Icon name="pencil" size={23} />
		</TouchableOpacity>
	);
};

/**
 * Side menu button for the profile in the nav bar
 * @return {React Component} Returns the side menu button component
 */

export const sideMenu = color => {
	return (
		<TouchableOpacity
			style={styles.sideMenu}
			onPress={() => Actions.drawerOpen()}
		>
			<Icon name="bars" size={23} color={color} />
		</TouchableOpacity>
	);
};
