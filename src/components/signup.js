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
    Keyboard
} from 'react-native';
import {bindActionCreators} from 'redux';
import {connect} from "react-redux";
import {onPressSignUp} from '../actions/loginAction'

class Signup extends Component {
    constructor(props){
        super(props);
        this.state={
            email: '',
            password: '',
            name: ''
        }
    }

    handleSignUp(){
        Keyboard.dismiss();
        this.props.onPressSignUp(this.state.email, this.state.password);
    }

    render() {
        return (
            <View style={styles.container}>
            <View style = {styles.field}>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    ref={(input) => this.nameInput = input}
                    onChangeText={name => this.setState({name})}
                    onSubmitEditing={() => this.emailInput.focus()}
                    returnKeyType="next"
                    style={styles.field_Pass}
                    placeholder={'Name'}/>
                <TextInput
                    autoCapitalize="none"
                    autoCorrect={false}
                    ref={(input) => this.emailInput = input}
                    onChangeText={email => this.setState({email})}
                    onSubmitEditing={() => this.passwordInput.focus()}
                    keyboardType='email-address'
                    returnKeyType="next"
                    style={styles.field_Pass}
                    placeholder="Email" />
                <TextInput
                    ref={(input) => this.passwordInput = input}
                    style={styles.field_Pass}
                    onChangeText={password => this.setState({password})}
                    // onSubmitEditing={() => this.passwordConfirmInput.focus()}
                    returnKeyType="next"
                    secureTextEntry={true}
                    placeholder="Password" />
              </View>
              <TouchableOpacity
                    style={styles.button}
                    onPress={() => this.handleSignUp()}>
                    <Text style = {styles.button_text}> Register </Text>
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
        backgroundColor: '#DDDDDD',
        padding: 10
      },
      field:{
          marginTop:30
      },
      button_text : {
        color : 'white'
      },
      button: {
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 10,
        width :100,
        marginLeft : 135,
        marginTop : 30,
        borderRadius : 2
      }

});


function matchDispatchToProps(dispatch){
    return bindActionCreators({
        onPressSignUp: onPressSignUp,
    },dispatch);
}

const mapStateToProps = (state) => ({
    login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Signup);
