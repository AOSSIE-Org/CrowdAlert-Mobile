import { Image, Text, View, TouchableOpacity } from 'react-native';
import React, { Component } from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';

export const editButton = () => {
	return (
		<TouchableOpacity
			style={{ marginRight: 10 }}
			onPress={() => Actions.editProfile()}
		>
			<Icon name="pencil" size={23} />
		</TouchableOpacity>
	);
};

export const sideMenu = () => {
	return (
		<TouchableOpacity
			style={{ marginLeft: 20, justifyContent: 'center' }}
			onPress={() => Actions.drawerOpen()}
		>
			<Icon name="bars" size={23} />
		</TouchableOpacity>
	);
};
