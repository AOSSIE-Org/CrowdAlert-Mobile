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
import {fbSignIn, googleSignin} from '../actions/loginAction'
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
                    <Text style = {styles.button_text}> SignIn </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button_2}
                    onPress={() => Actions.signup()}>
                    <Text style = {styles.button_text}> Register </Text>
                </TouchableOpacity>
                </View>
                <View><Text style = {styles.Text}>More login options :</Text></View>
                <View style={styles.button_container_social}>
                <TouchableOpacity
                    style={styles.button_fb}
                    onPress={() => this.props.fbSignIn()}>
                    <Text style = {styles.button_text_social}> Facebook </Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.button_google}
                    onPress={() => Actions.signup()}>
                    <Text style = {styles.button_text_social}> Google </Text>
                </TouchableOpacity>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop : -40
    },
    logo: {
        marginLeft: 140,
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
        width: 250,
        height: 40
    },
    fb: {
        marginTop: 30
    },
      button_container:{
        flexDirection:'row',
        justifyContent: 'space-between',
        padding:10,
        marginBottom : 15
      },
      button_container_social:{
        flexDirection:'row',
        justifyContent: 'space-between',
        padding:10,
        marginTop : 33
      },
      button_1:{
        marginLeft : 80,
        height : 40,
        width : 80,
        borderRadius : 3,
        borderColor : 'black',
        borderWidth:1.5
      },
      button_2:{
        marginRight:80,
        height : 40,
        width : 80,
        borderRadius : 3,
        borderColor : 'black',
        borderWidth:1.5
      },
      Text:{
          marginTop:10,
          marginLeft:30,
          fontSize : 17,
          color : '#000'
      },
      button_text : {
          marginLeft:13,
          marginTop:10,
          color : '#000'
      },
      button_text_social : {
          marginLeft:15,
          marginTop:5,
          color : 'white'
      },
      button_fb:{
        backgroundColor : '#3B5998',
        borderRadius : 2,
        height : 30,
        width : 90,
        marginLeft : 60
      },
      button_google:{
        backgroundColor : '#d34836',
        borderRadius : 2,
        height:30,
        width:90,
        marginRight : 55
      }
});


function matchDispatchToProps(dispatch){
    return bindActionCreators({
        fbSignIn: fbSignIn,
    },dispatch);
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Login);
