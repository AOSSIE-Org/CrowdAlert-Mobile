import { TouchableOpacity } from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { Actions } from 'react-native-router-flux';
import { styles } from '../assets/styles/navBarButton_styles';

/**
 * Side menu button for the profile in the nav bar
 * @return {React Component} Returns the side menu button component
 */
export const SideDrawer = color => {
	return (
		<TouchableOpacity
			style={styles.sideMenu}
			onPress={() => Actions.drawerOpen()}
		>
			<Icon name="bars" size={23} color={color} />
		</TouchableOpacity>
	);
};
