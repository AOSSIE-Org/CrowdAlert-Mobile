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
import {onPressSignIn, fbSignIn} from '../actions/loginAction'

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
                <TextInput
                    placeholder="Email"
                    style={styles.field_Email}
                    value={this.state.email}
                    onChangeText={email => this.setState({email})}
                    autoCapitalize='none'/>
                <TextInput
                    placeholder="Password"
                    style={styles.field_Pass}
                    secureTextEntry={true}
                    autoCapitalize='none'
                    value={this.state.password}
                    onChangeText={password => this.setState({password})}/>
                <View style={styles.button}>
                    <Button
                        onPress={() => this.props.onPressSignIn(this.state.email, this.state.password)}
                        title="Login"
                        color="#000"/>
                </View>
                <View style={styles.fb}>
                    <Button
                        onPress={() => this.props.fbSignIn()}
                        title="Connect with Facebbok"
                        color="#3b5998"/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
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
        width: 250,
        height: 40
    },
    fb: {
        marginTop: 30
    }
});


function matchDispatchToProps(dispatch){
    return bindActionCreators({
        onPressSignIn: onPressSignIn,
        fbSignIn: fbSignIn,
    },dispatch);
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Login);
