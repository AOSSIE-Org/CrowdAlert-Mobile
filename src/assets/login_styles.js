import {StyleSheet} from 'react-native';
//Styling used in main login page containing all login options.
export const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
        marginTop : -40
    },
    logo: {
        marginLeft: 143,
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
      button_text_register : {
          marginLeft:13,
          marginTop:10,
          color : '#000'
      },
      button_text_signin : {
        marginLeft:16,
        marginTop:10,
        color : '#000'
    },
      button_text_google : {
          marginLeft:20,
          marginTop:5,
          color : 'white'
      },
      button_text_facebook : {
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