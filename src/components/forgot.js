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
import {onforget} from '../actions/loginAction'
import { Actions } from 'react-native-router-flux';

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
                    style={styles.button}
                    onPress={() => this.props.onforget(this.state.email)}>
                    <Text style = {styles.button_text}> Send email </Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF'
    },
    logo: {
        height: 100,
        width: 100,
        marginTop: 30,
        marginBottom: 16
    },
    welcome: {
        fontSize: 50,
        textAlign: 'center',
        marginBottom: 30
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5
    },
    modules: {
        margin: 20
    },
    modulesHeader: {
        fontSize: 16,
        marginBottom: 8
    },
    module: {
        fontSize: 14,
        marginTop: 4,
        textAlign: 'center'
    },
    field_Email: {
        width: 250,
        height: 40
    },
    field_Pass: {
        marginLeft:20,
        width: 350,
        marginTop:10,
        height: 40
    },
    fb: {
        marginTop: 30
    },
    button: {
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 10,
        width :100,
        marginLeft : 135,
        marginTop : 30,
        borderRadius : 2
      },
      field:{
          marginTop:30
      },
      button_text : {
          color : 'white'
      }
});


function matchDispatchToProps(dispatch){
    return bindActionCreators({
        onforget: onforget,
    },dispatch);
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Login);
