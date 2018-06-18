import { Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { styles } from '../../assets/styles/navBarButton_styles';

/**
 * Edit button for the incident in the nav bar
 * @return {React Component} Returns the side menu button component
 */

export const editButtonIncident = () => {
	return (
		<TouchableOpacity style={styles.editButton} onPress={() => {}}>
			<Icon name="pencil" size={23} />
		</TouchableOpacity>
	);
};

/**
 * 3 dots more options icon button for the incident in the nav bar
 * @return {React Component} Returns the side menu button component
 */

export const moreOptions = () => {
	return (
		<TouchableOpacity style={styles.editButton} onPress={() => {}}>
			<Icon name="ellipsis-v" size={23} />
		</TouchableOpacity>
	);
};
