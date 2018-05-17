import {
    LOGIN_LOADING,
    USER_SIGN_IN,
    ERROR_HANDLING
} from './types'
import firebase from 'react-native-firebase';
import {AccessToken, LoginManager, LoginButton} from 'react-native-fbsdk';

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
            // if (code == "auth/wrong-password")
            //     alert("Wrong Password");
            // if (code == "auth/user-not-found")
            //     alert("You are not registered.")
            console.log(error);
        });
    }
}
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
            // If you need to do anything with the user, do it here
            // The user will be logged in automatically by the
            // `onAuthStateChanged` listener we set up in Login.js earlier
        })
        .catch((error) => {
            dispatch(signInLoading(false));
            dispatch(handleError(error));
            console.log(error);
            alert('FB Signup error');
        });
    }
}
export const googleSignin = () => {

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
