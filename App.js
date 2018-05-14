import React, {Component} from 'react';
import {Provider, connect} from "react-redux";
import {Router} from 'react-native-router-flux';
import {Actions, Scene, Drawer} from "react-native-router-flux";
import { PersistGate } from 'redux-persist/lib/integration/react'
import Login from './src/components/login'

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
						  key='login'
	                      hideNavBar
	                      component={Login}/>
                      </Scene>
                  </ConnectedRouter>
              </PersistGate>
          </Provider>
        );
    }
}
