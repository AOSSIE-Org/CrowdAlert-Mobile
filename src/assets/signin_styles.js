import {StyleSheet} from 'react-native';
//styling used in signin page.
export const styles = StyleSheet.create({
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
    button_login: {
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 10,
        width :300,
        marginLeft : 45,
        marginTop : 30,
        borderRadius : 2
      },
      field:{
          marginTop:30
      },
      button_text : {
          color : 'white'
      },
      button_text_forgot : {
          color : 'grey',
          fontSize : 12
      },
      button_forgot:{
          marginLeft : 20,
          backgroundColor : 'transparent',
          marginTop : 25,
      }
});