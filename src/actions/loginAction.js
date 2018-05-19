import {
    LOGIN_LOADING,
    USER_SIGN_IN,
    ERROR_HANDLING
} from './types'
import firebase from 'react-native-firebase';
import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';
import { GoogleSignin } from 'react-native-google-signin';

/**
 * 
 * Functions checks if a user is registered in firebase and los him in.
 * @param {email} string
 * @param {password} string
 * @returns 
 */
export const onPressSignIn = (email,password) => {
    return (dispatch) => {
        dispatch(signInLoading(true));
        firebase.auth().signInAndRetrieveDataWithEmailAndPassword(email, password)
        .then((data) => {
            dispatch(signInLoading(false));
            dispatch(saveUser(data.user,'email'));
            console.log(data.user);
            alert("Login done")
        })
        .catch((error) => {
            alert('Please register first')
            // if (code == "auth/wrong-password")
            //     alert("Wrong Password");
            // if (code == "auth/user-not-found")
            //     alert("You are not registered.")
            console.log(error);
        });
    }
}
/**
 * 
 * Function creates user account on firebase.
 * @param {email} string
 * @param {password} string
 * @returns 
 */
export const onPressSignUp = (email,password) => {
    console.log(email,password);
    return (dispatch) => {
        dispatch(signInLoading(true));
        firebase.auth().createUserAndRetrieveDataWithEmailAndPassword(email, password)
        .then((data) => {
            console.log(data.user.email);
            dispatch(saveUser(data.user,'email'));
            dispatch(signInLoading(false));
            alert('Signup done');
        })
        .catch((error) => {
            dispatch(signInLoading(false));
            dispatch(handleError(error));
            console.log(error);
            // if (code  == "auth/email-already-in-use")
            //     alert("User Already Registered with the same email");
            // else
            //     alert("Error");
        });
    }
}
/**
 * 
 * Implement forget password functionality . It sends email to user for changing password.
 * @param {email} string
 * @returns 
 */
export const onforget = (email) => {
    return (dispatch) => {
        dispatch(signInLoading(true));
        var auth = firebase.auth();
        auth.sendPasswordResetEmail(email)
        .then(function() {
            dispatch(signInLoading(true));
            alert('Email Sent');
        })
        .catch(function(error) {
            dispatch(signInLoading(true));
            alert('You are not registered')
        });
    }
}
/**
 * 
 * Function implementing facebook signin and authenticating with firebase.
 * @returns 
 */
export const fbSignIn = () => {
    return (dispatch) => {
        LoginManager.logInWithReadPermissions(['public_profile', 'email'])
        .then((result) => {
            dispatch(signInLoading(true));
            if (result.isCancelled) {
                return Promise.reject(new Error('The user cancelled the request'));
            }
            // Retrieve the access token
            return AccessToken.getCurrentAccessToken();
        })
        .then((data) => {
            // Create a new Firebase credential with the token
            const credential = firebase.auth.FacebookAuthProvider.credential(data.accessToken);
            // Login with the credential
            alert("FB Login done")
            return firebase.auth().signInAndRetrieveDataWithCredential(credential);
        })
        .then((user) => {
            console.log(user);
            dispatch(saveUser(user.user,'facebook'));
            dispatch(signInLoading(false));
        })
        .catch((error) => {
            dispatch(signInLoading(false));
            dispatch(handleError(error));
            console.log(error);
            alert('FB Signup error');
        });
    }
}
/**
 * 
 * Function implementing google signin and authenticating with firebase.
 * @returns 
 */
export const googleSignin = () => {
    GoogleSignin.configure({
        webClientId:'530975451806-suk2eiug3eoksre10db2dqceo1mdnemh.apps.googleusercontent.com' // only for iOS
      })
    return (dispatch) => {
            GoogleSignin.signIn()
            .then((data) => {
                // Retrieve the access token
                // Create a new Firebase credential with the token
                const credential = firebase.auth.GoogleAuthProvider.credential(data.idToken, data.accessToken);
                // Login with the credential
                return firebase.auth().signInWithCredential(credential);
                Alert("User added")
            })
            .then((user) => {
    
            })
            .catch((error) => {
                const { code, message } = error;
                console.log('a');
                alert(message.toString());
            });
    }
}

function signInLoading(bool){
    return {
        type: LOGIN_LOADING,
        loading: bool,
    }
}

function handleError(error){
    return {
        type: ERROR_HANDLING,
        error: error,
    }
}

function saveUser(user,type){
    return {
        type: USER_SIGN_IN,
        user: user,
        signInType: type
    }
}
