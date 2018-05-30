import React, {Component} from 'react';
import {
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
import {onforget} from '../actions/loginAction'
import { Actions } from 'react-native-router-flux';
import {styles} from '../assets/styles/signin_styles';
import {
    LOGIN_LOADING,
    USER_SIGN_IN,
    ERROR_HANDLING
} from '../actions/types'
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
            <View style = {styles.field}>
                <TextInput
                    placeholder="Email"
                    style={styles.field_Pass}
                    autoCapitalize='none'
                    onChangeText={(email) => this.setState({email})}/>
              </View>
              <TouchableOpacity
                    style={styles.button_send}
                    onPress={() => this.props.onforget(this.state.email)}>
                    <Text style = {styles.button_text}> Send email </Text>
                </TouchableOpacity>
                <View>
                {
                 this.props.login.loading
                 ? <ActivityIndicator size={'large'}/>
                 : null
                }
                </View>
            </View>
        );
    }
}

function matchDispatchToProps(dispatch){
    return bindActionCreators({
        onforget: onforget,
    },dispatch);
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Login);
