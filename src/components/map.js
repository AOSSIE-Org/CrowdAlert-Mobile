import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TextInput,
  TouchableOpacity,
  Platform
} from "react-native";
import LocationServicesDialogBox from "react-native-android-location-services-dialog-box";
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
import Marker from "react-native-maps";
import { styles1 } from "../assets/styles/signin_styles";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { openSearch, getlocation } from "../actions/locationAction";
import { Actions } from "react-native-router-flux";
import PropTypes from "prop-types";
const { height, width } = Dimensions.get("window");
const ASPECT_RATIO = width / height;
class map extends Component {
  constructor(props) {
    super(props);
    this.state = { flex: 0 };
  }
  componentDidMount() {
    setTimeout(() => this.setState({ flex: 1 }), 500);
    this.setState({ height: height - 1, width: width - 1 });
    console.log("going");
    if (Platform.OS === "android")
      LocationServicesDialogBox.checkLocationServicesIsEnabled({
        message:
          "<h2>Use Location?</h2> \
                          This app wants to change your device settings:<br/><br/>\
                          Use GPS for location<br/><br/>",
        ok: "YES",
        cancel: "NO"
      }).then(() => {
        () => this.props.getlocation();
      });
  }
  render() {
    return (
      <View>
        <View>
          <TouchableOpacity
            onPress={() => this.props.openSearch()}
            style={styles.search_button}
          >
            <Text style={styles.search_button_text}>
              {this.props.location.location_name}
            </Text>
          </TouchableOpacity>
        </View>
        <View style={{ flex: this.state.flex }}>
          <MapView
            provider={PROVIDER_GOOGLE}
            showsUserLocation={true}
            style={styles.map}
            region={{
              latitude: this.props.location.location.latitude,
              longitude: this.props.location.location.longitude,
              latitudeDelta: 0.0922,
              longitudeDelta: 0.00922 * ASPECT_RATIO
            }}
          />
        </View>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  map: {
    width: width,
    height: 600
  },
  search_button: {
    marginTop: 5,
    marginLeft: 3,
    marginRight: 3,
    width: width - 5,
    height: 40,
    backgroundColor: "#fff",
    borderRadius: 20,
    borderColor: "#ccc",
    borderWidth: 1
  },
  search_button_text: {
    padding: 10
  }
});
map.propTypes = {
  openSearch: PropTypes.func.isRequired,
  getlocation: PropTypes.func.isRequired
};
function matchDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      openSearch: openSearch
    },
    dispatch
  );
}

const mapStateToProps = state => ({
  location: state.location
});

export default connect(mapStateToProps, matchDispatchToProps)(map);
