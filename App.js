import React, {Component} from 'react';
import {Provider, connect} from "react-redux";
import {Router} from 'react-native-router-flux';
import {Actions, Scene, Drawer} from "react-native-router-flux";
import { PersistGate } from 'redux-persist/lib/integration/react'
import Signin from './src/components/signin'
import Signup from './src/components/signup'
import login from './src/components/login';
import Forgot from './src/components/forgot';
import configureStore from './src/store/store'
let { store, persistor } = configureStore()

const ConnectedRouter = connect()(Router);

export default class App extends Component {
    onBackPress() {
		Actions.pop()
		return true
	}

    render() {
        return (
	      <Provider store={store}>
			  <PersistGate loading={null} persistor={persistor}>
	          <ConnectedRouter backAndroidHandler={this.onBackPress}>
                  <Scene key='root'>
	                  <Scene
						  key='signin'
                          title="SignIn"
	                      component={Signin}/>
                    <Scene
						  key='signup'
                          title="SingnUp"
	                      component={Signup}/>
                    <Scene
						  key='login'
                          title="Welcome"
	                      component={login}
                          initial={true}/>
                    <Scene
						  key='forgot'
                          title="Reset Password"
	                      component={Forgot}/>
                  </Scene>
                  </ConnectedRouter>
              </PersistGate>
          </Provider>
        );
    }
}
