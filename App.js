import React from 'react';
import { StyleSheet, Platform, Image, Text, View, ScrollView , TouchableOpacity , Alert ,TextInput ,Button, ActivityIndicator} from 'react-native';

import firebase from 'react-native-firebase';
import { AccessToken, LoginManager , LoginButton } from 'react-native-fbsdk';
export default class App extends React.Component {
    state = { email: '', password: '', error: '', loading: false };
    onSignInPress = () => {
        this.setState({ error: '', loading: true });
const { email, password } = this.state;
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
            .then(() => { this.setState({ error: '', loading: false }); Alert.alert("Login done") })
            .catch(() => {
                firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
                    .then(() => { this.setState({ error: '', loading: false }); })
                    .catch(() => {
                        this.setState({ error: 'Authentication failed.', loading: false });
                    });
            });
    }
	  onLoginOrRegister = () => {
	  LoginManager.logInWithReadPermissions(['public_profile', 'email'])
	    .then((result) => {
	      if (result.isCancelled) {
		return Promise.reject(new Error('The user cancelled the request'));
	      }
	      // Retrieve the access token
	      return AccessToken.getCurrentAccessToken();
	    })
	    .then((data) => {
	      // Create a new Firebase credential with the token
	      //Alert.alert("HIIIIIIIII");
	      const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
	      // Login with the credential
		Alert.alert("HIIIIIIIII");
	      return firebase.auth().signInAndRetrieveDataWithCredential(credential);
	    })
	    .then((user) => {
	      // If you need to do anything with the user, do it here
	      // The user will be logged in automatically by the
	      // `onAuthStateChanged` listener we set up in App.js earlier
	    })
	    .catch((error) => {
		var s = error.toString()
		 Alert.alert(s);
	      const { code, message } = error;
	      console.log(error);
	      // For details of error codes, see the docs
	      // The message contains the default Firebase string
	      // representation of the error
	    });
	}

  render() {
    return (
        <View style={styles.container}>
        <Image source={require('./assets/earthquake-30-512.png')} style={[styles.logo]} />
        <Text style={styles.welcome}>
          Crowd Alert
        </Text>
	<View>
                        <TextInput placeholder="Email" style = {styles.field_Email}
                        value={this.state.email}
                        onChangeText={email => this.setState({ email })} 
				autoCapitalize='none'
                            />
	</View>
	<View>
                        <TextInput placeholder="Password" style = {styles.field_Pass} 
			secureTextEntry={true}
			autoCapitalize='none'
                        value={this.state.password}
                        onChangeText={password => this.setState({ password })}
                            />
	</View>
	<View style = {styles.button}>
	<Button
  onPress={this.onSignInPress}
  title="Login"
  color="#000"
  accessibilityLabel="Learn more about this purple button"
/>
	</View>
	<View style = {styles.fb}>
<Button
  onPress={this.onLoginOrRegister}
  title="Connect with Facebbok"
  color="#3b5998"
  accessibilityLabel="Learn more about this purple button"
/>
	</View>
        </View>    
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  logo: {
    height: 100,
    width: 100,
    marginTop : 30,
    marginBottom : 16
  },
  welcome: {
    fontSize: 50,
    textAlign: 'center',
    marginBottom: 30,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  modules: {
    margin: 20,
  },
  modulesHeader: {
    fontSize: 16,
    marginBottom: 8,
  },
  module: {
    fontSize: 14,
    marginTop: 4,
    textAlign: 'center',
  },
  field_Email :{
  width : 250,
  height : 40,
  },
field_Pass :{
  width : 250,
  height : 40,
  },
  fb :{
   marginTop : 30
  }
});
