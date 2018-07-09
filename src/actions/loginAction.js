import {
	LOGIN_LOADING,
	GET_USER_AUTH_FIREBASE,
	ADD_USER_FIREBASE,
	SIGN_OUT
} from './types';
import firebase from 'react-native-firebase';
import { AccessToken, LoginManager, LoginButton } from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';
import { ToastAndroid } from 'react-native';
import { handleError } from './errorAction';

/**
 * Personal user details to be stored in the Firebase database and redux store
 * @param  {JSON} data User details
 * @return {JSON}      Returns the user JSON to be stored in Firebase
 */
const userFirebaseStructure = data => {
	var user = data.providerData[0];
	return {
		name: user.displayName === null ? '' : user.displayName,
		email: user.email === null ? '' : user.email,
		photo: {
			url: user.photoURL === null ? '' : user.photoURL,
			base64: ''
		},
		phone_no: '',
		emergency_contact_name: '',
		emergency_contact_phone_no: ''
	};
};

/**
 * This function signs in the user into app using firebase authentication.
 * @param  {string} email carries email entered by the user on signin screen.
 * @param  {string} password carries password entered by the user on signin screen.
 * @return signs in the user successfully or triggers an error.
 */
export const onPressSignIn = (email, password) => {
	return dispatch => {
		dispatch(loginLoading(true));
		firebase
			.auth()
			.signInAndRetrieveDataWithEmailAndPassword(email, password) //signs in to firebase
			.then(data => {
				dispatch(getUserAuthFirebase(data.user, 'email'));
				dispatch(addUserFirebase(userFirebaseStructure(data.user)));
			})
			.catch(error => {
				dispatch(loginLoading(false));
				dispatch(handleError(error));
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

/**
 * This function is used for registering a user in firebase.
 * @param  {string} email carries email entered by the user on signin screen.
 * @param  {string} password carries password entered by the user on signin screen.
 * @return signs up in the user successfully or triggers an error.
 */
export const onPressSignUp = (email, password, name) => {
	return dispatch => {
		dispatch(loginLoading(true));
		firebase
			.auth()
			.createUserAndRetrieveDataWithEmailAndPassword(email, password) //signs up a User
			.then(data => {
				//on success
				dispatch(getUserAuthFirebase(data.user, 'email'));
				data.user.providerData[0]['displayName'] = name;
				dispatch(addUserFirebase(userFirebaseStructure(data.user)));
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

/**
 * This function implements forget password functionality by sending a password reset email.
 * @param  {string} email carries email entered by user.
 * @return sends password reset email or trigger an error that user is not registered.
 */
export const onForget = email => {
	return dispatch => {
		dispatch(loginLoading(true));
		var auth = firebase.auth(); //for firebase authentication
		auth
			.sendPasswordResetEmail(email)
			.then(function() {
				dispatch(loginLoading(false));
				ToastAndroid.show('Email sent', ToastAndroid.SHORT);
			})
			.catch(function(error) {
				dispatch(loginLoading(false));
			});
	};
};

/**
 * This function logs in the user using facebook login and stores the user in firebase.
 * @return on success fb signin, else will trigger alerts.
 */
export const fbSignIn = () => {
	return dispatch => {
		// We specify in an array what we want to access from a user profile.
		dispatch(loginLoading(true));
		LoginManager.logInWithReadPermissions(['public_profile', 'email'])
			.then(result => {
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
				// Login with the fb credential
				return firebase
					.auth()
					.signInAndRetrieveDataWithCredential(credential);
			})
			.then(data => {
				dispatch(getUserAuthFirebase(data.user, 'facebook'));
				dispatch(addUserFirebase(userFirebaseStructure(data.user)));
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

/**
 * This function is used for google login and storing the user in firebase.
 * @return If success, log in with google else trigger alerts.
 */
export const googleSignin = () => {
	return dispatch => {
		dispatch(loginLoading(true));
		GoogleSignin.signIn()
			.then(data => {
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
			.then(data => {
				dispatch(getUserAuthFirebase(data.user, 'google'));
				dispatch(addUserFirebase(userFirebaseStructure(data.user)));
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

/**
 * Called after the SignIn details are fetched from Firebase
 * Adds the user(if not existing before) to the Firebase and store with
 * the personal details.
 * @param  {JSON} userDetails Details of the user
 */
const addUserFirebase = userDetails => {
	return dispatch => {
		const userKey = userDetails.email.replace(/\./g, '');
		var userRef = firebase.database().ref('users/' + userKey);
		userRef.on('value', function(snapshot) {
			if (snapshot.exists()) {
				var items = {};
				snapshot.forEach(child => {
					items[child.key] = child.val();
				});
				dispatch(addUserDetails(items));
				console.log('User Exists');
			} else {
				dispatch(addUserDetails(userDetails));
				// Adding User to 'users' collection
				firebase
					.database()
					.ref('users')
					.child(userKey)
					.set(userDetails)
					.catch(error => console.log(error));
			}
			dispatch(loginLoading(false));
		});
	};
};

/**
 *  Called when the user updates his details
 *  Also updates the firebase and the redux store
 * @param  {JSON} userDetails Details of the user
 */
export const updateUserFirebase = userDetails => {
	return dispatch => {
		dispatch(loginLoading(true));
		return new Promise((resolve, reject) => {
			const userKey = userDetails.email.replace(/\./g, '');
			firebase
				.database()
				.ref('users/' + userKey)
				.update(userDetails);
			dispatch(addUserDetails(userDetails));
			dispatch(loginLoading(false));
			resolve();
		});
	};
};

/**
 *  Called when the user updates his details
 *  Also updates the firebase and the redux store
 * @param  {JSON} userDetails Details of the user
 */
export const logout = () => {
	return dispatch => {
		dispatch(logoutHelper());
	};
};

/**
 * Adds the personal user details to the redux store
 * @param {JSON} details Details of the user
 * @return returns type and user details.
 */
function logoutHelper() {
	return {
		type: SIGN_OUT
	};
}

/**
 * Adds the personal user details to the redux store
 * @param {JSON} details Details of the user
 * @return returns type and user details.
 */
function addUserDetails(details) {
	return {
		type: ADD_USER_FIREBASE,
		userDetails: details
	};
}

/**
 * It checks if loading is complete.
 * @param  {boolean} bool.
 * @return returns type and status of loading.
 */
function loginLoading(bool) {
	return {
		type: LOGIN_LOADING,
		loading: bool
	};
}

/**
 * Saves user
 * @param  {object} user
 * @param  {string} type of signin
 * @return returns user object and type of signin.
 */
function getUserAuthFirebase(user, type) {
	return {
		type: GET_USER_AUTH_FIREBASE,
		userFirebase: user,
		signInType: type
	};
}
