import React, { Component } from "react";
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
} from "react-native";
import firebase from "react-native-firebase";
import { AccessToken, LoginManager, LoginButton } from "react-native-fbsdk";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { fbSignIn, googleSignin } from "../actions/loginAction";
import { Actions } from "react-native-router-flux";
import { styles } from "../assets/styles/login_styles";
import { styles1 } from "../assets/styles/signin_styles";
import { GoogleSignin } from "react-native-google-signin";
import PropTypes from "prop-types";
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  componentDidMount() {
    GoogleSignin.configure({
      webClientId:
        "443270569292-mc2fn435n291r3b9gqk8bjhr42j0tjva.apps.googleusercontent.com"
    });
  }

  render() {
    return (
      <View style={styles.container}>
        {/* <ActivityIndicator animating={this.props.login.loading} size={'large'}/> */}
        <View style={styles.headerImage}>
          <Image
            source={require("../assets/earthquake-30-512.png")}
            style={styles.logo}
          />
        </View>
        <Text style={styles.welcome}>Crowd Alert</Text>
        <View style={styles.button_container}>
          <TouchableOpacity
            style={styles.button_1}
            onPress={() => Actions.signin()}
          >
            <Text style={styles.button_text}> SignIn </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_2}
            onPress={() => Actions.signup()}
          >
            <Text style={styles.button_text}> Register </Text>
          </TouchableOpacity>
        </View>
        <Text style={styles.Text}>More login options :</Text>
        <View style={styles.button_container}>
          <TouchableOpacity
            style={styles.button_fb}
            onPress={() => this.props.fbSignIn()}
          >
            <Text style={styles.button_text_social}> Facebook </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button_google}
            onPress={() => this.props.googleSignin()}
          >
            <Text style={styles.button_text_social}> Google </Text>
          </TouchableOpacity>
        </View>
        <View>
          <TouchableOpacity
            style={styles.button_forgot}
            onPress={() => Actions.map()}
          >
            <Text style={styles.button_text_forgot}> Continue as a guest </Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
Login.propTypes = {
  fbSignIn: PropTypes.func.isRequired,
  googleSignin: PropTypes.func.isRequired
};
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      fbSignIn: fbSignIn,
      googleSignin: googleSignin
    },
    dispatch
  );
}

const mapStateToProps = state => ({
  login: state.login
});

export default connect(mapStateToProps, matchDispatchToProps)(Login);
