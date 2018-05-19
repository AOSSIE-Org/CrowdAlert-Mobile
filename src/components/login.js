import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Text,
    View,
    ScrollView,
    TouchableOpacity,
    Alert,
    TextInput,
    Button,
    ActivityIndicator
} from 'react-native';
import firebase from 'react-native-firebase';
import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {fbSignIn , googleSignin} from '../actions/loginAction'
import { Actions } from 'react-native-router-flux';
import { GoogleSignin } from 'react-native-google-signin';
import {styles} from '../assets/login_styles';

/**
 * This class defines UI of the main screen containing all login options.
 * The styling used has been imported from ../assets/login_styles.js
 * 
 * @class Login
 * @extends {Component}
 */
class Login extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
        }
    }
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator animating={this.props.login.loading} size={'large'}/>
                <Image
                    source={require('../assets/earthquake-30-512.png')}
                    style={[styles.logo]}/>
                <Text style={styles.welcome}>
                    Crowd Alert
                </Text>
                <View style={styles.button_container}>
                <TouchableOpacity
                    style={styles.button_1}
                    onPress={() => Actions.signin()}>
                    <Text style = {styles.button_text_signin}> SignIn </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button_2}
                    onPress={() => Actions.signup()}>
                    <Text style = {styles.button_text_register}> Register </Text>
                </TouchableOpacity>
                </View>
                <View><Text style = {styles.Text}>More login options :</Text></View>
                <View style={styles.button_container_social}>
                <TouchableOpacity
                    style={styles.button_fb}
                    onPress={() => this.props.fbSignIn()}>
                    <Text style = {styles.button_text_facebook}> Facebook </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button_google}
                    onPress={() => this.props.googleSignin()}>
                    <Text style = {styles.button_text_google}> Google </Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}
function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fbSignIn: fbSignIn,
        googleSignin : googleSignin
    },dispatch);
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Login);
