import { LOGIN_LOADING, USER_SIGN_IN, ERROR_HANDLING } from './types';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { ToastAndroid, ActivityIndicator } from 'react-native';

export const onPressSignIn = (email, password) => {
	return dispatch => {
		dispatch(loginLoading(true));
		firebase
			.auth()
			.signInAndRetrieveDataWithEmailAndPassword(email, password)
			.then(data => {
				dispatch(loginLoading(false));
				dispatch(saveUser(data.user, 'email'));
				console.log(data.user);
				ToastAndroid.show('You are logged in', ToastAndroid.SHORT);
			})
			.catch(error => {
				dispatch(loginLoading(false));
				const { code, message } = error;
				if (code == 'auth/wrong-password') {
					ToastAndroid.show(
						'Wrong Password ' + message,
						ToastAndroid.SHORT
					);
				} else if (code == 'auth/user-not-found') {
					ToastAndroid.show(
						'Please register first ' + message,
						ToastAndroid.SHORT
					);
				} else {
					ToastAndroid.show(
						'Could not complete signin ' + message,
						ToastAndroid.SHORT
					);
				}
				console.log(error);
			});
	};
};

export const onPressSignUp = (email, password) => {
	console.log(email, password);
	return dispatch => {
		dispatch(loginLoading(true));
		firebase
			.auth()
			.createUserAndRetrieveDataWithEmailAndPassword(email, password)
			.then(data => {
				console.log(data.user.email);
				dispatch(saveUser(data.user, 'email'));
				dispatch(loginLoading(false));
				ToastAndroid.show(
					'Registration successful',
					ToastAndroid.SHORT
				);
			})
			.catch(error => {
				dispatch(loginLoading(false));
				dispatch(handleError(error));
				console.log(error);
				const { code, message } = error;
				if (code == 'auth/email-already-in-use') {
					ToastAndroid.show(
						'Email in use ' + message,
						ToastAndroid.SHORT
					);
				} else {
					ToastAndroid.show(
						'Could not sign you up! ' + message,
						ToastAndroid.SHORT
					);
				}
			});
	};
};

export const onForget = email => {
	return dispatch => {
		dispatch(loginLoading(true));
		var auth = firebase.auth();
		auth
			.sendPasswordResetEmail(email)
			.then(function() {
				dispatch(loginLoading(false));
				ToastAndroid.show('Email sent', ToastAndroid.SHORT);
			})
			.catch(function(error) {
				dispatch(loginLoading(false));
				ToastAndroid.show('Email not registered', ToastAndroid.SHORT);
			});
	};
};

export const fbSignIn = () => {
	return dispatch => {
		LoginManager.logInWithReadPermissions(['public_profile', 'email'])
			.then(result => {
				dispatch(loginLoading(true));
				if (result.isCancelled) {
					return Promise.reject(
						new Error('The user cancelled the request')
					);
				}
				// Retrieve the access token
				return AccessToken.getCurrentAccessToken();
			})
			.then(data => {
				// Create a new Firebase credential with the token
				const credential = firebase.auth.FacebookAuthProvider.credential(
					data.accessToken
				);
				// Login with the credential
				return firebase
					.auth()
					.signInAndRetrieveDataWithCredential(credential);
			})
			.then(user => {
				console.log(user);
				dispatch(saveUser(user.user, 'facebook'));
				dispatch(loginLoading(false));
				ToastAndroid.show('Login successful', ToastAndroid.SHORT);
			})
			.catch(error => {
				dispatch(loginLoading(false));
				dispatch(handleError(error));
				console.log(error);
				ToastAndroid.show(
					'Could not complete signin',
					ToastAndroid.SHORT
				);
			});
	};
};

export const googleSignin = () => {
	return dispatch => {
		GoogleSignin.signIn()
			.then(data => {
				dispatch(loginLoading(true));
				// Retrieve the access token
				// Create a new Firebase credential with the token
				const credential = firebase.auth.GoogleAuthProvider.credential(
					data.idToken,
					data.accessToken
				);
				// Login with the credential
				return firebase
					.auth()
					.signInAndRetrieveDataWithCredential(credential);
			})
			.then(user => {
				console.log(user);
				dispatch(saveUser(user.user, 'google'));
				dispatch(loginLoading(false));
				ToastAndroid.show('Login successful', ToastAndroid.SHORT);
			})
			.catch(error => {
				dispatch(loginLoading(false));
				dispatch(handleError(error));
				console.log(error);
				ToastAndroid.show(
					'Could not complete login',
					ToastAndroid.SHORT
				);
			});
	};
};

function loginLoading(bool) {
	return {
		type: LOGIN_LOADING,
		loading: bool
	};
}

function handleError(error) {
	return {
		type: ERROR_HANDLING,
		error: error
	};
}

function saveUser(user, type) {
	return {
		type: USER_SIGN_IN,
		user: user,
		signInType: type
	};
}
