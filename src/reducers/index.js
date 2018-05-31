import loginReducer from './loginReducer';
import sceneReducer from './sceneReducer';
import locationReducer from './locationReducer';

// Collection of all the reducers with keys to gathers their
// results into a single state object.
const allReducers = {
	login: loginReducer,
	scene: sceneReducer,
	location: locationReducer
};

export default allReducers;
