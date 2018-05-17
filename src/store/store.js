import {createStore, applyMiddleware} from "redux";
import thunk from "redux-thunk";
import promise from 'redux-promise'
import {createLogger} from "redux-logger";
import allReducers from "../reducers/index";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/es/storage';
import {persistCombineReducers} from 'redux-persist'
import { AsyncStorage } from 'react-native';

const config = {
    key: 'root',
    storage: AsyncStorage,
    debug: true,
    whitelist: ['login']
};

const combinedReducer = persistCombineReducers(config, allReducers);

const reducers = (state, action) => {
    // if (action.type === 'FORM_SIGN_OUT') {
    //     state = undefined;
    // }
    return combinedReducer(state, action)
}
const enhancers = applyMiddleware(thunk,promise,createLogger());

const store = createStore(reducers, enhancers);
const persistor = persistStore(store, enhancers, () => {
    console.log('after persisting',store.getState());
});
const configureStore = () => {
    return {persistor, store};
}

export default configureStore;
